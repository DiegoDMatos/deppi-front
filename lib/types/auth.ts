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

export type AuthUser = {
  id: string
  name: string
  email: string
  roles: UserRole[]
  permissions: string[]
}