import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    DIRECT_DATABASE_URL: z.string().url().min(1),
    SUPABASE_URL: z.string().url().min(1),
    SUPABASE_KEY: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().min(1),
    SMTP_SECURE: z.coerce.boolean(),
    SMTP_USERNAME: z.string().email().min(1),
    SMTP_PASSWORD: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
