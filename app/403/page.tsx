"use client"

import { useRouter } from "next/navigation"
import { ShieldX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function ForbiddenPage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAF8] px-4">
      <Card className="w-full max-w-md text-center shadow-sm">
        <CardHeader className="items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#EAF4EC]">
            <ShieldX className="size-8 text-[#15803D]" />
          </div>

          <span className="text-5xl font-bold text-[#14532D]">
            403
          </span>

          <CardTitle className="text-2xl">
            Acesso negado
          </CardTitle>

          <CardDescription className="text-center">
            Você não possui permissão para acessar
            esta página.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Button
            onClick={() => router.back()}
            className="bg-[#15803D] text-white hover:bg-[#14532D]"
          >
            Voltar à página anterior
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Ir para o login
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
