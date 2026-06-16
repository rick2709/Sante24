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
import { WhatsAppFloat } from '@/components/whatsapp-float'

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
  title: {
    default: 'Santé 24hr Medical Centre | 24-Hour Medical Care in Southerton, Harare',
    template: '%s | Santé 24hr Medical Centre',
  },
  description: 'Santé 24hr Medical Centre is a licensed 24-hour medical centre in Southerton, Harare, Zimbabwe, offering emergency care, diagnostics, surgery, and maternity services since 2016.',
  keywords: ['24 hour clinic Harare', 'medical centre Southerton', 'emergency care Harare', 'maternity hospital Harare', 'Sante 24', 'private hospital Zimbabwe', 'ultrasound scan Harare', 'antenatal care Harare', 'HPA licensed Zimbabwe', 'Southerton Shopping Centre clinic'],
  authors: [{ name: 'Santé 24hr Medical Centre' }],
  metadataBase: new URL('https://santemedical.co.zw'),
  openGraph: {
    title: 'Santé 24hr Medical Centre | 24-Hour Medical Care in Southerton, Harare',
    description: 'Santé 24hr Medical Centre is a licensed 24-hour medical centre in Southerton, Harare, Zimbabwe, offering emergency care, diagnostics, surgery, and maternity services since 2016.',
    type: 'website',
    locale: 'en_ZW',
    siteName: 'Santé 24hr Medical Centre',
    url: 'https://santemedical.co.zw',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santé 24hr Medical Centre | 24-Hour Medical Care in Southerton, Harare',
    description: 'Licensed 24-hour medical centre in Southerton, Harare. Emergency care, diagnostics, surgery, and maternity services since 2016.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://santemedical.co.zw',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: 'Santé 24hr Medical Centre',
  alternateName: 'Sante 24',
  url: 'https://santemedical.co.zw',
  logo: 'https://santemedical.co.zw/icon.svg',
  description: 'Licensed 24-hour medical centre in Southerton, Harare, providing emergency care, diagnostics, operating theatre, and maternity services since October 2016.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop 5, Southerton Shopping Centre, St Johns Way',
    addressLocality: 'Southerton',
    addressRegion: 'Harare',
    addressCountry: 'ZW',
  },
  telephone: ['+2634620588', '+2638644150770', '+263789158334'],
  email: 'info@santemedical.co.zw',
  openingHours: 'Mo-Su 00:00-23:59',
  medicalSpecialty: ['Emergency Medicine', 'Obstetrics and Gynecology', 'Diagnostic Radiology', 'General Practice'],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <BookingProvider>
          <Navbar />
          <main className="min-h-screen pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <BookingModal />
          <WhatsAppFloat />
          <CookieBanner />
        </BookingProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
