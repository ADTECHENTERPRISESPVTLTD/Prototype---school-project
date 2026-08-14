'use client'

import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ModulesSection from '@/components/modules-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ModulesSection />
    </main>
  )
}
