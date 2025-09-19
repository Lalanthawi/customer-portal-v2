import { z } from 'zod'

// Password validation
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must be less than 100 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Email validation
const emailSchema = z.string()
  .email('Invalid email address')
  .toLowerCase()
  .trim()

// Phone validation
const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')

// User role enum
export const UserRoleEnum = z.enum(['customer', 'admin', 'super_admin', 'support'])

// User status enum
export const UserStatusEnum = z.enum(['active', 'inactive', 'suspended', 'pending'])

// Login schema
export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
  captchaToken: z.string().optional()
})

// Registration schema
export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  phone: phoneSchema.optional(),
  company: z.string().optional(),
  country: z.string().min(2).max(2), // ISO country code
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
  marketingConsent: z.boolean().optional(),
  referralCode: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

// Password reset request schema
export const PasswordResetRequestSchema = z.object({
  email: emailSchema
})

// Password reset schema
export const PasswordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

// Change password schema
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
}).refine(data => data.currentPassword !== data.newPassword, {
  message: 'New password must be different from current password',
  path: ['newPassword']
})

// Two-factor authentication schemas
export const Enable2FASchema = z.object({
  password: z.string().min(1, 'Password is required for security')
})

export const Verify2FASchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits').regex(/^\d+$/, 'Code must contain only numbers'),
  trustDevice: z.boolean().optional()
})

// User profile schema
export const UserProfileSchema = z.object({
  id: z.string(),
  email: emailSchema,
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().optional(),
  phone: phoneSchema.optional(),
  company: z.string().optional(),
  country: z.string(),
  language: z.enum(['en', 'ja', 'zh', 'ko']).default('en'),
  timezone: z.string().default('UTC'),
  role: UserRoleEnum,
  status: UserStatusEnum,
  avatar: z.string().url().optional(),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean().optional(),
  twoFactorEnabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastLoginAt: z.string().datetime().optional(),
  preferences: z.object({
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean()
    }),
    currency: z.enum(['USD', 'JPY', 'EUR', 'GBP']),
    measurementUnit: z.enum(['metric', 'imperial']),
    theme: z.enum(['light', 'dark', 'system'])
  }).optional()
})

// Update profile schema
export const UpdateProfileSchema = UserProfileSchema.pick({
  firstName: true,
  lastName: true,
  displayName: true,
  phone: true,
  company: true,
  country: true,
  language: true,
  timezone: true,
  preferences: true
}).partial()

// Session schema
export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  ipAddress: z.string(),
  userAgent: z.string(),
  device: z.object({
    type: z.enum(['desktop', 'mobile', 'tablet']),
    os: z.string(),
    browser: z.string()
  }).optional()
})

// Auth response schemas
export const LoginResponseSchema = z.object({
  user: UserProfileSchema,
  session: SessionSchema,
  requiresTwoFactor: z.boolean().optional(),
  redirectUrl: z.string().optional()
})

export const RefreshTokenResponseSchema = z.object({
  user: UserProfileSchema,
  session: SessionSchema
})

// Type exports
export type LoginCredentials = z.infer<typeof LoginSchema>
export type RegisterData = z.infer<typeof RegisterSchema>
export type UserProfile = z.infer<typeof UserProfileSchema>
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>
export type Session = z.infer<typeof SessionSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>