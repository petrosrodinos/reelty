"use client"

import { useRef, useState, type DragEvent, type FC, type KeyboardEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DropzoneProps {
  onFiles: (files: File[]) => void
  accept: string
  multiple?: boolean
  disabled?: boolean
  /** Accessible name for the drop target button. */
  label: string
  className?: string
  children: ReactNode
}

/** Drag-and-drop + click/keyboard file picker. Presentational: hands raw files to the caller. */
export const Dropzone: FC<DropzoneProps> = ({ onFiles, accept, multiple = true, disabled = false, label, className, children }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const open = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    if (disabled) return
    const files = Array.from(event.dataTransfer.files)
    if (files.length) onFiles(multiple ? files : files.slice(0, 1))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      open()
    }
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-disabled={disabled}
      onClick={open}
      onKeyDown={handleKeyDown}
      onDragEnter={(event) => {
        event.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      data-dragging={dragging}
      className={cn(
        "cursor-pointer rounded-lg border-[1.5px] border-dashed border-muted-soft bg-canvas text-center outline-none transition-colors",
        "hover:bg-surface-soft focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "data-[dragging=true]:border-brand data-[dragging=true]:bg-surface-soft",
        "aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:bg-canvas",
        className,
      )}
    >
      {children}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
          event.target.value = ""
          if (files.length) onFiles(files)
        }}
      />
    </div>
  )
}
