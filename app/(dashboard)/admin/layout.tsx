import { AuthGuard } from "@/components/auth-guard"

type AdminLayoutProps = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>
}