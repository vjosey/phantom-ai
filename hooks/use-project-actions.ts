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
  const roomSuffix = useRef(generateSuffix())

  const slug = generateSlug(nameInput)
  const roomIdPreview = slug ? `${slug}-${roomSuffix.current}` : ""

  function openCreate() {
    roomSuffix.current = generateSuffix()
    setNameInput("")
    setActiveProject(null)
    setDialogType("create")
  }

  function openRename(project: ProjectSummary) {
    setNameInput(project.name)
    setActiveProject(project)
    setDialogType("rename")
  }

  function openDelete(project: ProjectSummary) {
    setActiveProject(project)
    setDialogType("delete")
  }

  function closeDialog() {
    setDialogType("none")
    setActiveProject(null)
    setNameInput("")
  }

  async function handleCreate() {
    if (!nameInput.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      })
      if (!res.ok) throw new Error("Failed to create project")
      const project: ProjectSummary = await res.json()
      closeDialog()
      router.push(`/editor/${project.id}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRename() {
    if (!nameInput.trim() || !activeProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${activeProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      })
      if (!res.ok) throw new Error("Failed to rename project")
      closeDialog()
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!activeProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${activeProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")
      closeDialog()
      if (pathname === `/editor/${activeProject.id}`) {
        router.push("/editor")
      } else {
        router.refresh()
      }
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
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
