"use client"

import { Button } from "@/components/ui/button"
import { EditorDialog } from "@/components/editor/editor-dialog"
import { Input } from "@/components/ui/input"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context"

export function RenameProjectDialog() {
  const {
    dialogType,
    activeProject,
    nameInput,
    setNameInput,
    isLoading,
    error,
    closeDialog,
    handleRename,
  } = useProjectDialogsContext()

  return (
    <EditorDialog
      open={dialogType === "rename"}
      onOpenChange={(open) => { if (!open) closeDialog() }}
      title="Rename project"
      description={
        activeProject
          ? `Renaming "${activeProject.name}"`
          : undefined
      }
      footer={
        <>
          <Button variant="ghost" onClick={closeDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleRename} disabled={!nameInput.trim() || isLoading}>
            Rename
          </Button>
        </>
      }
    >
      <Input
        placeholder="New project name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleRename() }}
        autoFocus
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </EditorDialog>
  )
}
