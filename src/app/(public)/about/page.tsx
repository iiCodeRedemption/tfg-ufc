import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { TEAM_MEMBERS } from "@/data/constants/team"
import { APP_NAME } from "@/data/constants/app"

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full gap-16 pb-20">
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
      <TeamSection />
      <CTASection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('/imgs/about-hero.webp')] bg-cover bg-center opacity-40"></div>

      <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
        <div className="w-20 h-1.5 bg-red-700 mb-6"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
          ABOUT <span className="text-red-600 uppercase">{APP_NAME}</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          The ultimate hub for MMA enthusiasts, providing comprehensive fighter
          data, fight histories, and event information in one centralized
          platform.
        </p>
      </div>
    </section>
  )
}

function MissionSection() {
  return (
    <section className="w-full space-y-10">
      <div className="mb-8">
        <div className="w-16 h-1 bg-red-700 mb-4"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Our Mission
        </h2>
      </div>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Unifying MMA Data
            </h3>
            <p className="text-gray-300">
              We&apos;re tired of searching across multiple sites to get
              complete fighter profiles. {APP_NAME} consolidates records, stats,
              fight histories, and news into one comprehensive platform.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              For Fans, By Fans
            </h3>
            <p className="text-gray-300">
              Created by MMA enthusiasts who understand what information matters
              most. We focus on delivering the data you actually want in a
              format that&apos;s easy to access and understand.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      title: "Comprehensive Fighter Profiles",
      description:
        "Detailed records, fight histories, and career statistics for thousands of fighters across all major promotions.",
    },
    {
      title: "Unified Search",
      description:
        "Find any fighter regardless of promotion with our powerful search technology.",
    },
    {
      title: "Event Tracking",
      description:
        "Never miss a fight with our upcoming events calendar and fight card notifications.",
    },
    {
      title: "Analytics & Insights",
      description:
        "Advanced stats and visualizations to help you analyze fighter performance.",
    },
  ]

  return (
    <section className="w-full space-y-10">
      <div className="mb-8">
        <div className="w-16 h-1 bg-red-700 mb-4"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What We Offer
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden"
          >
            <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="w-full space-y-10">
      <div className="mb-8">
        <div className="w-16 h-1 bg-red-700 mb-4"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">The Team</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden group hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300"
          >
            <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
            <CardContent className="p-6">
              <div className="relative aspect-square w-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-800">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-white text-center group-hover:text-red-500 transition-colors">
                {member.name}
              </h3>
              <p className="text-red-500 text-center mb-3 font-medium">
                {member.role}
              </p>
              <p className="text-gray-300 text-center">{member.bio}</p>
              <div className="flex justify-center mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-800 hover:bg-gray-800 text-gray-300"
                >
                  <Link
                    href={`${member.git}`}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="w-full space-y-10 text-center">
      <div className="mb-8">
        <div className="w-16 h-1 bg-red-700 mb-4 mx-auto"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Explore?
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          asChild
          size="lg"
          className="bg-red-700 hover:bg-red-600 text-white font-bold rounded px-8"
        >
          <Link href="/fighters">BROWSE FIGHTERS</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800 font-bold rounded px-8"
        >
          <Link href="/events">VIEW EVENTS</Link>
        </Button>
      </div>
    </section>
  )
}
