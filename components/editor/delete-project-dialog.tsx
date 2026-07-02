"use client"

import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EditorDialog } from "@/components/editor/editor-dialog"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context"

export function DeleteProjectDialog() {
  const { dialogType, activeProject, isLoading, error, closeDialog, handleDelete } =
    useProjectDialogsContext()

  return (
    <EditorDialog
      open={dialogType === "delete"}
      onOpenChange={(open) => { if (!open) closeDialog() }}
      title="Delete project"
      description={
        activeProject
          ? `"${activeProject.name}" will be permanently deleted. This cannot be undone.`
          : "This project will be permanently deleted. This cannot be undone."
      }
      footer={
        <>
          <Button variant="ghost" onClick={closeDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete project"
            )}
          </Button>
        </>
      }
    >
      {error && <p className="text-sm text-destructive">{error}</p>}
    </EditorDialog>
  )
}
