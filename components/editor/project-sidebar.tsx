"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context"
import type { MockProject } from "@/lib/mock-projects"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function ProjectItem({ project }: { project: MockProject }) {
  const { openRename, openDelete } = useProjectDialogsContext()

  return (
    <div className="group flex items-center gap-1 rounded-xl px-2 py-2 hover:bg-secondary">
      <span className="flex-1 truncate text-sm">{project.name}</span>
      {project.isOwned && (
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Rename ${project.name}`}
            onClick={(e) => {
              e.stopPropagation()
              openRename(project)
            }}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${project.name}`}
            onClick={(e) => {
              e.stopPropagation()
              openDelete(project)
            }}
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </div>
  )
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { openCreate, projects } = useProjectDialogsContext()

  const ownedProjects = projects.filter((p) => p.isOwned)
  const sharedProjects = projects.filter((p) => !p.isOwned)

  return (
    <aside
      inert={!isOpen}
      aria-hidden={!isOpen}
      className={cn(
        "fixed top-16 bottom-4 left-3 z-40 flex w-72 flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-lg transition-transform duration-200",
        isOpen ? "translate-x-0" : "-translate-x-[120%]"
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-medium">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X />
        </Button>
      </div>

      <Tabs
        defaultValue="my-projects"
        className="flex flex-1 flex-col overflow-hidden px-4 py-3"
      >
        <TabsList className="w-full">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects" className="flex flex-1 flex-col overflow-hidden">
          {ownedProjects.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              No projects yet.
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-0.5 py-1">
                {ownedProjects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="shared" className="flex flex-1 flex-col overflow-hidden">
          {sharedProjects.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              No shared projects yet.
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-0.5 py-1">
                {sharedProjects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-4">
        <Button className="w-full" onClick={openCreate}>
          <Plus />
          New Project
        </Button>
      </div>
    </aside>
  )
}
