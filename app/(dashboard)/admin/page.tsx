
"use client"

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts"

const enrollmentStatusData = [
  { status: "Pendente", value: 0, color: "#C8752B" },
  { status: "Deferida", value: 0, color: "#348D59" },
  { status: "Indeferida", value: 0, color: "#C83D3D" },
  { status: "Cancelada", value: 0, color: "#808080" },
]

const courseStatusData = [
  { status: "Em análise", value: 5, color: "#B95A0A" },
  { status: "Em andamento", value: 10, color: "#16803D" },
  { status: "Concluído", value: 9, color: "#2455E8" },
  { status: "Fechado", value: 0, color: "#A0A0A0" },
]

const totalCourses = courseStatusData.reduce(
  (total, item) => total + item.value,
  0,
)

const indicators = [
  { title: "Usuários", value: "—" },
  { title: "Cursos", value: "—" },
  { title: "Professores", value: "—" },
  { title: "Inscrições", value: "—" },
]

export default function AdminPage() {
  const maxEnrollment = Math.max(
    ...enrollmentStatusData.map((item) => item.value),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#14532D]">
          Início
        </h1>
        <p className="text-sm text-muted-foreground">
          Visão geral dos cursos de extensão do IFCE.
        </p>
        <p className="mt-1 text-xs text-amber-700">
          Dados demonstrativos — não representam informações reais.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {indicators.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <p className="mt-2 text-3xl font-bold text-[#14532D]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <section className="min-w-0 rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Inscrições por situação</h2>
            <button
              type="button"
              className="text-sm text-[#B95A0A] underline underline-offset-4"
            >
              Detalhes
            </button>
          </div>

          <div className="space-y-4">
            {enrollmentStatusData.map((item) => (
              <div
                key={item.status}
                className="grid grid-cols-[112px_minmax(0,1fr)_52px] items-center gap-3"
              >
                <span
                  className="truncate text-sm"
                  style={{ color: item.color }}
                >
                  {item.status}
                </span>

                <div className="h-5 overflow-hidden rounded bg-[#F0EFEC]">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${(item.value / maxEnrollment) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                <span className="text-right text-sm tabular-nums">
                  {item.value.toLocaleString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold">Cursos por situação</h2>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative h-45 w-full max-w-45 shrink-0">
              <PieChart width={180} height={180}>
                <Pie
                  data={courseStatusData}
                  dataKey="value"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={74}
                  paddingAngle={1}
                  stroke="none"
                >
                  {courseStatusData.map((item) => (
                    <Cell key={item.status} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{totalCourses}</span>
                <span className="text-xs text-muted-foreground">cursos</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              {courseStatusData.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate">{item.status}</span>
                  </div>
                  <span className="tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
