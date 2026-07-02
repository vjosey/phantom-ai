"use client"

import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EditorDialog } from "@/components/editor/editor-dialog"
import { Input } from "@/components/ui/input"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context"

export function CreateProjectDialog() {
  const {
    dialogType,
    nameInput,
    setNameInput,
    roomIdPreview,
    isLoading,
    error,
    closeDialog,
    handleCreate,
  } = useProjectDialogsContext()

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
          <Button
            onClick={handleCreate}
            disabled={!nameInput.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create project"
            )}
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
        {roomIdPreview && (
          <p className="text-xs text-muted-foreground">
            Room ID: <span className="font-mono">{roomIdPreview}</span>
          </p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </EditorDialog>
  )
}
