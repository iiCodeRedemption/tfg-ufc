"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/formatters"
import { APP_NAME } from "@/data/constants/app"

const LAST_UPDATED = new Date("2025-05-28")

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Notice</h1>
          <p className="text-gray-400">
            Last updated: {formatDate(LAST_UPDATED)}
          </p>
        </header>

        <TabsSection />

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/about" className="flex items-center gap-2">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function TabsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>

          <div className="space-y-6 text-gray-300 text-sm">
            <Section title="1. Data Controller">
              <p>
                {APP_NAME} is the data controller for personal data collected
                through this website.
              </p>
            </Section>

            <Section title="2. Collected Data">
              <ul className="list-disc pl-5 space-y-2">
                <li>Registration data (email, username)</li>
                <li>Interaction data (favorites, search history)</li>
                <li>Technical data (IP address, device, browser)</li>
                <li>Cookies (see our Cookie Policy)</li>
              </ul>
            </Section>

            <Section title="3. Purpose">
              <p>We process data to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide access to our MMA fighter database</li>
                <li>Personalize user experience</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="4. Legal Basis">
              <p>Processing is based on:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>User consent (GDPR Art. 6.1.a)</li>
                <li>Contract execution (GDPR Art. 6.1.b)</li>
                <li>Legitimate interest (GDPR Art. 6.1.f)</li>
              </ul>
            </Section>

            <Section title="5. Your Rights">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access, rectify, and erase your data</li>
                <li>Restrict processing and object</li>
                <li>Data portability</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-2">Contact: fightingvault@gmail.com</p>
            </Section>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>

          <div className="space-y-6 text-gray-300 text-sm">
            <Section title="1. Service Usage">
              <p>
                {APP_NAME} provides MMA fighter information. By using our
                service you agree:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To use the service for personal purposes only</li>
                <li>
                  Not to scrape data or commercial use without authorization
                </li>
                <li>Not to submit illegal or offensive content</li>
              </ul>
            </Section>

            <Section title="2. Intellectual Property">
              <p>All rights reserved for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Platform design and interface</li>
                <li>Data selection and organization</li>
                <li>Original content created by {APP_NAME}</li>
              </ul>
              <p className="mt-2">
                Fighter images may be subject to third-party rights.
              </p>
            </Section>

            <Section title="3. Limitations">
              <p>{APP_NAME} does not guarantee:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Absolute accuracy of fighter data</li>
                <li>Continuous service availability</li>
                <li>Consequences from using provided information</li>
              </ul>
            </Section>

            <Section title="4. Modifications">
              <p>We reserve the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Modify these terms at any time</li>
                <li>Update or remove service features</li>
                <li>Restrict access for terms violations</li>
              </ul>
              <p className="mt-2">
                Registered users will be notified of changes.
              </p>
            </Section>

            <Section title="5. Governing Law">
              <p>These terms are governed by:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Spanish law (for EU users)</li>
                <li>Jurisdiction: Courts of Madrid</li>
                <li>We will attempt amicable conflict resolution</li>
              </ul>
            </Section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-2">
      <h3 className="font-bold text-white">{title}</h3>
      <div>{children}</div>
    </section>
  )
}
