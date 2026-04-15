import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MobileNav } from '@/components/mobile-nav'
import { CookieBanner } from '@/components/cookie-banner'
import { BookingModal } from '@/components/booking-modal'
import { BookingProvider } from '@/components/booking-context'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sante 24 Medical Center | 24/7 Healthcare in Harare, Zimbabwe',
  description: 'Comprehensive 24-hour medical care for every Harare family. Emergency care, specialist doctors, maternal health, paediatrics, and more at Southerton, Harare.',
  keywords: ['medical center', 'Harare', 'Zimbabwe', '24/7 healthcare', 'emergency care', 'doctors', 'Southerton'],
  authors: [{ name: 'Sante 24 Medical Center' }],
  openGraph: {
    title: 'Sante 24 Medical Center | 24/7 Healthcare in Harare',
    description: 'Comprehensive 24-hour medical care for every Harare family.',
    type: 'website',
    locale: 'en_ZW',
  },
}

export const viewport: Viewport = {
  themeColor: '#003366',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        <BookingProvider>
          <Navbar />
          <main className="min-h-screen pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <BookingModal />
          <CookieBanner />
        </BookingProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
