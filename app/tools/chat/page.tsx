"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Copy, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = { role: "user", content: input.trim() }
    const userInput = input.trim()
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)
    setError(null)

    // Add assistant message placeholder
    const assistantMsgIndex = messages.length + 1
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])

    try {
      console.log("[v0] Sending chat request with messages:", [...messages, userMsg])

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      })

      console.log("[v0] Chat response status:", res.status)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(errorData.error || `HTTP error ${res.status}`)
      }

      if (!res.body) {
        throw new Error("Response body is null")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log("[v0] Stream complete")
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        accumulatedContent += chunk

        setMessages((prev) => {
          const updated = [...prev]
          if (updated[assistantMsgIndex] && updated[assistantMsgIndex].role === "assistant") {
            updated[assistantMsgIndex] = { ...updated[assistantMsgIndex], content: accumulatedContent }
          }
          return updated
        })
      }

      if (!accumulatedContent) {
        throw new Error("No response received from AI")
      }
    } catch (err) {
      console.error("[v0] Chat error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to connect to AI"
      setError(errorMessage)
      setMessages((prev) => {
        const updated = [...prev]
        if (updated[assistantMsgIndex] && updated[assistantMsgIndex].role === "assistant") {
          updated[assistantMsgIndex] = {
            ...updated[assistantMsgIndex],
            content: `Error: ${errorMessage}. Please try again.`,
          }
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  const copyChat = () => {
    const text = messages.map((m) => `${m.role === "user" ? "You" : "AI"}: ${m.content}`).join("\n\n")
    navigator.clipboard.writeText(text)
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="mb-6 animate-slideInDown">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-4">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI Assistant</span>
            </div>
            <h1 className="text-4xl md:text-5xl  font-bold text-purple-900 mb-4">AI Chat</h1>
            <p className="text-gray-600 text-lg">Chat with an AI assistant powered by advanced language models</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 animate-slideInUp">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Chat Messages */}
          <Card className="mb-6 p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl rounded-3xl min-h-[500px] max-h-[500px] overflow-y-auto">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-24">
                  <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">Start a conversation!</p>
                  <p className="text-gray-500">Ask anything and get instant AI-powered responses.</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slideInUp`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                          : "bg-white text-gray-800 border-2 border-purple-100 shadow-md"
                      }`}
                    >
                      {loading && i === messages.length - 1 && msg.role === "assistant" && !msg.content ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Thinking...
                        </span>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </Card>

          {/* Input Card */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl rounded-3xl">
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                onClick={copyChat}
                size="sm"
                disabled={messages.length === 0}
                className="rounded-full bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" onClick={clearChat} size="sm" className="flex-1 rounded-full bg-transparent">
                Clear Chat
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                disabled={loading}
                className="flex-1 border-2 border-purple-200 rounded-full px-6 focus:border-purple-400 focus:ring-purple-400"
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full px-6"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
