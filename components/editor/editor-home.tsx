"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context"

export function EditorHome() {
  const { openCreate } = useProjectDialogsContext()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold">
          Create a project or open an existing one
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
      </div>
      <Button onClick={openCreate}>
        <Plus />
        New Project
      </Button>
    </div>
  )
}
