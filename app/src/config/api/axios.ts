import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiRoutes } from "@/config/api/routes";
import { environments } from "@/config/environments";

export const CSRF_COOKIE = "reelty_csrf";

/** Origin comes from env; the /api path prefix lives here. */
export const API_BASE_URL = `${environments.apiUrl}/api`;

/** Error thrown by every service: carries the API's snake_case code and HTTP status. */
export class ApiError extends Error {
  code: string;
  status: number;
  fields?: Record<string, string>;
  isNetworkError: boolean;

  constructor(
    message: string,
    options: { code?: string; status?: number; fields?: Record<string, string>; isNetworkError?: boolean } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.code = options.code ?? "unknown_error";
    this.status = options.status ?? 0;
    this.fields = options.fields;
    this.isNetworkError = options.isNetworkError ?? false;
  }
}

interface ApiErrorBody {
  error?: { code?: string; message?: string; fields?: Record<string, string> };
}

/** Unwraps `{ error: { code, message } }` into an ApiError with a human-readable message. */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (!error.response) {
      return new ApiError("We could not reach Reelty. Check your connection and try again.", {
        code: "network_error",
        isNetworkError: true,
      });
    }
    return new ApiError(body?.error?.message ?? "Something went wrong. Please try again.", {
      code: body?.error?.code ?? `http_${error.response.status}`,
      status: error.response.status,
      fields: body?.error?.fields,
    });
  }
  if (error instanceof Error) return new ApiError(error.message);
  return new ApiError("Something went wrong. Please try again.");
}

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "X-Requested-With": "reelty" },
});

// CSRF double submit: copy the readable reelty_csrf cookie into X-CSRF-Token on every write.
axiosInstance.interceptors.request.use((config) => {
  const method = (config.method ?? "get").toLowerCase();
  if (!["get", "head", "options"].includes(method)) {
    const token = readCookie(CSRF_COOKIE);
    if (token) config.headers.set("X-CSRF-Token", token);
  }
  return config;
});

// Session handling: one POST /auth/refresh retry on 401, then notify the auth guard.
let unauthorizedHandler: (() => void) | null = null;
let refreshInFlight: Promise<boolean> | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

const NO_REFRESH_PATHS: string[] = [
  ApiRoutes.auth.login,
  ApiRoutes.auth.register,
  ApiRoutes.auth.refresh,
  ApiRoutes.auth.forgotPassword,
  ApiRoutes.auth.resetPassword,
  ApiRoutes.auth.verifyEmail,
  ApiRoutes.auth.logout,
];

function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = axiosInstance
      .post(ApiRoutes.auth.refresh)
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    const url = config?.url ?? "";
    if (error.response?.status === 401 && config && !config._retried && !NO_REFRESH_PATHS.includes(url)) {
      config._retried = true;
      const refreshed = await refreshSession();
      if (refreshed) return axiosInstance(config);
      // /auth/me failing is the guard's own signal; every other request means the session died mid-use.
      if (url !== ApiRoutes.auth.me) unauthorizedHandler?.();
    }
    return Promise.reject(toApiError(error));
  },
);

export default axiosInstance;
