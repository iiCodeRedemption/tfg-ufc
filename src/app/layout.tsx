import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layouts/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { APP_DESCRIPTION, APP_NAME } from "@/data/constants/app"
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/layouts/Footer"

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-col min-h-screen pt-24 md:pt-32">
            <div className="w-full px-4 md:px-8">{children}</div>
            <Toaster />
          </main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
