import { withAuth } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/minha-conta/:path*',
    '/admin/:path*',
    '/api/auth/:path*',
  ],
}

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})
