"use server"

import { deppiApi } from "@/lib/api"
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body = await request.json()
    const { email, password } = body

    try{
        const tokenResponse = await deppiApi.post<string>("/auth/login", {
            email,
            password,
        })
        console.log("issp ==", tokenResponse.data);
        const response = NextResponse.json({ ok: true })
        response.cookies.set("auth_token", tokenResponse.data, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            path: "/",
            maxAge: 24 * 60 * 60,
        });
        
        return response;
    } catch {
        return NextResponse.json({ status: 401 });
    }
    
}