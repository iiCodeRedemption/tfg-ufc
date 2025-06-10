import { render } from "@react-email/components"
import { ReactElement } from "react"

export async function getEmailContent({
  component,
}: {
  component: ReactElement
}): Promise<string> {
  return await render(component)
}
