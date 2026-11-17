"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react"
import axios from "axios"
import { localApi } from "@/lib/localApi"

export type AuthUser = {
  id: string
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  error: boolean
  refreshUser: () => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const requestId = useRef(0)

  const refreshUser = useCallback(async (): Promise<boolean> => {
  const currentRequest = ++requestId.current

  setLoading(true)
  setError(false)

  try {
    const response = await localApi.get<AuthUser>("/api/auth/me", {
      headers: { "Cache-Control": "no-cache" },
    })

    const authenticatedUser = response.data

    if (
      typeof authenticatedUser?.id !== "string" ||
      typeof authenticatedUser?.name !== "string" ||
      typeof authenticatedUser?.email !== "string" ||
      !Array.isArray(authenticatedUser.roles) ||
      !Array.isArray(authenticatedUser.permissions)
    ) {
      throw new Error("Resposta inválida da API")
    }

    if (currentRequest !== requestId.current) {
      return false
    }

    setUser(authenticatedUser)
    return true
  } catch (err) {
    if (currentRequest !== requestId.current) {
      return false
    }

    setUser(null)

    if (
      !axios.isAxiosError(err) ||
      err.response?.status !== 401
    ) {
      setError(true)
    }

    return false
  } finally {
    if (currentRequest === requestId.current) {
      setLoading(false)
    }
  }
}, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  const logout = () => {
    sessionStorage.removeItem("auth_user")
    setUser(null)
    setError(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro de AuthProvider"
    )
  }

  return context;
}
