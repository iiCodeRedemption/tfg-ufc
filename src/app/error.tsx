"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-[#1a1a1a] border-2 border-red-700 shadow-2xl shadow-red-900/30 rounded-xl overflow-hidden mb-8">
          <div className="h-2 bg-gradient-to-r from-red-600 via-red-800 to-red-700"></div>
          <div className="p-12">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-red-400 mb-4">
              Internal Server Error
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Something went wrong on our end. Our servers are having trouble
              processing your request right now.
            </p>
            <p className="text-gray-300 text-sm mb-8">Error:</p>
            <pre className="text-red-400 text-sm mb-8">{error.message}</pre>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => reset()}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>

              <Button
                asChild
                variant="secondary"
                className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
              >
                <Link href="/">
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </Button>

              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 px-6 py-3 font-semibold transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            If this error persists, please contact our support team
          </p>
        </div>
      </div>
    </div>
  )
}
