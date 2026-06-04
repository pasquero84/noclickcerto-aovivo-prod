import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }

  interface JWT {
    id: string
  }
}

export interface User {
  id: string
  email: string
  name: string
  image?: string
  status: 'active' | 'suspended' | 'deleted'
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Beach {
  id: string
  name: string
  slug: string
  description?: string
  latitude?: string
  longitude?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Location {
  id: string
  beachId: string
  name: string
  description?: string
  latitude?: string
  longitude?: string
  createdAt: Date
  updatedAt: Date
}

export interface Camera {
  id: string
  locationId: string
  name: string
  description?: string
  rtspUrl: string
  status: 'online' | 'offline' | 'maintenance'
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Plan {
  id: string
  name: string
  description?: string
  priceMonthly?: number
  priceAnnual?: number
  features?: string[]
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'cancelled' | 'expired'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelledAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'pending' | 'success' | 'failed' | 'refunded'
  method?: string
  mercadoPagoId?: string
  dueAt?: Date
  paidAt?: Date
  failureReason?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
