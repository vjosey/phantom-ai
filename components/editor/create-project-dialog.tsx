"use client"

import { Button } from "@/components/ui/button"
import { EditorDialog } from "@/components/editor/editor-dialog"
import { Input } from "@/components/ui/input"
import { generateSlug } from "@/hooks/use-project-dialogs"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context"

export function CreateProjectDialog() {
  const { dialogType, nameInput, setNameInput, isLoading, closeDialog, handleCreate } =
    useProjectDialogsContext()

  const slug = generateSlug(nameInput)

  return (
    <EditorDialog
      open={dialogType === "create"}
      onOpenChange={(open) => { if (!open) closeDialog() }}
      title="New project"
      description="Give your architecture workspace a name."
      footer={
        <>
          <Button variant="ghost" onClick={closeDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!nameInput.trim() || isLoading}>
            Create project
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Project name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleCreate() }}
          autoFocus
        />
        {slug && (
          <p className="text-xs text-muted-foreground">
            Slug: <span className="font-mono">{slug}</span>
          </p>
        )}
      </div>
    </EditorDialog>
  )
}
