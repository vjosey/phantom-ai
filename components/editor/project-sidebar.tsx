"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
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
        <TabsContent
          value="my-projects"
          className="flex flex-1 items-center justify-center text-sm text-muted-foreground"
        >
          No projects yet.
        </TabsContent>
        <TabsContent
          value="shared"
          className="flex flex-1 items-center justify-center text-sm text-muted-foreground"
        >
          No shared projects yet.
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-4">
        <Button className="w-full">
          <Plus />
          New Project
        </Button>
      </div>
    </aside>
  )
}
