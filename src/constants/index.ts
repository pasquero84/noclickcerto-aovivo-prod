export const ROUTES = {
  HOME: '/',
  CAMERAS: '/cameras',
  BEACHES: '/praias',
  CAMERA_DETAIL: (beach: string, camera: string) => `/cameras/${beach}/${camera}`,
  PREMIUM: '/premium',
  LOGIN: '/auth/login',
  REGISTER: '/auth/cadastro',
  FORGOT_PASSWORD: '/auth/recuperar-senha',
  ACCOUNT: '/minha-conta',
  ADMIN: '/admin',
} as const

export const PLANS = {
  FREE: 'free',
  PREMIUM_MONTHLY: 'premium_monthly',
  PREMIUM_ANNUAL: 'premium_annual',
} as const

export const PLAN_PRICES = {
  PREMIUM_MONTHLY: 599,
  PREMIUM_ANNUAL: 5990,
} as const

export const CAMERA_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance',
} as const

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

export const CAMERA_FREE_UPDATE_INTERVAL = 30
export const CAMERA_PREMIUM_UPDATE_INTERVAL = 2

export const SNAPSHOT_HOUR_INTERVAL = 1
export const REPLAY_RETENTION_DAYS = 30

export const SPONSOR_SLOTS = 14

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const
