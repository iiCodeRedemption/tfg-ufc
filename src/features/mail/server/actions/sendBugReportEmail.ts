import { createElement } from "react"
import { APP_NAME } from "@/data/constants/app"
import { TRANSPORTERS } from "@/lib/mail"
import { getEmailContent } from "@/features/mail/server/getEmailContent"
import { BugReportEmail } from "@/features/mail/components/BugReportEmail"
import { env } from "@/data/env/server"

export async function sendBugReportEmail({
  from,
  name,
  description,
  subject = `Bug report from ${name} - ${APP_NAME}`,
}: {
  from: string
  name: string
  description: string
  subject?: string
}) {
  await TRANSPORTERS.noReply.sendEmail({
    to: env.SMTP_USERNAME,
    subject,
    replyTo: from,
    html: await getEmailContent({
      component: createElement(BugReportEmail, {
        email: from,
        name,
        description,
      }),
    }),
  })
}
