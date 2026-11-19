"use client"

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
} from "@/components/ui/sidebar"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

function getNameInitials(name: string){
  if(!name) return "IF"

  const initials = name.split(' ').map((n) => n[0].toUpperCase());
  return initials.length > 1 ? initials[0] + initials[1] : initials[0];
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const { user, loading } = useAuth();
  const pathname = usePathname();

  if(loading) return (<p>Carregando</p>);
  if(!user) return (<p>Redirecionando...</p>);

  return (
      <SidebarProvider>
        <DashboardSidebar />

        <SidebarInset className="min-w-0 bg-[#F8FAF8]">
          <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-white px-4 lg:px-6">

            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-[#14532D]">
                Início
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-[#202820]">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.roles[0]}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Abrir menu do usuário"
                  className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:ring-offset-2"
                >
                  <Avatar className="size-10 border border-[#D8E8DA]">
                    <AvatarFallback className="bg-[#EAF4EC] font-semibold text-[#14532D]">
                      {getNameInitials(user.name)}
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
