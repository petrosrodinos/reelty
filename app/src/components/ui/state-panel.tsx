import type { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatePanelProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  children?: ReactNode
  className?: string
}

/** Centered empty / error / not-found block: icon, serif title, copy and actions. */
export const StatePanel: FC<StatePanelProps> = ({ icon, title, description, children, className }) => (
  <div className={cn("mx-auto flex max-w-lg flex-col items-center gap-3 rounded-lg border border-dashed border-hairline px-6 py-14 text-center", className)}>
    {icon ? <span className="grid size-12 place-items-center rounded-md bg-surface-card text-brand">{icon}</span> : null}
    <h2 className="text-display-sm">{title}</h2>
    {description ? <p className="text-muted-foreground">{description}</p> : null}
    {children ? <div className="mt-3 flex flex-wrap justify-center gap-3">{children}</div> : null}
  </div>
)
