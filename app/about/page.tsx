import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, Heart, Code2, Sparkles, Zap, Target, Globe, FileText, Bot, Gauge } from "lucide-react"

export default function AboutPage() {
  const tools = [
    {
      icon: Globe,
      name: "XML Sitemap Generator",
      description: "Generate comprehensive XML sitemaps for your website",
      usage:
        "Enter your website URL and our crawler will automatically discover all pages, generating a complete sitemap.xml file that helps search engines index your site efficiently.",
      benefits: ["Improve SEO", "Better indexing", "Automatic discovery"],
    },
    {
      icon: FileText,
      name: "Robots.txt Generator",
      description: "AI-powered robots.txt file creation",
      usage:
        "Provide your domain and our AI analyzes your site structure to generate an optimized robots.txt file that controls how search engines crawl your website.",
      benefits: ["Control crawling", "Protect sensitive pages", "SEO optimization"],
    },
    {
      icon: Bot,
      name: "LLMs.txt Generator",
      description: "Optimize your site for AI language models",
      usage:
        "Enter your domain to create an llms.txt file that helps AI models like ChatGPT understand and represent your website content accurately.",
      benefits: ["AI-ready content", "Better AI citations", "Future-proof SEO"],
    },
    {
      icon: Gauge,
      name: "Page Speed Analyzer",
      description: "Comprehensive performance testing",
      usage:
        "Input any URL to get detailed performance metrics including Core Web Vitals, load times, and actionable optimization suggestions powered by Lighthouse.",
      benefits: ["Identify bottlenecks", "Improve UX", "Better rankings"],
    },
    {
      icon: Bot,
      name: "AI Chat Assistant",
      description: "SEO guidance powered by AI",
      usage:
        "Ask questions about SEO best practices, technical optimization, or get personalized advice for your website. The AI assistant provides expert guidance in real-time.",
      benefits: ["24/7 expert advice", "Instant answers", "Personalized tips"],
    },
    {
      icon: FileText,
      name: "Markdown Generator",
      description: "Professional documentation creation",
      usage:
        "Quickly generate README files and documentation in Markdown format. Perfect for GitHub projects, technical docs, and developer resources.",
      benefits: ["Save time", "Professional format", "Easy customization"],
    },
  ]

  const timeline = [
    { year: "2024", event: "Project Launch", description: "SEO Tools platform goes live with core features" },
    { year: "2024", event: "AI Integration", description: "Added AI-powered chat assistant and LLMs.txt generator" },
    { year: "2025", event: "Performance Tools", description: "Launched page speed analyzer with Core Web Vitals" },
    { year: "2025", event: "Community Growth", description: "Open-sourced the platform for community contributions" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <Header />
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">About Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl  font-bold mb-6 text-purple-900">
                About <span className="text-green-500">SEO Tools</span>
              </h1>
              <p className="text-xl text-gray-600 text-balance leading-relaxed">
                A complete, open-source SEO and marketing toolkit built for developers, creators, and anyone who wants
                to improve their website performance and visibility.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-white border-y-2 border-purple-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6 animate-slideInLeft">
                <h2 className="text-4xl  font-bold text-purple-900">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that every website deserves professional SEO optimization, regardless of budget. SEO Tools
                  provides free, powerful tools that help you optimize, analyze, and improve your web presence.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Optimize Your Website</p>
                      <p className="text-gray-600">Generate proper SEO files and metadata instantly</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Improve Search Rankings</p>
                      <p className="text-gray-600">Implement technical SEO best practices</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Save Time & Resources</p>
                      <p className="text-gray-600">Automate repetitive SEO tasks</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-3xl animate-slideInRight shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl  font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
                    100%
                  </div>
                  <p className="text-xl font-semibold text-purple-900">Free Forever</p>
                  <p className="text-gray-600 mt-2">No hidden costs, no limits</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl  font-bold text-center text-purple-900 mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-green-500" />

                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <Card className="p-6 bg-white border-2 border-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                        <div className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-bold mb-3">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">{item.event}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </Card>
                    </div>
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tools Explanation Section */}
        <section className="py-16 md:py-24 bg-white border-y-2 border-purple-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl  font-bold text-purple-900 mb-4">Our Tools</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive SEO tools designed to help you succeed online
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {tools.map((tool, index) => (
                <Card
                  key={index}
                  className="p-8 bg-gradient-to-br from-white to-purple-50/30 border-2 border-purple-100 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg flex-shrink-0">
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">How to Use:</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{tool.usage}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {tool.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Zap className="h-4 w-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl  font-bold text-center text-purple-900 mb-12">Why Choose SEO Tools?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-6 shadow-lg">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Open Source</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fully open-source and transparent. Contribute and improve the tools yourself.
                </p>
              </Card>
              <Card className="p-8 rounded-3xl bg-white border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-3">No Signup Required</h3>
                <p className="text-gray-600 leading-relaxed">
                  Start using tools immediately. No accounts, no limitations, just pure productivity.
                </p>
              </Card>
              <Card className="p-8 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Developer Focused</h3>
                <p className="text-gray-600 leading-relaxed">
                  Built by developers for developers. Real-time data and actionable insights.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl  font-bold text-white mb-6">
              Start Optimizing Your Website
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Access powerful SEO tools and real-time analytics to boost your website performance and visibility.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 rounded-full px-8 shadow-2xl font-bold"
            >
              <Link href="/tools">Explore All Tools</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
