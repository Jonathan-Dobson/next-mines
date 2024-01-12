import NextAuthProvider from '@/context/NextAuthProvider';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/ui/globals.css'
import Navbar from '@/components/Navbar/Navbar'
import GamePlayProvider from '@/context/GamePlayProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Mines',
  description: 'Mine sweeper game built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <GamePlayProvider>
            <Navbar />
            <main>
              {children}
            </main>
          </GamePlayProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
