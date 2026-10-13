
import { z } from "zod"

export const cadastroSchema = z
  .object({
    name: z.string().trim().min(1, "Informe seu nome completo."),
    email: z.email("Informe um e-mail válido."),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .regex(/[A-Za-z]/, "A senha deve conter pelo menos uma letra.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })

export type CadastroFormData = z.infer<typeof cadastroSchema>
