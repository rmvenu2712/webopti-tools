"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 md:px-6 animate-slideInDown">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center w-fit mx-auto justify-between gap-24 rounded-full bg-white/95 backdrop-blur-xl border border-purple-100 shadow-lg px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center  text-2xl font-bold hover:scale-105 transition-transform"
          >
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">WebOpti</span>
            <span className="text-green-500">Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                      : "text-gray-800 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            className="hidden md:inline-flex bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all font-bold"
          >
            <Link href="/tools">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-purple-50 transition-colors text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-purple-100 shadow-lg animate-slideInDown">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-full text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                        : "text-gray-800 hover:bg-purple-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full mt-2 font-bold"
              >
                <Link href="/tools" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
