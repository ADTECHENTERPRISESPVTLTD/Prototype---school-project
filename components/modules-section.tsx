'use client'

import Link from 'next/link'
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  BarChart3, 
  Calendar, 
  Inbox,
  ArrowRight 
} from 'lucide-react'

const modules = [
  {
    icon: BookOpen,
    title: 'Student Portal',
    description: 'Access courses, assignments, and grades in one place',
    href: '/student-portal',
    gradient: 'from-blue-600 to-blue-700',
    icon_bg: 'bg-blue-100 text-blue-600',
    hover_gradient: 'from-blue-500/10 via-blue-600/5 to-transparent',
  },
  {
    icon: GraduationCap,
    title: 'Faculty Portal',
    description: 'Manage classes and track student performance',
    href: '/faculty-portal',
    gradient: 'from-emerald-600 to-emerald-700',
    icon_bg: 'bg-emerald-100 text-emerald-600',
    hover_gradient: 'from-emerald-500/10 via-emerald-600/5 to-transparent',
  },
  {
    icon: Users,
    title: 'Parent Portal',
    description: 'Monitor child performance and fees',
    href: '/parent-portal',
    gradient: 'from-purple-600 to-purple-700',
    icon_bg: 'bg-purple-100 text-purple-600',
    hover_gradient: 'from-purple-500/10 via-purple-600/5 to-transparent',
  },
  {
    icon: BarChart3,
    title: 'Principal Dashboard',
    description: 'School analytics and administration',
    href: '/principal-portal',
    gradient: 'from-orange-600 to-orange-700',
    icon_bg: 'bg-orange-100 text-orange-600',
    hover_gradient: 'from-orange-500/10 via-orange-600/5 to-transparent',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Upcoming school events and activities',
    href: '/events',
    gradient: 'from-pink-600 to-pink-700',
    icon_bg: 'bg-pink-100 text-pink-600',
    hover_gradient: 'from-pink-500/10 via-pink-600/5 to-transparent',
  },
  {
    icon: Inbox,
    title: 'Notices',
    description: 'Announcements and important updates',
    href: '/notices',
    gradient: 'from-cyan-600 to-cyan-700',
    icon_bg: 'bg-cyan-100 text-cyan-600',
    hover_gradient: 'from-cyan-500/10 via-cyan-600/5 to-transparent',
  },
]

export default function ModulesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 relative overflow-hidden">
      {/* Floating Decorative Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold shadow-lg animate-gradient">
            Our Services
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 animate-gradient" style={{ backgroundSize: '200% 200%' }}>
              Portal & Modules
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive school management platform with role-based access for students, teachers, parents, and administrators
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const IconComponent = module.icon
            const delayClass = `reveal-delay-${(index % 6) + 1}`
            return (
              <Link key={module.title} href={module.href}>
                <div className={`group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-400 cursor-pointer h-full transform hover:-translate-y-3 overflow-hidden reveal ${delayClass}`}>
                  {/* Top Border Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${module.gradient}`}></div>
                  
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.hover_gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`${module.icon_bg} p-4 rounded-xl w-fit mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-400 shadow-md`}>
                      <IconComponent size={32} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">{module.title}</h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 text-base mb-8 leading-relaxed">{module.description}</p>
                    
                    {/* CTA */}
                    <div className="inline-flex items-center gap-3 text-slate-700 font-bold text-base group-hover:gap-4 transition-all duration-300">
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">Access Now</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
