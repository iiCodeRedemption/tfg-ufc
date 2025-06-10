import nodemailer from "nodemailer"
import { APP_NAME } from "@/data/constants/app"
import { env } from "@/data/env/server"

export const TRANSPORTERS = {
  noReply: createTransporter(
    env.SMTP_HOST,
    env.SMTP_USERNAME,
    env.SMTP_PASSWORD,
  ),
} as const

function createTransporter(
  host: string,
  account: string,
  password: string,
  port = env.SMTP_PORT,
  secure = env.SMTP_SECURE,
) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: account,
      pass: password,
    },
  })

  return {
    ...transporter,
    sendEmail: (mailOptions: Omit<nodemailer.SendMailOptions, "from">) => {
      return transporter.sendMail({
        ...mailOptions,
        from: {
          name: APP_NAME,
          address: account,
        },
      })
    },
  }
}
