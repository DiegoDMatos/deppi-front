
import type { Permission, UserRole } from "@/lib/dashboard-menu"

type MockUser = {
  name: string
  description: string
  initials: string
  role: UserRole
  permissions: Permission[]
}

function getNameInitials(name: string){
  if(!name) return "IF"

  const initials = name.split(' ').map((n) => n[0]);
  return initials.length > 1 ? initials[0] + initials[1] : initials[0];
}

export const currentRole: UserRole = "DEPPI"

export const mockUsers: Record<UserRole, MockUser> = {
  ADMIN: {
    name: "Administrador",
    description: "Administrador do sistema",
    initials: "AD",
    role: "ADMIN",
    permissions: [
      "CREATE_USER",
      "MANAGE_PERMISSIONS",
      "MANAGE_ROLES",
      "MANAGE_USERS",
      "VIEW_PERMISSIONS",
      "DEPPI_ROLES",
      "CREATE_COURSES",
      "VIEW_COURSES",
      "UPDATE_COURSES",
      "DELETE_COURSES",
      "CLOSE_COURSE",
      "MANAGE_ENROLLMENT",
    ],
  },

  DEPPI: {
    name: "Equipe DEPPI",
    description: "Gestão de extensão",
    initials: getNameInitials("Equipe DEPPI"),
    role: "DEPPI",
    permissions: [
      "enrollment.approve",
      "enrollment.reject",
      "enrollment.cancel",
      "DEPPI_ROLES",
      "CREATE_COURSES",
      "VIEW_COURSES",
      "UPDATE_COURSES",
      "DELETE_COURSES",
      "CLOSE_COURSE",
      "MANAGE_ENROLLMENT",
    ],
  },

  PROFESSOR: {
    name: "Mariana Oliveira",
    description: "Professor",
    initials: "MO",
    role: "PROFESSOR",
    permissions: [
      "CREATE_COURSES",
      "UPDATE_COURSES",
      "CLOSE_COURSE",
      "MANAGE_ENROLLMENT",
    ],
  },

  ALUNO: {
    name: "Aluno",
    description: "Estudante",
    initials: "AL",
    role: "ALUNO",
    permissions: [],
  },
}
