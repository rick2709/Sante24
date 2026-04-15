"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingContextType {
  isOpen: boolean
  openBooking: (doctor?: string, service?: string) => void
  closeBooking: () => void
  preselectedDoctor: string | null
  preselectedService: string | null
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedDoctor, setPreselectedDoctor] = useState<string | null>(null)
  const [preselectedService, setPreselectedService] = useState<string | null>(null)

  const openBooking = (doctor?: string, service?: string) => {
    setPreselectedDoctor(doctor || null)
    setPreselectedService(service || null)
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
    setPreselectedDoctor(null)
    setPreselectedService(null)
  }

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, preselectedDoctor, preselectedService }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
