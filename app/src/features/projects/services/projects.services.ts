import axiosInstance, { API_BASE_URL } from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { SignedDownload } from "@/features/images/interfaces/images.interfaces";
import type {
  CreateProjectDto,
  PaginatedResponse,
  PlayUrlResponse,
  Project,
  ProjectListItem,
  ProjectsQuery,
  SubmitProjectDto,
  UpdateProjectDto,
} from "@/features/projects/interfaces/projects.interfaces";

export const getProjects = async (query: ProjectsQuery = {}): Promise<PaginatedResponse<ProjectListItem>> => {
  const response = await axiosInstance.get<PaginatedResponse<ProjectListItem>>(ApiRoutes.projects.prefix, {
    params: query,
  });
  return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
  const response = await axiosInstance.get<Project>(ApiRoutes.projects.byId(id));
  return response.data;
};

export const createProject = async (dto: CreateProjectDto): Promise<Project> => {
  const response = await axiosInstance.post<Project>(ApiRoutes.projects.prefix, dto);
  return response.data;
};

export const updateProject = async ({ id, dto }: { id: string; dto: UpdateProjectDto }): Promise<Project> => {
  const response = await axiosInstance.patch<Project>(ApiRoutes.projects.byId(id), dto);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.projects.byId(id));
};

export const submitProject = async ({ id, dto }: { id: string; dto: SubmitProjectDto }): Promise<Project> => {
  const response = await axiosInstance.post<Project>(ApiRoutes.projects.submit(id), dto);
  return response.data;
};

export const retryProject = async (id: string): Promise<Project> => {
  const response = await axiosInstance.post<Project>(ApiRoutes.projects.retry(id));
  return response.data;
};

export const getVideoPlayUrl = async (id: string): Promise<PlayUrlResponse> => {
  const response = await axiosInstance.get<PlayUrlResponse>(ApiRoutes.projects.playUrl(id));
  return response.data;
};

export const getVideoDownloadUrl = async (id: string): Promise<SignedDownload> => {
  const response = await axiosInstance.get<SignedDownload>(ApiRoutes.projects.downloadUrl(id));
  return response.data;
};

/** Absolute URL of the streamed ZIP (cookie-authenticated top-level navigation, no XHR). */
export const getImagesZipUrl = (id: string): string => `${API_BASE_URL}${ApiRoutes.projects.downloadZip(id)}`;
