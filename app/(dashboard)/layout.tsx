import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { currentRole, mockUsers } from "@/lib/mock-user"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = mockUsers[currentRole]

  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset className="min-w-0 bg-[#F8FAF8]">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-white px-4 lg:px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />

          <div className="flex-1">
            <p className="text-sm font-semibold text-[#14532D]">
              Painel administrativo
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#202820]">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.description}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Abrir menu do usuário"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:ring-offset-2"
              >
                <Avatar className="size-10 border border-[#D8E8DA]">
                  <AvatarFallback className="bg-[#EAF4EC] font-semibold text-[#14532D]">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  Minha conta
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  Perfil
                </DropdownMenuItem>

                <DropdownMenuItem>
                  Configurações
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onSelect={() => {
                    window.location.href = "/login"
                  }}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
