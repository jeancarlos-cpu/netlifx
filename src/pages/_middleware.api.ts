import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies?.token;

  const { pathname } = req.nextUrl;

  if (token && pathname === '/signin') {
    return NextResponse.redirect('/');
  }

  if (!token && pathname === '/my-list') {
    return NextResponse.redirect('/signin');
  }
}
