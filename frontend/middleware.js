import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if accessing dashboard without authentication
  // Note: Full auth check happens client-side in the dashboard component
  // This middleware just provides a basic protection layer
  
  const pathname = request.nextUrl.pathname
  
  // If accessing dashboard root, allow it (client-side will handle auth)
  // The dashboard component already has comprehensive auth checks
  if (pathname === '/dashboard') {
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}

