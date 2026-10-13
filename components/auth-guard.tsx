"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type AuthGuardProps = {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token")

    if (!token) {
      router.replace("/login")
      return
    }

    setIsAuthenticated(true)
    setIsChecking(false)
  }, [router])

  if (isChecking || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Verificando autenticação...
      </div>
    )
  }

  return <>{children}</>
}
