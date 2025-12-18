"use client"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(117,114,253,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(117,114,253,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
    </div>
  )
}
