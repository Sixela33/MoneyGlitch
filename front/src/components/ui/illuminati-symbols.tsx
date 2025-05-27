"use client"

import { Triangle, Eye } from "lucide-react"

export function IlluminatiSymbols() {
  return (
    <>
      {/* Corner Illuminati Triangles */}
      <div className="fixed top-8 left-8 z-5">
        <div className="relative w-16 h-16">
          <Triangle className="w-16 h-16 text-green-400/30 animate-pulse" />
          <Eye className="w-6 h-6 text-green-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="fixed top-8 right-8 z-5">
        <div className="relative w-16 h-16">
          <Triangle className="w-16 h-16 text-green-400/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
          <Eye className="w-6 h-6 text-green-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="fixed bottom-8 left-8 z-5">
        <div className="relative w-16 h-16">
          <Triangle className="w-16 h-16 text-green-400/30 animate-pulse rotate-180" style={{ animationDelay: "1s" }} />
          <Eye className="w-6 h-6 text-green-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-5">
        <div className="relative w-16 h-16">
          <Triangle
            className="w-16 h-16 text-green-400/30 animate-pulse rotate-180"
            style={{ animationDelay: "1.5s" }}
          />
          <Eye className="w-6 h-6 text-green-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Sacred Geometry Lines */}
      <div className="fixed top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent transform -translate-y-1/2 z-5"></div>
      <div className="fixed top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-green-400/20 to-transparent transform -translate-x-1/2 z-5"></div>

      {/* Diagonal Sacred Lines */}
      <div className="fixed top-0 left-0 w-full h-full z-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-green-400/10 to-transparent transform rotate-45 origin-left"></div>
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-green-400/10 to-transparent transform -rotate-45 origin-right"></div>
      </div>

      {/* Floating Illuminati Symbols */}
      <div className="fixed top-1/4 left-1/4 z-5">
        <div className="w-8 h-8 text-green-400/20 animate-bounce" style={{ animationDelay: "2s" }}>
          ◊
        </div>
      </div>

      <div className="fixed top-3/4 right-1/4 z-5">
        <div className="w-8 h-8 text-green-400/20 animate-bounce" style={{ animationDelay: "3s" }}>
          ∆
        </div>
      </div>

      <div className="fixed top-1/2 left-1/6 z-5">
        <div className="w-8 h-8 text-green-400/20 animate-bounce" style={{ animationDelay: "4s" }}>
          ∇
        </div>
      </div>

      <div className="fixed top-1/3 right-1/6 z-5">
        <div className="w-8 h-8 text-green-400/20 animate-bounce" style={{ animationDelay: "5s" }}>
          ◈
        </div>
      </div>

      {/* Central Sacred Geometry Background */}
      <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-96 h-96 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full text-green-400">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </>
  )
}
