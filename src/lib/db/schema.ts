import { pgTable, text, timestamp, uuid, integer, varchar, pgEnum, boolean, index, unique } from 'drizzle-orm/pg-core'

export const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'deleted'])
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'cancelled', 'expired'])
export const cameraStatusEnum = pgEnum('camera_status', ['online', 'offline', 'maintenance'])
export const sponsorStatusEnum = pgEnum('sponsor_status', ['active', 'inactive'])
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'success', 'failed', 'refunded'])

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    image: text('image'),
    passwordHash: text('password_hash'),
    status: userStatusEnum('status').notNull().default('active'),
    emailVerifiedAt: timestamp('email_verified_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index('idx_users_email').on(table.email),
    statusIdx: index('idx_users_status').on(table.status),
  })
)

export const passwordResets = pgTable(
  'password_resets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_password_resets_user_id').on(table.userId),
    tokenIdx: index('idx_password_resets_token').on(table.token),
  })
)

export const plans = pgTable(
  'plans',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    description: text('description'),
    priceMonthly: integer('price_monthly'),
    priceAnnual: integer('price_annual'),
    features: text('features').array(),
    isDefault: boolean('is_default').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index('idx_plans_name').on(table.name),
  })
)

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    planId: uuid('plan_id').notNull(),
    status: subscriptionStatusEnum('status').notNull().default('active'),
    currentPeriodStart: timestamp('current_period_start').notNull().defaultNow(),
    currentPeriodEnd: timestamp('current_period_end').notNull(),
    cancelledAt: timestamp('cancelled_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_subscriptions_user_id').on(table.userId),
    planIdIdx: index('idx_subscriptions_plan_id').on(table.planId),
  })
)

export const beaches = pgTable(
  'beaches',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    latitude: text('latitude'),
    longitude: text('longitude'),
    image: text('image'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: index('idx_beaches_slug').on(table.slug),
  })
)

export const locations = pgTable(
  'locations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    beachId: uuid('beach_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    latitude: text('latitude'),
    longitude: text('longitude'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    beachIdIdx: index('idx_locations_beach_id').on(table.beachId),
  })
)

export const cameras = pgTable(
  'cameras',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    locationId: uuid('location_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    rtspUrl: text('rtsp_url').notNull(),
    status: cameraStatusEnum('status').notNull().default('offline'),
    isPublic: boolean('is_public').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    locationIdIdx: index('idx_cameras_location_id').on(table.locationId),
    statusIdx: index('idx_cameras_status').on(table.status),
  })
)

export const cameraStreams = pgTable(
  'camera_streams',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cameraId: uuid('camera_id').notNull(),
    hlsUrl720p: text('hls_url_720p'),
    hlsUrl1080p: text('hls_url_1080p'),
    status: cameraStatusEnum('status').notNull().default('offline'),
    lastHealthCheck: timestamp('last_health_check'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    cameraIdIdx: index('idx_camera_streams_camera_id').on(table.cameraId),
  })
)

export const cameraSnapshots = pgTable(
  'camera_snapshots',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cameraId: uuid('camera_id').notNull(),
    imageUrl: text('image_url').notNull(),
    takenAt: timestamp('taken_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    cameraIdIdx: index('idx_camera_snapshots_camera_id').on(table.cameraId),
    takenAtIdx: index('idx_camera_snapshots_taken_at').on(table.takenAt),
  })
)

export const cameraReplays = pgTable(
  'camera_replays',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cameraId: uuid('camera_id').notNull(),
    playlistUrl: text('playlist_url').notNull(),
    resolution: varchar('resolution', { length: 20 }).notNull().default('720p'),
    startTime: timestamp('start_time').notNull(),
    endTime: timestamp('end_time').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    cameraIdIdx: index('idx_camera_replays_camera_id').on(table.cameraId),
    expiresAtIdx: index('idx_camera_replays_expires_at').on(table.expiresAt),
  })
)

export const cameraViews = pgTable(
  'camera_views',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cameraId: uuid('camera_id').notNull(),
    userId: uuid('user_id'),
    watchedAt: timestamp('watched_at').notNull().defaultNow(),
    watchDuration: integer('watch_duration'),
    quality: varchar('quality', { length: 20 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    cameraIdIdx: index('idx_camera_views_camera_id').on(table.cameraId),
    userIdIdx: index('idx_camera_views_user_id').on(table.userId),
    watchedAtIdx: index('idx_camera_views_watched_at').on(table.watchedAt),
  })
)

export const favoriteCameras = pgTable(
  'favorite_cameras',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    cameraId: uuid('camera_id').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_favorite_cameras_user_id').on(table.userId),
    cameraIdIdx: index('idx_favorite_cameras_camera_id').on(table.cameraId),
    userCameraUnique: unique('idx_favorite_cameras_user_camera').on(table.userId, table.cameraId),
  })
)

export const sponsors = pgTable(
  'sponsors',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    website: text('website'),
    logo: text('logo'),
    status: sponsorStatusEnum('status').notNull().default('active'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index('idx_sponsors_name').on(table.name),
  })
)

export const sponsorPackages = pgTable(
  'sponsor_packages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    priceMonthly: integer('price_monthly').notNull(),
    slots: integer('slots').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  }
)

export const sponsorPlacements = pgTable(
  'sponsor_placements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sponsorId: uuid('sponsor_id').notNull(),
    beachId: uuid('beach_id'),
    cameraId: uuid('camera_id'),
    position: integer('position').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    sponsorIdIdx: index('idx_sponsor_placements_sponsor_id').on(table.sponsorId),
    beachIdIdx: index('idx_sponsor_placements_beach_id').on(table.beachId),
    cameraIdIdx: index('idx_sponsor_placements_camera_id').on(table.cameraId),
  })
)

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    subscriptionId: uuid('subscription_id').notNull(),
    amount: integer('amount').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('BRL'),
    status: paymentStatusEnum('status').notNull().default('pending'),
    method: varchar('method', { length: 50 }),
    mercadoPagoId: varchar('mercado_pago_id', { length: 255 }),
    dueAt: timestamp('due_at'),
    paidAt: timestamp('paid_at'),
    failureReason: text('failure_reason'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    subscriptionIdIdx: index('idx_payments_subscription_id').on(table.subscriptionId),
    statusIdx: index('idx_payments_status').on(table.status),
    mercadoPagoIdIdx: index('idx_payments_mercado_pago_id').on(table.mercadoPagoId),
  })
)

export const adminUsers = pgTable(
  'admin_users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    role: varchar('role', { length: 50 }).notNull().default('moderator'),
    permissions: text('permissions').array(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_admin_users_user_id').on(table.userId),
  })
)

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    action: varchar('action', { length: 255 }).notNull(),
    resource: varchar('resource', { length: 255 }).notNull(),
    resourceId: uuid('resource_id'),
    changes: text('changes'),
    ipAddress: varchar('ip_address', { length: 50 }),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_audit_logs_user_id').on(table.userId),
    createdAtIdx: index('idx_audit_logs_created_at').on(table.createdAt),
  })
)

export const cameraStatusLogs = pgTable(
  'camera_status_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cameraId: uuid('camera_id').notNull(),
    previousStatus: cameraStatusEnum('previous_status').notNull(),
    newStatus: cameraStatusEnum('new_status').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    cameraIdIdx: index('idx_camera_status_logs_camera_id').on(table.cameraId),
    createdAtIdx: index('idx_camera_status_logs_created_at').on(table.createdAt),
  })
)

export const dailyCameraStats = pgTable(
  'daily_camera_stats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cameraId: uuid('camera_id').notNull(),
    date: timestamp('date').notNull(),
    views: integer('views').notNull().default(0),
    uniqueUsers: integer('unique_users').notNull().default(0),
    watchTimeSeconds: integer('watch_time_seconds').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    cameraIdIdx: index('idx_daily_camera_stats_camera_id').on(table.cameraId),
    dateIdx: index('idx_daily_camera_stats_date').on(table.date),
  })
)

export const appSettings = pgTable('app_settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
