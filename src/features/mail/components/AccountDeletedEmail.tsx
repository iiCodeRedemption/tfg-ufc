import { APP_NAME, YEAR } from "@/data/constants/app"
import { env } from "@/data/env/client"
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"

export function AccountDeletedEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Account deleted - {APP_NAME}</Preview>
      <Tailwind>
        <Body className="bg-black my-auto mx-auto font-sans">
          <Container className="border border-red-800 rounded-lg p-8 my-10 mx-auto max-w-[600px] bg-gradient-to-br from-gray-900 to-black">
            <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800 -mt-8 -mx-8 mb-8 rounded-t-lg"></div>
            <Section className="mt-4">
              <Img
                src={`${env.NEXT_PUBLIC_SITE_URL}/imgs/logo-bg.webp`}
                width="180"
                height="auto"
                alt={`${APP_NAME} logo`}
                className="mx-auto mb-6"
              />
            </Section>
            <Section>
              <div className="w-20 h-1.5 bg-red-700 mb-4 mx-auto"></div>
              <Heading className="text-red-600 text-3xl font-bold text-center mb-4">
                Account deleted
              </Heading>
              <Text className="text-gray-300 text-base mb-4">
                Hello {email},
              </Text>
              <Text className="text-gray-300 text-base mb-4">
                We&apos;re sorry to see you go. Your account with {APP_NAME} has
                been successfully deleted.
              </Text>
              <Text className="text-gray-300 text-base mb-4">
                All your personal data has been removed from our systems in
                accordance with our privacy policy.
              </Text>
              <Section className="bg-gray-950 rounded-lg p-4 mb-6 border border-gray-800">
                <Text className="text-gray-300 text-base">
                  If you deleted your account by mistake or would like to rejoin{" "}
                  {APP_NAME} in the future, you&apos;ll need to create a new
                  account.
                </Text>
              </Section>
              <Text className="text-gray-300 text-base mb-4">
                We appreciate the time you spent with us and hope to see you
                again in the future.
              </Text>
              <Text className="text-gray-300 text-base">
                The {APP_NAME} Team
              </Text>
            </Section>
            <Section className="border-t border-gray-700 mt-8 pt-4">
              <Text className="text-gray-400 text-xs text-center">
                © {YEAR} {APP_NAME}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
