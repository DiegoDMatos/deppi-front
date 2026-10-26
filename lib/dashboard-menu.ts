import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  UserRound,
} from "lucide-react"

export type UserRole = "ADMIN" | "DEPPI" | "PROFESSOR" | "ALUNO"

export type Permission =
  | "CREATE_USER"
  | "MANAGE_PERMISSIONS"
  | "MANAGE_ROLES"
  | "MANAGE_USERS"
  | "VIEW_PERMISSIONS"
  | "DEPPI_ROLES"
  | "CREATE_COURSES"
  | "VIEW_COURSES"
  | "UPDATE_COURSES"
  | "DELETE_COURSES"
  | "CLOSE_COURSE"
  | "MANAGE_ENROLLMENT"
  | "enrollment.approve"
  | "enrollment.reject"
  | "enrollment.cancel"

export const dashboardMenus = {
  ADMIN: [
    { label: "Início", href: "/admin", icon: LayoutDashboard },
    { label: "Usuários", href: "/admin/usuarios", icon: Users, permissions: ["MANAGE_USERS", "CREATE_USER"] },
    { label: "Cursos", href: "/admin/cursos", icon: BookOpen, permissions: ["VIEW_COURSES"] },
    { label: "Professores", href: "/admin/professores", icon: GraduationCap, permissions: ["MANAGE_USERS"] },
    { label: "Inscrições", href: "/admin/inscricoes", icon: ClipboardList, permissions: ["MANAGE_ENROLLMENT"] },
    { label: "Permissões", href: "/admin/permissoes", icon: ShieldCheck, permissions: ["MANAGE_PERMISSIONS", "VIEW_PERMISSIONS"] },
    { label: "Cargos", href: "/admin/cargos", icon: UserRound, permissions: ["MANAGE_ROLES"] },
  ],
  DEPPI: [
    { label: "Início", href: "/deppi", icon: LayoutDashboard },
    { label: "Cursos", href: "/deppi/cursos", icon: BookOpen, permissions: ["VIEW_COURSES", "CREATE_COURSES", "UPDATE_COURSES"] },
    { label: "Inscrições", href: "/deppi/inscricoes", icon: ClipboardList, permissions: ["MANAGE_ENROLLMENT", "enrollment.approve", "enrollment.reject", "enrollment.cancel"] },
    { label: "Cargos", href: "/deppi/cargos", icon: UserRound, permissions: ["DEPPI_ROLES"] },
  ],
  PROFESSOR: [
    { label: "Início", href: "/professor", icon: LayoutDashboard },
    { label: "Cursos", href: "/professor/cursos", icon: BookOpen, permissions: ["CREATE_COURSES", "UPDATE_COURSES", "CLOSE_COURSE"] },
    { label: "Inscrições", href: "/professor/inscricoes", icon: ClipboardList, permissions: ["MANAGE_ENROLLMENT"] },
  ],
  ALUNO: [
    { label: "Início", href: "/aluno", icon: LayoutDashboard },
    { label: "Cursos disponíveis", href: "/aluno/cursos", icon: BookOpen },
    { label: "Minhas inscrições", href: "/aluno/inscricoes", icon: ClipboardList },
    { label: "Meu perfil", href: "/aluno/perfil", icon: UserRound },
  ],
} satisfies Record<UserRole, { label: string; href: string; icon: typeof LayoutDashboard; permissions?: Permission[] }[]>


export function getDashboardMenu(
  role: UserRole,
  permissions: string[],
) {
  const menu = dashboardMenus[role] as {
    label: string
    href: string
    icon: typeof LayoutDashboard
    permissions?: Permission[]
  }[]

  return menu.filter((item) => {
    if (!item.permissions) return true

    return item.permissions.some((permission: Permission) =>
      permissions.includes(permission),
    )
  })
}
