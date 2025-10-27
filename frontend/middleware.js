import { NextResponse } from 'next/server'

export function middleware(request) {
  // For client-side auth checking, we'll handle it in the dashboard component
  // This middleware is just a basic protection layer
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}

