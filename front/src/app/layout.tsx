import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
import { Providers } from "./Providers"


export const metadata: Metadata = {
  title: "Money Glitch - Arbitraje Inteligente en Solana",
  description: "Plataforma de arbitraje automatizado para el ecosistema Solana",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
