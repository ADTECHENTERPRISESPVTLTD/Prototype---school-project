'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Award, Users } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[650px] overflow-hidden">
      {/* School Building Background Image - Full Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/school-building.png"
          alt="School Building"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 px-4 py-2 rounded-full mb-8 backdrop-blur-md hover:bg-white/20 transition-all">
            <Sparkles size={16} className="text-white" />
            <span className="text-white text-sm font-semibold">Excellence in Education</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Shaping Future
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-200 drop-shadow-lg">
              Leaders
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium">
            Where tradition meets innovation. Experience world-class education designed to nurture curiosity, build character, and prepare students for global success.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-5 hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">50+</div>
              <div className="text-sm text-white/90 font-semibold mt-1">Programs</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-5 hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">10K+</div>
              <div className="text-sm text-white/90 font-semibold mt-1">Students</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-5 hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">98%</div>
              <div className="text-sm text-white/90 font-semibold mt-1">Success</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-slate-600/50 transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
            >
              <Award size={20} />
              Admissions Info
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/25 backdrop-blur-md border border-white/50 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/35 transition-all duration-300 drop-shadow-lg"
            >
              <Users size={20} />
              Login Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
