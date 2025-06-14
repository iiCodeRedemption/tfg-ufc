"use client"

import Link from "next/link"
import { Dispatch, ReactNode, useState } from "react"
import { Menu, Search, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ListItem } from "@/components/ListItem"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NAV_LINKS,
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
} from "@/data/constants/navLinks"
import { Logo } from "@/components/Logo"

type NavSection = {
  title: string
  subLinks: {
    title: string
    href: string
  }[]
}

export function HeaderClient({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-8 border-b border-[#333] relative">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 text-white hover:text-[#d20a0a] hover:bg-transparent"
          variant="ghost"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex gap-4">
          <NavigationMenu>
            {LEFT_NAV_LINKS.map((section) => (
              <NavigationMenuList key={section.title}>
                <NavigationMenuItem>
                  {section.subLinks.length === 1 ? (
                    <Link
                      href={section.subLinks[0].href}
                      className="flex items-center h-10 px-4 py-2 hover:text-[#d20a0a] bg-transparent font-bold transition-colors text-base"
                    >
                      {section.title}
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="hover:text-[#d20a0a] bg-transparent font-bold transition-colors text-base">
                        {section.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 min-w-[200px] md:grid-cols-2">
                          {section.subLinks.map((link) => (
                            <ListItem
                              key={link.title}
                              title={link.title}
                              href={link.href}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            ))}
          </NavigationMenu>
        </div>

        <div className="flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-16 md:top-20 -translate-y-1/2 z-10">
          <Link
            href="/"
            className="relative w-28 h-12 md:w-40 md:h-16 flex items-center justify-center"
          >
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex gap-4 ml-auto">
          <NavigationMenu>
            {RIGHT_NAV_LINKS.map((section) => (
              <NavigationMenuList key={section.title}>
                <NavigationMenuItem>
                  {section.subLinks.length === 1 ? (
                    <Link
                      href={section.subLinks[0].href}
                      className="flex items-center h-10 px-4 py-2 hover:text-[#d20a0a] bg-transparent font-bold transition-colors text-base"
                    >
                      {section.title}
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="hover:text-[#d20a0a] bg-transparent font-bold transition-colors text-base">
                        {section.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 min-w-[200px] md:grid-cols-2">
                          {section.subLinks.map((link) => (
                            <ListItem
                              key={link.title}
                              title={link.title}
                              href={link.href}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            ))}
          </NavigationMenu>
          <div className="flex items-center gap-4">{children}</div>
        </div>
      </div>

      {isOpen && (
        <NavbarMobile navLinks={NAV_LINKS} setIsOpen={setIsOpen}>
          {children}
        </NavbarMobile>
      )}
    </>
  )
}

function NavbarMobile({
  navLinks,
  children,
  setIsOpen,
}: {
  navLinks: NavSection[]
  children: ReactNode
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="md:hidden fixed inset-0 top-20 bg-black z-10 overflow-y-auto border-t border-[#333]">
      <Accordion type="single" collapsible className="w-full">
        {navLinks.map((section, index) =>
          section.subLinks.length === 1 ? (
            <Link
              key={section.title}
              href={section.subLinks[0].href}
              className="block py-4 px-4 font-bold hover:text-[#d20a0a] transition-colors border-b border-[#333] text-base"
              onClick={() => setIsOpen(false)}
            >
              {section.title}
            </Link>
          ) : (
            <AccordionItem
              value={`item-${index}`}
              key={section.title}
              className="border-b border-[#333]"
            >
              <AccordionTrigger className="hover:text-[#d20a0a] py-4 px-4 font-bold transition-colors pr-12 relative text-base">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4">
                  {section.subLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block py-3 px-4 hover:text-[#d20a0a] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </div>
  )
}
