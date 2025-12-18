"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Copy } from "lucide-react"

export default function MarkdownGenerator() {
  const [projectName, setProjectName] = useState("My Project")
  const [description, setDescription] = useState("A brief description of what this project does")
  const [features, setFeatures] = useState("Feature 1\nFeature 2\nFeature 3")
  const [markdownContent, setMarkdownContent] = useState("")

  const generateMarkdown = () => {
    const featureList = features
      .split("\n")
      .filter((f) => f.trim())
      .map((f) => `- ${f.trim()}`)
      .join("\n")

    const content = `# ${projectName}

${description}

## Features

${featureList}

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm run dev
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Start the development server: \`npm run dev\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- React

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Generated with PerfScore Lab
`
    setMarkdownContent(content)
  }

  const downloadMarkdown = () => {
    const element = document.createElement("a")
    element.setAttribute("href", `data:text/markdown;charset=utf-8,${encodeURIComponent(markdownContent)}`)
    element.setAttribute("download", "README.md")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownContent)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto animate-slideInDown">
          <h1 className="text-4xl font-bold text-foreground mb-4">Markdown Documentation Generator</h1>
          <p className="text-muted-foreground mb-8">
            Generate professional README and documentation files in Markdown format.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-card/50 dark:bg-black/20 border border-border backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Configuration</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Project Name</label>
                  <Input
                    placeholder="My Project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-input border border-border text-foreground transition-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    placeholder="Brief description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-input border border-border text-foreground min-h-20 transition-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Features (one per line)</label>
                  <Textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    className="bg-input border border-border text-foreground min-h-32 transition-base"
                  />
                </div>
                <Button
                  onClick={generateMarkdown}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
                >
                  Generate Markdown
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 dark:bg-black/20 border border-border backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Preview</h2>
              {markdownContent ? (
                <div className="space-y-4">
                  <pre className="bg-black/30 dark:bg-white/10 p-4 rounded-lg overflow-auto max-h-64 text-sm text-white/80 font-mono transition-base">
                    {markdownContent}
                  </pre>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={copyToClipboard}
                      className="flex-1 transition-smooth bg-transparent"
                      size="sm"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      onClick={downloadMarkdown}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Configure and generate markdown to preview
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
