import { APP_NAME } from "@/data/constants/app"
import {
  PROMOTION_NAMES,
  PROMOTIONS,
} from "@/features/fighters/data/constants/promotions"
import Link from "next/link"
import { BugReportDialog } from "@/components/dialogs/BugReportDialog"

export function Footer() {
  const linkClass = "hover:text-white transition"

  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center text-sm">
        <div>
          <h4 className="text-red-500 font-semibold mb-3 uppercase">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className={linkClass}>
                About us
              </a>
            </li>
            <li>
              <a href="/terms" className={linkClass}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className={linkClass}>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-red-500 font-semibold mb-3 uppercase">Support</h4>
          <ul className="space-y-2">
            <li>
              <BugReportDialog
                trigger={<button className={linkClass}>Report a bug</button>}
              />
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-red-500 font-semibold mb-3 uppercase">About</h4>
          <ul className="flex flex-col space-y-2">
            {Object.entries(PROMOTION_NAMES).map(([promotionId]) => (
              <li key={promotionId}>
                <Link
                  href={`/fighters?promotion=${promotionId}`}
                  className={linkClass}
                >
                  {PROMOTIONS[promotionId as keyof typeof PROMOTIONS]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
