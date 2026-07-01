"use client"

import { createContext, useContext } from "react"

import type { UseProjectDialogsResult } from "@/hooks/use-project-dialogs"

export const ProjectDialogsContext =
  createContext<UseProjectDialogsResult | null>(null)

export function useProjectDialogsContext(): UseProjectDialogsResult {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) {
    throw new Error(
      "useProjectDialogsContext must be used within EditorShell"
    )
  }
  return ctx
}
