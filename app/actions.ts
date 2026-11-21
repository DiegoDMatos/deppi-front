"use server";

import { AuthUser } from "@/lib/types/auth";
import { deppiApi } from "@/lib/deppiApi";
import { cookies } from "next/headers";
import axios from "axios";

type LoginData = { token: string };

type ApiResponse<T> = {
  success: boolean,
  data?: T,
  error?: {
    code: string,
    message: string,
  }
}

export async function login(email: string, password: string) {
  try{
    const tokenResponse = await deppiApi.post<ApiResponse<LoginData>>("/auth/login", {
      email,
      password,
    });

    const token = tokenResponse.data.data?.token;

    if(!token) return tokenResponse.data;

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return tokenResponse.data;
  } catch (err){
    if(axios.isAxiosError<ApiResponse<LoginData>>(err)){
      return err.response?.data
    }

    throw err;
  }
}

export async function getUserData() {
  try{
    const cookieToken = await cookies();
    const token = cookieToken.get("auth_token")?.value;

    // to do validar token

    const request = await deppiApi.get<ApiResponse<AuthUser>>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return request.data;
  } catch (err){
    if(axios.isAxiosError<ApiResponse<AuthUser>>(err)){
      return err.response?.data
    }

    throw err;
  }

}
