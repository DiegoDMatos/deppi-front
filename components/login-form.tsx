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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="border-0 bg-transparent shadow-none">Acessar plataforma</CardTitle>
          <CardDescription className="text-[#647067]">
            Entre com sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    className="focus-visible:border-[#15803D] focus-visible:ring-[#15803D]/20"
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
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="bg-[#15803D] text-white hover:bg-[#14532D]"
                >
                  Entrar
                </Button>
                <FieldDescription className="text-center">
                  Não tem uma conta? <a href="/cadastro">Crie uma conta</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
