import type { FC } from "react"
import { AlertTriangleIcon, CheckIcon, ImageIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { UploadItemStatuses, type UploadItem } from "@/features/images/interfaces/images.interfaces"
import { formatBytes } from "@/lib/format.utils"

interface UploadProgressListProps {
  items: UploadItem[]
  className?: string
}

const statusText: Record<string, string> = {
  [UploadItemStatuses.QUEUED]: "Waiting",
  [UploadItemStatuses.UPLOADING]: "Uploading",
  [UploadItemStatuses.CONFIRMING]: "Checking photo",
  [UploadItemStatuses.DONE]: "Added",
}

/** Per-file upload progress with rejection reasons. Presentational only. */
export const UploadProgressList: FC<UploadProgressListProps> = ({ items, className }) => {
  if (items.length === 0) return null
  return (
    <ul className={cn("flex flex-col gap-2", className)} aria-label="Upload progress">
      {items.map((item) => {
        const failed = item.status === UploadItemStatuses.REJECTED || item.status === UploadItemStatuses.ERROR
        const busy = item.status === UploadItemStatuses.UPLOADING || item.status === UploadItemStatuses.CONFIRMING
        return (
          <li key={item.id} className="rounded-lg border border-border bg-card px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-md",
                  failed ? "bg-notice-bad text-error" : item.status === UploadItemStatuses.DONE ? "bg-notice-ok text-ink" : "bg-surface-card text-muted-foreground",
                )}
              >
                {failed ? (
                  <AlertTriangleIcon className="size-4" aria-hidden="true" />
                ) : item.status === UploadItemStatuses.DONE ? (
                  <CheckIcon className="size-4" aria-hidden="true" />
                ) : busy ? (
                  <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <ImageIcon className="size-4" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                <p className={cn("text-[0.8125rem]", failed ? "text-error" : "text-muted-foreground")}>
                  {failed ? item.message ?? "Could not be added." : `${statusText[item.status] ?? ""}${item.size ? ` · ${formatBytes(item.size)}` : ""}`}
                </p>
              </div>
              {item.status === UploadItemStatuses.UPLOADING ? (
                <span className="text-[0.8125rem] tabular-nums text-muted-foreground">{item.progress}%</span>
              ) : null}
            </div>
            {item.status === UploadItemStatuses.UPLOADING || item.status === UploadItemStatuses.CONFIRMING ? (
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-card"
                role="progressbar"
                aria-label={`Uploading ${item.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.progress}
              >
                <div className="h-full rounded-full bg-brand transition-[width] duration-200" style={{ width: `${item.progress}%` }} />
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
