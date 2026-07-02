export interface MockProject {
  id: string
  name: string
  slug: string
  isOwned: boolean
}

export const MOCK_PROJECTS: MockProject[] = [
  { id: "1", name: "E-commerce Platform", slug: "e-commerce-platform", isOwned: true },
  { id: "2", name: "Auth Service", slug: "auth-service", isOwned: true },
  { id: "3", name: "Analytics Dashboard", slug: "analytics-dashboard", isOwned: false },
]
