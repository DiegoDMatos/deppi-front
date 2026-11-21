"use server";

import { cookies } from "next/headers";

export async function deleteToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // to do bloquear token no backend

  if (token) {
    cookieStore.delete("auth_token");
  }
}
