"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getUserData, login } from "@/app/actions"
import { AuthUser } from "@/lib/types/auth"
import { useAuth } from "@/contexts/auth-context"
import { refresh } from "next/cache"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { refreshUser } = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password);

      const refreshed = await refreshUser();

      if(!refreshed){
        throw new Error("Não foi possível carregar os dados do usuário");
      }
      
      router.push("/dashboard");

    } catch (err) {
      sessionStorage.removeItem("auth_user")

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            err.response?.data?.error ??
            "Não foi possível entrar. Verifique suas credenciais e tente novamente.",
        )
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível entrar. Tente novamente.",
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="border-0 bg-transparent shadow-none">
            Acessar plataforma
          </CardTitle>
          <CardDescription className="text-[#647067]">
            Entre com sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="focus-visible:border-[#15803D] focus-visible:ring-[#15803D]/20"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="/recuperar-senha"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  className="focus-visible:border-[#15803D] focus-visible:ring-[#15803D]/20"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </Field>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#15803D] text-white hover:bg-[#14532D]"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <FieldDescription className="text-center">
                  Não tem uma conta? <a href="/cadastro">Realizar cadastro</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
