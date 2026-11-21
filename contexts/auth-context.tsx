"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import axios from "axios";
import { UserRole } from "@/lib/types/auth";
import { getUserData } from "@/app/actions";
import { AuthUser } from "@/lib/types/auth";
import { deleteToken } from "@/app/(dashboard)/actions";

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
  refreshUser: () => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const requestId = useRef(0);

  const refreshUser = useCallback(async (): Promise<boolean> => {
    const currentRequest = ++requestId.current;

    setLoading(true);
    setError(false);

    try {
      const response = await getUserData();

      if (!response?.success) return false;

      const authenticatedUser = response?.data;

      if (!authenticatedUser) return false;

      if (
        typeof authenticatedUser.id !== "string" ||
        typeof authenticatedUser.name !== "string" ||
        typeof authenticatedUser.email !== "string" ||
        !Array.isArray(authenticatedUser.roles) ||
        !Array.isArray(authenticatedUser.permissions)
      ) {
        throw new Error("Resposta inválida da API");
      }

      if (currentRequest !== requestId.current) {
        return false;
      }

      const { email, name } = authenticatedUser;
      sessionStorage.setItem("auth_user", JSON.stringify({ email, name }));

      setUser(authenticatedUser);
      return true;
    } catch (err) {
      if (currentRequest !== requestId.current) {
        return false;
      }

      setUser(null);

      return false;
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const logout = () => {
    deleteToken();
    sessionStorage.removeItem("auth_user");
    setUser(null);
    setError(false);
  };

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
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
  }

  return context;
}
