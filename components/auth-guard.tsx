"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type AuthGuardProps = {
  children: React.ReactNode
  allowedRoles?: string[]
}

type AuthUser = {
  id: string
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

export function AuthGuard({
  children,
  allowedRoles,
}: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token")
    const storedUser = sessionStorage.getItem("auth_user")

    if (!token || !storedUser) {
      router.replace("/login")
      return
    }

    let user: AuthUser

    try {
      user = JSON.parse(storedUser)

      if (!Array.isArray(user.roles)) {
        throw new Error("Dados de usuário inválidos")
      }
    } catch {
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_user")
      router.replace("/login")
      return
    }

    const hasPermission =
      !allowedRoles ||
      allowedRoles.some((role) => user.roles.includes(role))

    if (!hasPermission) {
      router.replace("/403")
      return
    }

    setIsAuthorized(true)
  }, [router, allowedRoles])

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Verificando acesso...
      </div>
    )
  }

  return <>{children}</>
}
