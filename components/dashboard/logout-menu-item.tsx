"use client"

import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function LogoutMenuItem() {
  const router = useRouter()

  function handleLogout() {
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")

    router.replace("/login")
    router.refresh()
  }

  return (
    <DropdownMenuItem
      className="text-red-600 focus:text-red-600"
      onSelect={handleLogout}
    >
      Sair
    </DropdownMenuItem>
  )
}