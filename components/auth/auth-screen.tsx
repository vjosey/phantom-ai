import { FileText, Users, Wand2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wand2,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

interface AuthScreenProps {
  children: ReactNode
}

export function AuthScreen({ children }: AuthScreenProps) {
  return (
    <div className="flex min-h-dvh bg-background">
      <div className="hidden w-1/2 flex-col justify-center gap-12 bg-card px-16 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="size-8 rounded-lg bg-primary" />
          <span className="text-lg font-semibold text-foreground">
            Phantom AI
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Design systems at the speed of thought.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Describe your architecture in plain English. Phantom AI maps it
            to a shared canvas your whole team can refine in real time.
          </p>
        </div>

        <ul className="flex flex-col gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                <Icon className="size-4" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {description}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Phantom AI. All rights reserved.
        </p>
      </div>

      <div className="flex w-full items-start justify-center px-6 py-12 lg:w-1/2 lg:items-center lg:py-6">
        {children}
      </div>
    </div>
  )
}
