import Link from 'next/link'
import { Home, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="text-center max-w-md">
        <p className="text-8xl font-heading font-bold text-[#003366]/10 select-none mb-2">404</p>
        <h1 className="text-3xl font-heading font-bold text-[#003366] mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. You can find everything you need below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-[#003366] hover:bg-[#004d80] text-white rounded-full px-6">
            <Link href="/"><Home className="w-4 h-4 mr-2" /> Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-[#003366] text-[#003366]">
            <Link href="/contact"><Phone className="w-4 h-4 mr-2" /> Contact Us</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-10">
          Need urgent help? Call us on{' '}
          <a href="tel:+263242620588" className="text-[#00B4A6] hover:underline font-medium">0242 620588</a>
          {' '}— we&apos;re open 24 hours, 365 days a year.
        </p>
      </div>
    </div>
  )
}
