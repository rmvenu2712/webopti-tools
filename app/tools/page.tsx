import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToolCard } from "@/components/tool-card"
import { FileText, Sigma as Sitemap, Tag, Brain, BookOpen, Zap, MessageSquare, Clock, Wrench } from "lucide-react"


export default function ToolsPage() {
  const tools = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Page Speed Analysis",
      description: "Comprehensive Lighthouse performance audits with real-time metrics",
      href: "/tools/page-speed",
      delay: 0,
      features: ["Core Web Vitals", "Performance Score", "Optimization Tips"],
      color: "purple",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Chat Assistant",
      description: "Get instant answers powered by advanced AI language models",
      href: "/tools/chat",
      delay: 0.1,
      features: ["Real-time Chat", "Smart Responses", "Context Aware"],
      color: "green",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Robots.txt Generator",
      description: "Create optimized robots.txt files to control search engine crawling",
      href: "/tools/robots",
      delay: 0.2,
      features: ["Disallow paths", "Crawl delay", "Sitemap links"],
      color: "purple",
    },
    {
      icon: <Sitemap className="w-6 h-6" />,
      title: "Sitemap Generator",
      description: "Generate XML sitemaps to help search engines discover your pages",
      href: "/tools/sitemap",
      delay: 0.3,
      features: ["URL management", "Priority setting", "Change frequency"],
      color: "green",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "LLM Models Info",
      description: "Compare leading AI models and their capabilities",
      href: "/tools/llms",
      delay: 0.5,
      features: ["Model comparison", "Pricing info", "Use cases"],
      color: "green",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Markdown Generator",
      description: "Generate professional README and documentation files",
      href: "/tools/markdown",
      delay: 0.6,
      features: ["Templates", "Custom sections", "Export options"],
      color: "purple",
    },
  ]

  const comingSoonTools = [
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Meta Tags Generator",
      description: "Create SEO-optimized meta tags for better search visibility",
      features: ["Open Graph", "Twitter Cards", "Schema Markup"],
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "JSON-LD Generator",
      description: "Generate structured data for rich search results",
      features: ["Product Schema", "Article Schema", "FAQ Schema"],
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "htaccess Generator",
      description: "Create Apache configuration files for redirects and security",
      features: ["301 Redirects", "Security Rules", "Cache Control"],
    },
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <Header />
      <main className="container mt-5 mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
            <Zap className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Professional Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-4">
            SEO & Web Tools
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive suite of tools for SEO optimization, file generation, and web standards compliance
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>


        {/* Coming Soon Section */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 mb-4">
              <Clock className="h-4 w-4 text-orange-600 animate-pulse" />
              <span className="text-sm font-medium text-orange-700">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              More Tools in Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're actively building more powerful tools to enhance your workflow. Stay tuned for these exciting features!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {comingSoonTools.map((tool, index) => (
              <div
                key={tool.title}
                className="relative group bg-white rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-orange-400 transition-all duration-300 opacity-75 hover:opacity-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Coming Soon Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  In Progress
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 group-hover:from-orange-100 group-hover:to-yellow-100 group-hover:text-orange-600 transition-all duration-300">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Development Progress</span>
                    <span className="font-semibold">In Progress</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full animate-pulse" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notification CTA */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Want to be notified when these tools launch?
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
              <MessageSquare className="w-4 h-4" />
              Get Notified
            </button>
          </div>
        </div>


        {/* Stats Section */}
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-purple-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-slideInUp">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <p className="text-gray-600">Tests Generated</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <p className="text-gray-600">Uptime SLA</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent mb-2">
                2ms
              </div>
              <p className="text-gray-600">Response Time</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
