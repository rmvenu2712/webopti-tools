import type { NextRequest } from "next/server"
  export const runtime = 'edge';
export const POST = async (req: NextRequest) => {
  const { messages } = await req.json()
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  const systemMessage = {
    role: "system",
    content: `You are a helpful AI assistant. Today's date is December 14, 2025. Provide accurate, helpful, and concise responses. When discussing dates or time-sensitive information, use December 14, 2025 as the current date.`,
  }

  const allMessages = [systemMessage, ...messages]

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: allMessages,
        stream: true,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("[v0] OpenRouter API error:", errorText)
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader()
        const decoder = new TextDecoder()

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split("\n").filter(Boolean)

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const json = line.slice(6)
                if (json === "[DONE]") continue
                try {
                  const data = JSON.parse(json)
                  const content = data.choices[0]?.delta?.content
                  if (content) {
                    controller.enqueue(new TextEncoder().encode(content))
                  }
                } catch (parseError) {
                  console.error("[v0] Parse error:", parseError)
                }
              }
            }
          }
        } catch (streamError) {
          console.error("[v0] Stream error:", streamError)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(JSON.stringify({ error: "Failed to connect to AI service" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
