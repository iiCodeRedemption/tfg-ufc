import { createElement } from "react"
import { APP_NAME } from "@/data/constants/app"
import { TRANSPORTERS } from "@/lib/mail"
import { getEmailContent } from "@/features/mail/server/getEmailContent"
import { AccountDeletedEmail } from "@/features/mail/components/AccountDeletedEmail"

export async function sendAccountDeletedEmail({
  to,
  subject = `Account deleted - ${APP_NAME}`,
}: {
  to: string
  subject?: string
}) {
  await TRANSPORTERS.noReply.sendEmail({
    to,
    subject,
    html: await getEmailContent({
      component: createElement(AccountDeletedEmail, {
        email: to,
      }),
    }),
  })
}
