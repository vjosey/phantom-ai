import { auth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ projectId: string }>
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  const body = await req.json().catch(() => ({}))
  const name = typeof body.name === "string" && body.name.trim()
  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 })
  }

  // Atomic: ownership check and mutation in one query
  const result = await prisma.project.updateMany({
    where: { id: projectId, ownerId: userId },
    data: { name },
  })

  if (result.count === 0) {
    // Post-hoc check only to return the right status code — security already enforced above
    const exists = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    })
    return exists
      ? Response.json({ error: "Forbidden" }, { status: 403 })
      : Response.json({ error: "Not found" }, { status: 404 })
  }

  const updated = await prisma.project.findUnique({ where: { id: projectId } })
  return Response.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  // Atomic: ownership check and deletion in one query
  const result = await prisma.project.deleteMany({
    where: { id: projectId, ownerId: userId },
  })

  if (result.count === 0) {
    // Post-hoc check only to return the right status code — security already enforced above
    const exists = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    })
    return exists
      ? Response.json({ error: "Forbidden" }, { status: 403 })
      : Response.json({ error: "Not found" }, { status: 404 })
  }

  return new Response(null, { status: 204 })
}
