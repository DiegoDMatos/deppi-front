"use server"

import { AuthUser } from "@/lib/types/auth";
import { deppiApi } from "@/lib/deppiApi"
import { cookies } from "next/headers";

export async function login(email: string, password: string){
    const tokenResponse = await deppiApi.post<string>("/auth/login", {
        email,
        password,
    })

    const cookieStore = await cookies();
    cookieStore.set("auth_token", tokenResponse.data, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60,
    });
}

export async function getUserData(){
    const cookieToken = await cookies();
    const token = cookieToken.get("auth_token")?.value;

    const request = await deppiApi.get<AuthUser>("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return request.data; 
}