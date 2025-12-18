"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Copy, ArrowLeft, Loader2, X } from "lucide-react";
import Link from "next/link";

export default function RobotsTxtGenerator() {
  const [domain, setDomain] = useState("");
  const [robotsContent, setRobotsContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setTimeout(() => setProgress((p) => Math.min(p + 6, 100)), 70);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const generateRobotsTxt = async () => {
    if (!domain.trim()) {
      setError("Please enter a valid domain");
      return;
    }

    setLoading(true);
    setError("");
    setRobotsContent("");
    setProgress(0);

    try {
      setProgress(20);

      const res = await fetch("/api/generate-robots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      setProgress(70);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setRobotsContent(data.content);
      setProgress(100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  const cancelGeneration = () => {
    setLoading(false);
    setProgress(0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsContent);
  };

  const downloadRobotsTxt = async () => {
    if (!robotsContent) return;
    setDownloading(true);
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        const blob = new Blob([robotsContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "robots.txt";
        a.click();
        URL.revokeObjectURL(url);
        setDownloading(false);
        setTimeout(() => setProgress(0), 500);
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Robots.txt Generator</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            AI-powered generator for robots.txt – control how search engines crawl your site.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError("")} className="text-red-600 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PREVIEW */}
          <Card className="mb-8 p-6 bg-card/50 dark:bg-black/20 border border-border backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Preview</h2>
            {robotsContent ? (
              <div className="space-y-4">
                <pre className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-xs font-mono leading-relaxed whitespace-pre">
                  {robotsContent}
                </pre>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyToClipboard} className="flex-1" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadRobotsTxt} disabled={downloading} className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white" size="sm">
                    {downloading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Downloading...</> : <><Download className="h-4 w-4 mr-2" />Download</>}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground space-y-3">
                <div className="bg-muted/50 border-2 border-dashed border-border rounded-xl w-16 h-16 flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-sm">Enter a domain and generate to see preview</p>
              </div>
            )}
          </Card>

          {/* CONFIG */}
          <Card className="p-6 bg-card/50 dark:bg-black/20 border border-border backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6">Configuration</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Domain</label>
                <Input
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  disabled={loading}
                  className="bg-input border border-border text-foreground"
                />
              </div>

              {progress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{loading ? "AI analyzing site..." : "Preparing..."}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={generateRobotsTxt}
                  disabled={loading || !domain.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                >
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : "Generate robots.txt"}
                </Button>
                {loading && (
                  <Button variant="outline" onClick={cancelGeneration} className="flex-1">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
