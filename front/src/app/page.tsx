"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Globe, Eye, Triangle } from "lucide-react"
import StartTradingButton from "@/components/StartTradingButton"
import { MatrixRain } from "@/components/ui/matrix-rain"
import { IlluminatiSymbols } from "@/components/ui/illuminati-symbols"

export default function LandingPage() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Illuminati Symbols */}
      <IlluminatiSymbols />

      {/* Main Content Container - Full Height, No Scroll */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10">
        {/* Central Illuminati Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            {/* All-Seeing Eye */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 border-2 border-green-400 rounded-full bg-green-400/5 animate-pulse"></div>
              <div className="absolute inset-4 border border-green-400 rounded-full bg-green-400/10"></div>
              <div className="absolute inset-8 flex items-center justify-center">
                <Eye className="w-16 h-16 text-green-400 animate-pulse" />
              </div>
              {/* Triangular rays */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <Triangle className="w-4 h-4 text-green-400 animate-bounce" style={{ animationDelay: "0s" }} />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-180">
                <Triangle className="w-4 h-4 text-green-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
              </div>
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 -rotate-90">
                <Triangle className="w-4 h-4 text-green-400 animate-bounce" style={{ animationDelay: "1s" }} />
              </div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 rotate-90">
                <Triangle className="w-4 h-4 text-green-400 animate-bounce" style={{ animationDelay: "1.5s" }} />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-green-400 font-mono tracking-[0.3em] mb-4">
              MONEY GLITCH
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-green-300 font-mono tracking-[0.2em] mb-6">
              ARBITRAJE INTELIGENTE
            </h2>
            <p className="text-green-300/60 text-lg font-mono tracking-widest max-w-2xl mx-auto leading-relaxed mb-8">
              ◊ DISCOVER REAL-TIME ARBITRAGE OPPORTUNITIES IN THE CRYPTO ECOSYSTEM ◊
            </p>

            {/* Sacred Geometry Lines */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          </div>
        </div>

        {/* Action Button - Centered */}
        <div className="flex justify-center items-center mb-16">
          <StartTradingButton />
        </div>

        {/* Matrix Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-green-400/5 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto relative">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-green-400 font-mono tracking-wider">REAL-TIME OPPORTUNITIES</h3>
              <p className="text-green-300/60 font-mono text-sm tracking-wider">
                ◊ INSTANTLY DETECT PRICE DIFFERENCES ◊
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-400/5 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto relative">
                <Shield className="w-8 h-8 text-green-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-green-400 font-mono tracking-wider">ADVANCED SECURITY</h3>
              <p className="text-green-300/60 font-mono text-sm tracking-wider">◊ INSTITUTIONAL-GRADE PROTOCOLS ◊</p>
            </CardContent>
          </Card>

          <Card className="bg-green-400/5 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto relative">
                <Globe className="w-8 h-8 text-green-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-green-400 font-mono tracking-wider">SOLANA ECOSYSTEM</h3>
              <p className="text-green-300/60 font-mono text-sm tracking-wider">◊ FULL INTEGRATION WITH TOP DEXS ◊</p>
            </CardContent>
          </Card>
        </div>

        {/* Matrix Stats */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-400 font-mono">$2.4M</div>
            <div className="text-green-300/60 font-mono text-sm tracking-wider">TOTAL VOLUME</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-400 font-mono">1,247</div>
            <div className="text-green-300/60 font-mono text-sm tracking-wider">ACTIVE TRADERS</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-400 font-mono">15</div>
            <div className="text-green-300/60 font-mono text-sm tracking-wider">CONNECTED DEXS</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-400 font-mono">99.9%</div>
            <div className="text-green-300/60 font-mono text-sm tracking-wider">UPTIME</div>
          </div>
        </div>
      </div>
    </div>
  )
}
