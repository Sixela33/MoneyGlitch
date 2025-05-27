"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Wallet, DollarSign, Eye, TrendingUp, ArrowUpDown, Triangle, LogOut } from "lucide-react"
import { MatrixRain } from "@/components/ui/matrix-rain"
import { IlluminatiSymbols } from "@/components/ui/illuminati-symbols"
import { useUser } from "@/contexts/UserContext"
import axiosInstance from "@/utils/axios"

export default function Dashboard() {
  const { user, handleLogout , refetchUser} = useUser()

  const [isModalOpen, setIsModalOpen] = useState(false)
  // Withdraw modal state
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [withdrawAddress, setWithdrawAddress] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")


  const handleBotToggle = async () => {
    try {
      await axiosInstance.post('/user/subscribe')
      refetchUser();
    } catch (error) {
      console.error(error)
    }
  }
  // Datos de ejemplo de trades realizados
  const completedTrades = [
    {
      id: 1,
      pair: "SOL/ETH/USDC",
      amount: "2.45 SOL",
      profit: "+$67.89",
      time: "14:32:15",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Illuminati Symbols */}
      <IlluminatiSymbols />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Central Illuminati Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            {/* All-Seeing Eye */}
            <div className="w-32 h-32 mx-auto mb-6 relative">
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

            <h1 className="text-4xl font-bold text-green-400 font-mono tracking-[0.3em] mb-2">MONEY GLITCH</h1>
            <p className="text-green-300/60 text-sm font-mono tracking-widest">◊ MATRIX PROTOCOL v2.1 ◊</p>

            {/* Sacred Geometry Lines */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          </div>
        </div>

        {/* Wallet and Deposit Section */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          {/* Wallet Display */}
          <div className="flex items-center space-x-3 bg-green-400/5 rounded-full px-8 py-4 backdrop-blur-sm">
            <Wallet className="w-6 h-6 text-green-400" />
            <span className="text-green-300 font-mono text-lg tracking-wider">
              {user?.walletAddress
                ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`
                : "DISCONNECTED"}
            </span>
          </div>

          {/* Deposit Button as Modal Trigger */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-black font-mono font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-green-500/25">
                <DollarSign className="w-6 h-6 mr-3" />
                DEPOSIT FUNDS
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border border-green-400">
              <DialogHeader>
                <DialogTitle className="text-green-400 font-mono">Deposit to Your Wallet</DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex items-center justify-between bg-green-400/10 p-4 rounded-lg">
                <span className="text-green-300 font-mono text-sm truncate">
                  {user?.walletAddress || "No wallet available"}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(user?.walletAddress || "")
                  }}
                >
                  <Copy className="w-5 h-5 text-green-400" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Withdraw Button as Modal Trigger */}
          <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-black font-mono font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-green-500/25">
                <DollarSign className="w-6 h-6 mr-3" />
                WITHDRAW FUNDS
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border border-green-400">
              <DialogHeader>
                <DialogTitle className="text-green-400 font-mono">Withdraw from Your Wallet</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log("Withdraw:", withdrawAddress, withdrawAmount)
                }}
                className="space-y-4 mt-4"
              >
                <input
                  type="text"
                  placeholder="Recipient Address"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-green-400/10 text-green-300 font-mono text-sm placeholder-green-300/40 border border-green-400"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount (SOL)"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-green-400/10 text-green-300 font-mono text-sm placeholder-green-300/40 border border-green-400"
                />
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-mono font-bold text-lg px-6 py-3 rounded-full"
                >
                  Send Withdrawal
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleLogout}
            className="bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 font-mono font-bold text-lg px-6 py-4 rounded-full shadow-lg shadow-green-500/10"
          >
            <LogOut className="w-6 h-6 mr-3" />
            DISCONNECT
          </Button>
        </div>

        {/* Bot Control Section - Centered */}
        <div className="w-full max-w-2xl mb-12">
          <Card className="bg-green-400/5 backdrop-blur-sm rounded-3xl shadow-2xl shadow-green-500/10">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-green-400/10 flex items-center justify-center relative">
                    <TrendingUp className="w-12 h-12 text-green-400" />
                    {user?.isSubscribed && (
                      <>
                        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-400 font-mono tracking-wider mb-2">TRADING BOT</h2>
                  <p className="text-green-300/60 font-mono text-sm tracking-widest">
                    {user?.isSubscribed ? "◊ ACTIVE - SCANNING MARKETS ◊" : "◊ INACTIVE - STANDBY MODE ◊"}
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  <span className="text-green-300 font-mono text-xl tracking-wider">
                    {user?.isSubscribed ? "ONLINE" : "OFFLINE"}
                  </span>
                  <Switch
                    checked={user?.isSubscribed}
                    onCheckedChange={handleBotToggle}
                    className="data-[state=checked]:bg-green-500 scale-150"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid - Centered */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 w-full max-w-4xl ">
          {/* Total Profit 
          <Card className="bg-green-400/5 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-300/60 text-sm font-mono tracking-wider mb-2">TOTAL PROFIT</p>
              <p className="text-3xl font-bold text-green-400 font-mono">$1,247.89</p>
            </CardContent>
          </Card>
              */}

          <Card className="bg-green-400/5 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10 grid col-span-3">
            <CardContent className="p-8 text-center">
              <ArrowUpDown className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-300/60 text-sm font-mono tracking-wider mb-2">TRADES TODAY</p>
              <p className="text-3xl font-bold text-green-400 font-mono">0</p>
            </CardContent>
          </Card>

          {/* Total Success Rate 
          <Card className="bg-green-400/5 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10">
            <CardContent className="p-8 text-center">
              <Eye className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-300/60 text-sm font-mono tracking-wider mb-2">TOTAL SUCCESS RATE</p>
              <p className="text-3xl font-bold text-green-400 font-mono">94.2%</p>
            </CardContent>
          </Card>
              */}
        </div>

        {/* Completed Trades Section - Centered */}
        <div className="w-full max-w-6xl">
          <Card className="bg-green-400/5 backdrop-blur-sm rounded-3xl shadow-2xl shadow-green-500/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-green-400 font-mono flex items-center justify-center tracking-wider">
                <Eye className="w-6 h-6 mr-3" />
                COMPLETED TRADES
                <Eye className="w-6 h-6 ml-3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {completedTrades.map((trade, index) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between p-6 rounded-2xl bg-green-400/5 hover:bg-green-400/10 transition-all backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 rounded-full bg-green-400/10 flex items-center justify-center">
                        <span className="text-green-400 font-mono text-lg font-bold">
                          ◊
                        </span>
                      </div>
                      <div>
                        <div className="text-green-300 font-mono font-bold text-lg tracking-wider">{trade.pair}</div>
                        <div className="text-green-300/60 font-mono text-sm tracking-wider">{trade.amount}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <div className="text-green-400 font-mono font-bold text-xl">{trade.profit}</div>
                        <div className="text-green-300/60 font-mono text-sm tracking-wider">{trade.time}</div>
                      </div>
                      <Badge className="bg-green-400/20 text-green-400 font-mono tracking-wider px-4 py-2 rounded-full">
                        {trade.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
