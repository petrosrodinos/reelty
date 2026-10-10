"use client";

import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  EraserIcon,
  EyeIcon,
  GripVerticalIcon,
  ImageIcon,
  Loader2Icon,
  Maximize2Icon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoomTypeFormOptions } from "@/config/constants/dropdowns/images/room-type-form.options";
import { WatermarkStatusFormOptions } from "@/config/constants/dropdowns/images/watermark-status-form.options";
import { WatermarkStatuses, type ProjectImage, type RoomType } from "@/features/images/interfaces/images.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: ProjectImage;
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  onPreview: () => void;
  onRoomChange: (room: RoomType) => void;
  onRemoveWatermark: () => void;
  onUseProcessed: (useProcessed: boolean) => void;
}

const roomItems = RoomTypeFormOptions.map((option) => ({ value: option.id, label: option.label }));

const Pill: FC<{ tone: "ok" | "bad" | "warn"; icon: FC<{ className?: string }>; children: string }> = ({ tone, icon: Icon, children }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6875rem] font-medium leading-snug text-ink",
      tone === "ok" && "bg-notice-ok",
      tone === "bad" && "bg-notice-bad text-[#7a2a2a]",
      tone === "warn" && "bg-notice-warn",
    )}
  >
    <Icon className="size-3" />
    {children}
  </span>
);

export const ImageCard: FC<ImageCardProps> = ({
  image,
  index,
  total,
  onMove,
  onRemove,
  onPreview,
  onRoomChange,
  onRemoveWatermark,
  onUseProcessed,
}) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });
  const number = index + 1;
  const processing = image.wm_status === WatermarkStatuses.PROCESSING;
  const attemptsLeft = Math.max(0, image.wm_max_attempts - image.wm_attempts);
  const previewUrl = image.use_processed && image.processed_url ? image.processed_url : (image.thumb_url ?? image.original_url);

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "relative flex list-none flex-col overflow-hidden rounded-lg border border-hairline bg-canvas",
        isDragging && "z-20 opacity-80 shadow-[0_8px_24px_rgba(20,20,19,0.18)] ring-2 ring-brand",
      )}
    >
      <div className="relative aspect-[3/2] bg-surface-card">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`Photo ${number}, ${getDropdownOptionLabel(RoomTypeFormOptions, image.room_type)}`}
            loading="lazy"
            draggable={false}
            className="size-full object-cover"
          />
        ) : (
          <span className="grid size-full place-items-center text-muted-foreground">
            <ImageIcon className="size-8" aria-hidden="true" />
          </span>
        )}

        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label={`Reorder photo ${number} of ${total}. Press space, then use arrow keys.`}
          style={{ touchAction: "none" }}
          className="absolute left-2 top-2 flex min-h-8 cursor-grab touch-none items-center gap-1 rounded-full bg-surface-dark/80 py-1 pl-1.5 pr-3 text-xs font-medium text-on-dark outline-none focus-visible:ring-3 focus-visible:ring-ring active:cursor-grabbing"
        >
          <GripVerticalIcon className="size-3.5 opacity-75" aria-hidden="true" />
          {number}
        </button>

        <div className="absolute right-2 top-2 flex gap-1.5">
          <button
            type="button"
            onClick={onPreview}
            aria-label={`Preview photo ${number}`}
            className="grid size-8 place-items-center rounded-full bg-canvas/95 text-ink outline-none hover:bg-canvas focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <Maximize2Icon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove photo ${number}`}
            className="grid size-8 place-items-center rounded-full bg-canvas/95 text-ink outline-none hover:bg-canvas focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5">
          {image.wm_status === WatermarkStatuses.DONE && image.use_processed ? (
            <Pill tone="ok" icon={CircleCheckIcon}>{getDropdownOptionLabel(WatermarkStatusFormOptions, WatermarkStatuses.DONE)}</Pill>
          ) : null}
          {image.wm_status === WatermarkStatuses.FAILED ? (
            <Pill tone="bad" icon={AlertTriangleIcon}>{getDropdownOptionLabel(WatermarkStatusFormOptions, WatermarkStatuses.FAILED)}</Pill>
          ) : null}
          {image.is_duplicate ? <Pill tone="warn" icon={AlertTriangleIcon}>Possible duplicate</Pill> : null}
          {image.low_resolution ? <Pill tone="warn" icon={AlertTriangleIcon}>Low resolution</Pill> : null}
        </div>

        {processing ? (
          <div className="absolute inset-0 grid place-items-center bg-surface-dark/60 text-center text-[0.8125rem] font-medium text-on-dark" role="status">
            <div>
              <Loader2Icon className="mx-auto mb-1.5 size-6 animate-spin" aria-hidden="true" />
              {getDropdownOptionLabel(WatermarkStatusFormOptions, WatermarkStatuses.PROCESSING)}…
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-2.5 sm:p-3">
        <div className="flex items-center gap-1.5">
          <Select value={image.room_type} onValueChange={(value) => value && onRoomChange(value as RoomType)} items={roomItems}>
            <SelectTrigger aria-label={`Room type for photo ${number}`} size="sm" className="min-w-0 flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RoomTypeFormOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon-sm"
            className="size-9 shrink-0"
            aria-label={`Move photo ${number} earlier`}
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="size-9 shrink-0"
            aria-label={`Move photo ${number} later`}
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>

        <WatermarkControls
          image={image}
          attemptsLeft={attemptsLeft}
          onRemoveWatermark={onRemoveWatermark}
          onUseProcessed={onUseProcessed}
          onPreview={onPreview}
        />
      </div>
    </li>
  );
};

interface WatermarkControlsProps {
  image: ProjectImage;
  attemptsLeft: number;
  onRemoveWatermark: () => void;
  onUseProcessed: (useProcessed: boolean) => void;
  onPreview: () => void;
}

const WatermarkControls: FC<WatermarkControlsProps> = ({ image, attemptsLeft, onRemoveWatermark, onUseProcessed, onPreview }) => {
  if (image.wm_status === WatermarkStatuses.PROCESSING) {
    return (
      <Button variant="outline" size="sm" className="w-full" disabled>
        <Loader2Icon className="animate-spin" /> Removing…
      </Button>
    );
  }

  if (image.wm_status === WatermarkStatuses.DONE && image.has_processed) {
    return (
      <div className="flex flex-col gap-2">
        <div role="group" aria-label="Which version the video uses" className="flex overflow-hidden rounded-md border border-hairline *:leading-tight">
          <button
            type="button"
            onClick={() => onUseProcessed(true)}
            aria-pressed={image.use_processed}
            className={cn(
              "min-h-9 flex-1 px-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              image.use_processed ? "bg-surface-card text-ink" : "bg-canvas text-muted-foreground hover:text-ink",
            )}
          >
            Keep result
          </button>
          <button
            type="button"
            onClick={() => onUseProcessed(false)}
            aria-pressed={!image.use_processed}
            className={cn(
              "min-h-9 flex-1 border-l border-hairline px-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              !image.use_processed ? "bg-surface-card text-ink" : "bg-canvas text-muted-foreground hover:text-ink",
            )}
          >
            Revert to original
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="min-w-24 flex-1" onClick={onPreview}>
            <EyeIcon /> Compare
          </Button>
          {attemptsLeft > 0 ? (
            <Button variant="outline" size="sm" className="min-w-24 flex-1" onClick={onRemoveWatermark}>
              <RefreshCwIcon /> Retry ({attemptsLeft})
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  if (image.wm_status === WatermarkStatuses.FAILED) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-error">Watermark removal is not available right now. Please try again later, or continue without it.</p>
        <Button variant="outline" size="sm" className="w-full" onClick={onRemoveWatermark} disabled={attemptsLeft <= 0}>
          <RefreshCwIcon /> Retry ({attemptsLeft} left)
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={onRemoveWatermark}
      disabled={attemptsLeft <= 0}
      title={attemptsLeft <= 0 ? "You used both watermark removal attempts for this photo." : undefined}
    >
      <EraserIcon /> Remove watermark
    </Button>
  );
};
