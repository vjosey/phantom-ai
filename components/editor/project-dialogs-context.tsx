"use client"

import { createContext, useContext } from "react"

import type { UseProjectActionsResult } from "@/hooks/use-project-actions"

export const ProjectDialogsContext =
  createContext<UseProjectActionsResult | null>(null)

export function useProjectDialogsContext(): UseProjectActionsResult {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) {
    throw new Error(
      "useProjectDialogsContext must be used within EditorShell"
    )
  }
  return ctx
}
