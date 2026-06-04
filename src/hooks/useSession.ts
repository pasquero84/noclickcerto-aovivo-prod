import { useSession as useNextAuthSession } from 'next-auth/react'
import type { Session } from 'next-auth'

export function useSession() {
  const session = useNextAuthSession()
  return {
    data: session.data as (Session & { user: { id: string } }) | null,
    status: session.status,
    isLoading: session.status === 'loading',
    isAuthenticated: session.status === 'authenticated',
  }
}
