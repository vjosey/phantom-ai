import { auth, currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

export interface ProjectSummary {
  id: string
  name: string
}

export async function getOwnedProjects(): Promise<ProjectSummary[]> {
  const { userId } = await auth()
  if (!userId) return []

  return prisma.project.findMany({
    where: { ownerId: userId },
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getSharedProjects(): Promise<ProjectSummary[]> {
  const user = await currentUser()
  if (!user) return []

  const email = user.primaryEmailAddress?.emailAddress
  if (!email) return []

  return prisma.project.findMany({
    where: {
      collaborators: { some: { email } },
      ownerId: { not: user.id },
    },
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  })
}
