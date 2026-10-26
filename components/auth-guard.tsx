"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

type AuthGuardProps = {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function AuthGuard({
  children,
  allowedRoles,
}: AuthGuardProps) {
  const router = useRouter()
  const { user, loading, error, refreshUser } = useAuth()

  const hasPermission =
    !!user &&
    (!allowedRoles ||
      allowedRoles.some((role) =>
        user.roles.includes(role)
      ))

  useEffect(() => {
    if (loading || error) return

    if (!user) {
      router.replace("/login")
      return
    }

    if (!hasPermission) {
      router.replace("/403")
    }
  }, [user, loading, error, hasPermission, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Verificando acesso...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Não foi possível verificar sua sessão.</p>

        <button
          type="button"
          onClick={() => void refreshUser()}
          className="rounded-md bg-[#15803D] px-4 py-2 text-white"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
