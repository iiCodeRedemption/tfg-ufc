import { APP_NAME, YEAR } from "@/data/constants/app"
import { env } from "@/data/env/client"
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"

export function WelcomeEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {APP_NAME} - Your Ultimate MMA Database</Preview>
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
                Welcome to {APP_NAME}!
              </Heading>
              <Text className="text-gray-300 text-base mb-4">
                Hello {email},
              </Text>
              <Text className="text-gray-300 text-base mb-4">
                Thank you for joining {APP_NAME}, your ultimate destination for
                MMA events, fighter profiles, and the latest news in the world
                of mixed martial arts.
              </Text>
              <Text className="text-gray-300 text-base mb-4">
                With your new account, you can:
              </Text>
              <Section className="bg-gray-950 rounded-lg p-4 mb-6 border border-gray-800">
                <Text className="text-gray-300 text-base ml-2">
                  • Track your favorite fighters
                </Text>
                <Text className="text-gray-300 text-base ml-2">
                  • Get notified about upcoming events
                </Text>
                <Text className="text-gray-300 text-base ml-2">
                  • Access exclusive fight statistics
                </Text>
                <Text className="text-gray-300 text-base ml-2">
                  • Join the community of MMA enthusiasts
                </Text>
              </Section>
              <Section className="text-center mb-6">
                <Link
                  href={`${env.NEXT_PUBLIC_SITE_URL}/events`}
                  className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded inline-block no-underline uppercase"
                >
                  Explore Upcoming Events
                </Link>
              </Section>
              <Text className="text-gray-300 text-base mb-4">
                If you have any questions or need assistance, feel free to reply
                to this email or contact our support team.
              </Text>
              <Text className="text-gray-300 text-base mb-4">
                Get ready to witness greatness!
              </Text>
              <Text className="text-gray-300 text-base">
                The {APP_NAME} Team
              </Text>
            </Section>
            <Section className="border-t border-gray-700 mt-8 pt-4">
              <Text className="text-gray-400 text-xs text-center">
                © {YEAR} {APP_NAME}. All rights reserved.
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                This email was sent to {email} because you signed up for{" "}
                {APP_NAME}.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
