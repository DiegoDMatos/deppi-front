
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  LogOut,
} from "lucide-react"

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
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const menuItems = [
  { label: "Início", href: "/admin", icon: LayoutDashboard },
  { label: "Usuários", href: "/admin/usuarios", icon: Users },
  { label: "Cursos", href: "/admin/cursos", icon: BookOpen },
  { label: "Professores", href: "/admin/professores", icon: GraduationCap },
  { label: "Inscrições", href: "/admin/inscricoes", icon: ClipboardList },
]

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b px-4 py-5">
          <p className="text-xl font-bold text-[#14532D]">DEPPI</p>
          <p className="text-xs text-muted-foreground">
            Gestão de extensão
          </p>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.href}>
                              
                    <SidebarMenuButton
                    isActive={item.href === "/admin"}
                    tooltip={item.label}
                    >
                    <Link href={item.href} className="flex w-full items-center gap-2">
                        <Icon />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>

                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

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
            Administrador
            </p>
            <p className="text-xs text-muted-foreground">
            Administrador do sistema
            </p>
        </div>

        <DropdownMenu>
            
        <DropdownMenuTrigger
        aria-label="Abrir menu do usuário"
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:ring-offset-2"
        >
        <Avatar className="size-10 border border-[#D8E8DA]">
            <AvatarFallback className="bg-[#EAF4EC] font-semibold text-[#14532D]">
            AD
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

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
