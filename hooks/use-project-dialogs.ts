"use client"

import { useState } from "react"

import { MOCK_PROJECTS, type MockProject } from "@/lib/mock-projects"

export type DialogType = "none" | "create" | "rename" | "delete"

export interface UseProjectDialogsResult {
  dialogType: DialogType
  activeProject: MockProject | null
  nameInput: string
  setNameInput: (v: string) => void
  isLoading: boolean
  projects: MockProject[]
  openCreate: () => void
  openRename: (project: MockProject) => void
  openDelete: (project: MockProject) => void
  closeDialog: () => void
  handleCreate: () => void
  handleRename: () => void
  handleDelete: () => void
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function useProjectDialogs(): UseProjectDialogsResult {
  const [dialogType, setDialogType] = useState<DialogType>("none")
  const [activeProject, setActiveProject] = useState<MockProject | null>(null)
  const [nameInput, setNameInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<MockProject[]>(MOCK_PROJECTS)

  function openCreate() {
    setNameInput("")
    setActiveProject(null)
    setDialogType("create")
  }

  function openRename(project: MockProject) {
    setNameInput(project.name)
    setActiveProject(project)
    setDialogType("rename")
  }

  function openDelete(project: MockProject) {
    setActiveProject(project)
    setDialogType("delete")
  }

  function closeDialog() {
    setDialogType("none")
    setActiveProject(null)
    setNameInput("")
  }

  function handleCreate() {
    if (!nameInput.trim()) return
    setIsLoading(true)
    setTimeout(() => {
      const newProject: MockProject = {
        id: String(Math.max(...projects.map(p => parseInt(p.id) || 0)) + 1),
        name: nameInput.trim(),
        slug: generateSlug(nameInput),
        isOwned: true,
      }
      setProjects([...projects, newProject])
      setIsLoading(false)
      closeDialog()
    }, 0)
  }

  function handleRename() {
    if (!nameInput.trim() || !activeProject) return
    setIsLoading(true)
    setTimeout(() => {
      setProjects(
        projects.map(p =>
          p.id === activeProject.id
            ? { ...p, name: nameInput.trim(), slug: generateSlug(nameInput) }
            : p
        )
      )
      setIsLoading(false)
      closeDialog()
    }, 0)
  }

  function handleDelete() {
    if (!activeProject) return
    setIsLoading(true)
    setTimeout(() => {
      setProjects(projects.filter(p => p.id !== activeProject.id))
      setIsLoading(false)
      closeDialog()
    }, 0)
  }

  return {
    dialogType,
    activeProject,
    nameInput,
    setNameInput,
    isLoading,
    projects,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
