// Centralized API endpoints (paths are relative to the axios baseURL, see API_BASE_URL in axios.ts).

export const ApiRoutes = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    verifyEmail: "/auth/verify-email",
    resendVerification: "/auth/resend-verification",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    me: "/auth/me",
  },
  projects: {
    prefix: "/projects",
    byId: (id: string) => `/projects/${id}`,
    uploadUrls: (id: string) => `/projects/${id}/images/upload-urls`,
    confirmImages: (id: string) => `/projects/${id}/images/confirm`,
    imageOrder: (id: string) => `/projects/${id}/images/order`,
    submit: (id: string) => `/projects/${id}/submit`,
    retry: (id: string) => `/projects/${id}/retry`,
    playUrl: (id: string) => `/projects/${id}/video/play-url`,
    downloadUrl: (id: string) => `/projects/${id}/video/download-url`,
    downloadZip: (id: string) => `/projects/${id}/images/download-zip`,
  },
  images: {
    byId: (id: string) => `/images/${id}`,
    removeWatermark: (id: string) => `/images/${id}/remove-watermark`,
    downloadUrl: (id: string) => `/images/${id}/download-url`,
  },
  admin: {
    config: "/admin/config",
    configByKey: (key: string) => `/admin/config/${encodeURIComponent(key)}`,
    usage: "/admin/usage",
  },
  usage: {
    prefix: "/usage",
    history: "/usage/history",
  },
} as const;
