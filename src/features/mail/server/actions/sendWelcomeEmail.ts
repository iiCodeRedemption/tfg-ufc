import { createElement } from "react"
import { APP_NAME } from "@/data/constants/app"
import { TRANSPORTERS } from "@/lib/mail"
import { getEmailContent } from "@/features/mail/server/getEmailContent"
import { WelcomeEmail } from "@/features/mail/components/WelcomeEmail"

export async function sendWelcomeEmail({
  to,
  subject = `Welcome to ${APP_NAME}!`,
}: {
  to: string
  subject?: string
}) {
  await TRANSPORTERS.noReply.sendEmail({
    to,
    subject,
    html: await getEmailContent({
      component: createElement(WelcomeEmail, {
        email: to,
      }),
    }),
  })
}
