"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "@/contexts/UserContext"
import { ReactNode, useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  )
}