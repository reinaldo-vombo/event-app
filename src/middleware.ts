import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Handle `/uploads` for dynamic file serving
  if (url.pathname.startsWith('/uploads')) {
    return NextResponse.next(); // Allow `/uploads` to proceed
  }

  // Get the token for user authentication
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to `/login` if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  // Allow other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/party-twon/:path*', '/uploads/:path*'],
};
