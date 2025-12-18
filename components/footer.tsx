"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, ChartGanttIcon, MessageCircle } from "lucide-react"
import Image from "next/image"
import logo from '@/public/venu-logo.png'

export function Footer() {
  return (
    <footer className="w-full border-t border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2  text-xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">SEO</span>
              <span className="text-green-500">Tools</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Complete SEO and marketing tools for developers and creators.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-purple-900">Tools</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/tools/page-speed" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                Page Speed
              </Link>
              <Link href="/tools/chat" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                AI Chat
              </Link>
              <Link href="/tools/robots" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                Robots.txt
              </Link>
              <Link href="/tools/sitemap" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-purple-900">Resources</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                About
              </Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                All Tools
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                Support
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-purple-900">Connect</h4>
            <div className="flex gap-3">
              <Link
                href="https://github.com/rmvenu2712" target="_blank"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-600 transition-colors"
              >
                <Github className="h-5 w-5" aria-label="GitHub" />
              </Link>
              <Link
           href="https://api.whatsapp.com/send?phone=916385538151&text=Hi%20Venu,%20nice%20to%20meet%20you.%20Can%20we%20connect"
                  target="_blank"
                  aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/venu-rm/"
                  target="_blank"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" aria-label="LinkedIn" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-200 pt-8 flex flex-col w-full md:flex-row justify-center items-center gap-4">
           <p className="text-sm text-center text-gray-600 tracking-wide">
              Crafted with passion by{" "}
              <a 
                href="https://venurm.pages.dev/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-lg px-3 py-1.5 font-semibold transition-all duration-300 hover:scale-105`}
              >
                <Image 
                  src={logo} 
                  alt="VENU Logo" 
                  className="inline-block w-5 h-5 mr-2 transition-all duration-300" 
                />
                Venu RM
              </a>
            </p>
        </div>
      </div>
    </footer>
  )
}
