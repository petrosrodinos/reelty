import axiosInstance from "@/config/api/axios";
import { ApiError } from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type {
  ConfirmImagesDto,
  ConfirmImagesResponse,
  ImageDownloadVersion,
  ProjectImage,
  RemoveWatermarkDto,
  ReorderImagesDto,
  SignedDownload,
  UpdateImageDto,
  UploadUrlEntry,
  UploadUrlsDto,
  UploadUrlsResponse,
} from "@/features/images/interfaces/images.interfaces";

export const requestUploadUrls = async ({
  projectId,
  dto,
}: {
  projectId: string;
  dto: UploadUrlsDto;
}): Promise<UploadUrlEntry[]> => {
  const response = await axiosInstance.post<UploadUrlsResponse>(ApiRoutes.projects.uploadUrls(projectId), dto);
  return response.data.uploads;
};

/** PUT the bytes straight to the signed GCS URL with XMLHttpRequest so we get upload progress. */
export const putFileToSignedUrl = (
  entry: UploadUrlEntry,
  file: File,
  onProgress: (percent: number) => void,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", entry.upload_url);
    xhr.setRequestHeader("Content-Type", entry.content_type);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new ApiError("The upload was refused. Please try this photo again.", { code: "upload_failed", status: xhr.status }));
      }
    };
    xhr.onerror = () =>
      reject(new ApiError("The upload was interrupted. Check your connection and try again.", { code: "network_error", isNetworkError: true }));
    xhr.onabort = () => reject(new ApiError("The upload was cancelled.", { code: "upload_aborted" }));
    xhr.send(file);
  });
};

export const confirmImages = async ({
  projectId,
  dto,
}: {
  projectId: string;
  dto: ConfirmImagesDto;
}): Promise<ConfirmImagesResponse> => {
  const response = await axiosInstance.post<ConfirmImagesResponse>(ApiRoutes.projects.confirmImages(projectId), dto);
  return response.data;
};

export const reorderImages = async ({ projectId, dto }: { projectId: string; dto: ReorderImagesDto }): Promise<void> => {
  await axiosInstance.patch(ApiRoutes.projects.imageOrder(projectId), dto);
};

export const updateImage = async ({ id, dto }: { id: string; dto: UpdateImageDto }): Promise<ProjectImage> => {
  const response = await axiosInstance.patch<ProjectImage>(ApiRoutes.images.byId(id), dto);
  return response.data;
};

export const deleteImage = async (id: string): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.images.byId(id));
};

export const removeWatermark = async ({ id, dto }: { id: string; dto: RemoveWatermarkDto }): Promise<ProjectImage> => {
  const response = await axiosInstance.post<ProjectImage>(ApiRoutes.images.removeWatermark(id), dto);
  return response.data;
};

export const getImageDownloadUrl = async ({
  id,
  version,
}: {
  id: string;
  version: ImageDownloadVersion;
}): Promise<SignedDownload> => {
  const response = await axiosInstance.get<SignedDownload>(ApiRoutes.images.downloadUrl(id), { params: { version } });
  return response.data;
};
