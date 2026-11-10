import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest){
  const token = request.cookies.get("auth_token");
  const tokenValue = token?.value;
  const url = request.nextUrl.pathname;

  if(!tokenValue && url !== "/"){
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(tokenValue && url === "/"){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
    
}

export const config = {
  matcher: ['/', '/dashboard/:path*', ]
}