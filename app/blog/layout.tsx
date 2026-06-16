import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Blog',
  description: 'Health tips, medical guides, and community wellness articles from the team at Santé 24hr Medical Centre, Southerton, Harare. Stay informed on emergency care, maternal health, nutrition, and more.',
  openGraph: {
    title: 'Health Blog | Santé 24hr Medical Centre',
    description: 'Health tips and medical guides from Santé 24hr Medical Centre, Harare — covering emergency care, maternal health, nutrition, and community wellness.',
  },
  alternates: {
    canonical: 'https://santemedical.co.zw/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
