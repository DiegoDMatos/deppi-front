"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import axios from "axios"
import { api } from "@/lib/api"

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
  refreshUser: () => Promise<void>
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

  const refreshUser = useCallback(async () => {
    const token = sessionStorage.getItem("auth_token")

    if (!token) {
      setUser(null)
      setError(false)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await api.get<AuthUser>("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (
        !Array.isArray(response.data.roles) ||
        !Array.isArray(response.data.permissions)
      ) {
        throw new Error("Resposta inválida da API")
      }

      setUser(response.data)
      sessionStorage.setItem(
        "auth_user",
        JSON.stringify(response.data)
      )
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response?.status === 401
      ) {
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("auth_user")
        setUser(null)
      } else {
        setError(true)
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  const logout = () => {
    sessionStorage.removeItem("auth_token")
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
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro de AuthProvider"
    )
  }

  return context
}
