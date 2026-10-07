import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ToolKit — 30+ Alat Online',
  description: 'Kumpulan alat online dalam satu tempat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
