import { deppiApi } from "@/lib/api";
import { AuthUser } from "@/components/login-form";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request){
    try{
        const cookieToken = await cookies();
        const token = cookieToken.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
        }

        const userResponse = await deppiApi.get<AuthUser>("/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(userResponse);
        return NextResponse.json(userResponse.data);
    } catch{
        return NextResponse.json({ status: 401 });
    }
}