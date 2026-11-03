"use server"

import { cookies } from "next/headers"

export async function saveToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function deleteToken(){
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
}

export async function getToken(){
    const cookieStore = await cookies();
    return cookieStore.get("auth_token");
}