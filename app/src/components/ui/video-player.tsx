"use client"

import type { FC } from "react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string | null
  autoPlay?: boolean
  onError?: () => void
  className?: string
}

/** Presentational player for a signed MP4 URL. */
export const VideoPlayer: FC<VideoPlayerProps> = ({ src, poster, autoPlay = false, onError, className }) => {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-black", className)}>
      <video
        className="aspect-video w-full bg-black"
        src={src}
        poster={poster ?? undefined}
        controls
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        onError={onError}
      >
        Your browser cannot play this video. Use the Download button instead.
      </video>
    </div>
  )
}
