import {
  PROMOTION_NAMES,
  PROMOTIONS,
} from "@/features/fighters/data/constants/promotions"

export type NavLink = {
  title: string
  href: string
}

export type NavLinks = {
  title: string
  subLinks: NavLink[]
}[]

export const RIGHT_LINKS_SECTION: NavLink[] = Object.entries(
  PROMOTION_NAMES,
).map(([promotionId]) => ({
  title: PROMOTIONS[promotionId as keyof typeof PROMOTIONS],
  href: `/fighters?promotion=${promotionId}`,
}))

export const ABOUT_LINKS: NavLink[] = [
  {
    title: "About us",
    href: "/about",
  },
]

export const LEFT_NAV_LINKS: NavLinks = [
  {
    title: "ABOUT",
    subLinks: ABOUT_LINKS,
  },
]

export const RIGHT_NAV_LINKS: NavLinks = [
  {
    title: "FIGHTERS",
    subLinks: RIGHT_LINKS_SECTION,
  },
  {
    title: "EVENTS",
    subLinks: RIGHT_LINKS_SECTION.map((link) => ({
      ...link,
      href: link.href.replace("/fighters", "/events"),
    })),
  },
]

export const NAV_LINKS: NavLinks = [...LEFT_NAV_LINKS, ...RIGHT_NAV_LINKS]
