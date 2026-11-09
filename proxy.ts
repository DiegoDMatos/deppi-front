import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest){
  const token = request.cookies.get("auth_token");
  const tokenValue = token?.value;

  if(!tokenValue){
    return NextResponse.redirect(new URL("/", request.url));
  }

  const url = request.nextUrl.pathname;

  if(url === "/"){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  NextResponse.next();
    
}

export const config = {
  matcher: ['/', '/dashboard']
}