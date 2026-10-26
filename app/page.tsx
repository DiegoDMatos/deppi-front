import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
      <main className="grid min-h-svh gap-4 bg-[#F8FAF8] p-4 lg:grid-cols-2">      
<section className="relative hidden overflow-hidden rounded-2xl bg-[#14532D] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/campus-cedro.jpg')" }}
        />

<div className="absolute inset-0 bg-linear-to-br from-[#14532D]/70 via-[#14532D]/35 to-[#14532D]/10" />
        <div className="relative z-10">
          <p className="text-sm font-medium tracking-[0.2em] text-white/80">
            IFCE · CAMPUS CEDRO
          </p>
          <h1 className="mt-8 max-w-xl text-4xl font-bold leading-tight text-white xl:text-5xl">
            Cursos de extensão do IFCE, num só lugar.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/85">
            Uma plataforma para facilitar o acesso aos cursos de extensão,
            aproximando estudantes, professores e comunidade.
          </p>
        </div>

        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="text-sm text-white/75">
            DEPPI · Gestão de cursos de extensão
          </p>
        </div>
      </section>

      <section className="flex min-h-svh items-center justify-center px-6 py-12 md:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <p className="text-sm font-semibold tracking-wider text-[#15803D]">
              DEPPI · IFCE
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#14532D]">
              Cursos de extensão do IFCE
            </h1>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  )
}