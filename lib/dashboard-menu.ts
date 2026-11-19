import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { Permission, UserRole } from "./types/auth";

export const dashboardMenus = {
  ADMIN: [
    { label: "Início", href: "/inicio", icon: LayoutDashboard },
    { label: "Usuários", href: "/usuarios", icon: Users, permissions: ["MANAGE_USERS", "CREATE_USER"] },
    { label: "Cursos", href: "/cursos", icon: BookOpen, permissions: ["VIEW_COURSES"] },
    { label: "Professores", href: "/professores", icon: GraduationCap, permissions: ["MANAGE_USERS"] },
    { label: "Inscrições", href: "/inscricoes", icon: ClipboardList, permissions: ["MANAGE_ENROLLMENT"] },
    { label: "Permissões", href: "/permissoes", icon: ShieldCheck, permissions: ["MANAGE_PERMISSIONS", "VIEW_PERMISSIONS"] },
    { label: "Cargos", href: "/cargos", icon: UserRound, permissions: ["MANAGE_ROLES"] },
  ],
  DEPPI: [
    { label: "Início", href: "/inicio", icon: LayoutDashboard },
    { label: "Cursos", href: "/cursos", icon: BookOpen, permissions: ["VIEW_COURSES", "CREATE_COURSES", "UPDATE_COURSES"] },
    { label: "Inscrições", href: "/inscricoes", icon: ClipboardList, permissions: ["MANAGE_ENROLLMENT", "enrollment.approve", "enrollment.reject", "enrollment.cancel"] },
    { label: "Cargos", href: "/cargos", icon: UserRound, permissions: ["DEPPI_ROLES"] },
  ],
  PROFESSOR: [
    { label: "Início", href: "/inicio", icon: LayoutDashboard },
    { label: "Cursos", href: "/cursos", icon: BookOpen, permissions: ["CREATE_COURSES", "UPDATE_COURSES", "CLOSE_COURSE"] },
    { label: "Inscrições", href: "/inscricoes", icon: ClipboardList, permissions: ["MANAGE_ENROLLMENT"] },
  ],
  ALUNO: [
    { label: "Início", href: "/inicio", icon: LayoutDashboard },
    { label: "Cursos disponíveis", href: "/cursos", icon: BookOpen },
    { label: "Minhas inscrições", href: "/inscricoes", icon: ClipboardList },
    { label: "Meu perfil", href: "/perfil", icon: UserRound },
  ],
} satisfies Record<UserRole, { label: string; href: string; icon: typeof LayoutDashboard; permissions?: Permission[] }[]>

export function getDashboardMenu(
  role: UserRole | undefined,
  permissions: string[],
) {

  if(!role) return [];

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
