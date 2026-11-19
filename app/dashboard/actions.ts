"use server"

import { cookies } from "next/headers";

export async function deleteToken(){
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // to do logout na api

    if(token){
        cookieStore.delete("auth_token");
    }
}