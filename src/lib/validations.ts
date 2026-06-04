import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

export const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export const newPasswordSchema = z.object({
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

export const cameraSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  locationId: z.string().uuid('ID de localização inválido'),
  rtspUrl: z.string().url('URL RTSP inválida'),
  isPublic: z.boolean().default(true),
})

export const beachSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  description: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
})

export const locationSchema = z.object({
  beachId: z.string().uuid('ID de praia inválido'),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
})

export const sponsorSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  website: z.string().url('URL do site inválida').optional(),
  logo: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>
export type CameraFormData = z.infer<typeof cameraSchema>
export type BeachFormData = z.infer<typeof beachSchema>
export type LocationFormData = z.infer<typeof locationSchema>
export type SponsorFormData = z.infer<typeof sponsorSchema>
