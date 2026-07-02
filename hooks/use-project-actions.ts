"use client"

import { usePathname, useRouter } from "next/navigation"
import { useRef, useState } from "react"

import type { ProjectSummary } from "@/lib/projects"

export type DialogType = "none" | "create" | "rename" | "delete"

export interface UseProjectActionsResult {
  dialogType: DialogType
  activeProject: ProjectSummary | null
  nameInput: string
  setNameInput: (v: string) => void
  roomIdPreview: string
  isLoading: boolean
  error: string | null
  openCreate: () => void
  openRename: (project: ProjectSummary) => void
  openDelete: (project: ProjectSummary) => void
  closeDialog: () => void
  handleCreate: () => Promise<void>
  handleRename: () => Promise<void>
  handleDelete: () => Promise<void>
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function generateSuffix(): string {
  return Math.random().toString(36).slice(2, 8)
}

export function useProjectActions(): UseProjectActionsResult {
  const router = useRouter()
  const pathname = usePathname()

  const [dialogType, setDialogType] = useState<DialogType>("none")
  const [activeProject, setActiveProject] = useState<ProjectSummary | null>(null)
  const [nameInput, setNameInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const roomSuffix = useRef(generateSuffix())

  const slug = generateSlug(nameInput)
  const roomIdPreview = slug ? `${slug}-${roomSuffix.current}` : ""

  function openCreate() {
    roomSuffix.current = generateSuffix()
    setNameInput("")
    setActiveProject(null)
    setError(null)
    setDialogType("create")
  }

  function openRename(project: ProjectSummary) {
    setNameInput(project.name)
    setActiveProject(project)
    setError(null)
    setDialogType("rename")
  }

  function openDelete(project: ProjectSummary) {
    setActiveProject(project)
    setError(null)
    setDialogType("delete")
  }

  function closeDialog() {
    setDialogType("none")
    setActiveProject(null)
    setNameInput("")
    setError(null)
  }

  async function handleCreate() {
    if (!nameInput.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      })
      if (!res.ok) throw new Error("Failed to create project. Please try again.")
      const project: ProjectSummary = await res.json()
      closeDialog()
      router.push(`/editor/${project.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRename() {
    if (!nameInput.trim() || !activeProject) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${activeProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      })
      if (!res.ok) throw new Error("Failed to rename project. Please try again.")
      closeDialog()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!activeProject) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${activeProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project. Please try again.")
      closeDialog()
      if (pathname === `/editor/${activeProject.id}`) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    dialogType,
    activeProject,
    nameInput,
    setNameInput,
    roomIdPreview,
    isLoading,
    error,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
