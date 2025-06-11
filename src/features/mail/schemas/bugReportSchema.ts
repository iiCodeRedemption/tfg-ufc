import { z } from "zod"

export const bugReportSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  consentToShareInfo: z.boolean().refine((val) => val === true, {
    message: "You must consent to share your name and email",
  }),
})

export type BugReportFormData = z.infer<typeof bugReportSchema>
