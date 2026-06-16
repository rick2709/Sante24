import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Santé 24hr Medical Centre offers 24-hour emergency care, diagnostic & laboratory services, operating theatre, specialist consultations, and full maternity hospital services in Southerton, Harare.',
  openGraph: {
    title: 'Medical & Maternity Services | Santé 24hr Medical Centre',
    description: 'General medical care and dedicated maternity hospital services — 24 hours a day, every day, at Southerton Shopping Centre, Harare.',
  },
  alternates: {
    canonical: 'https://santemedical.co.zw/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
