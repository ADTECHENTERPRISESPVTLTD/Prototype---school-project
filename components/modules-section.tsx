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
    gradient: 'from-slate-700 to-slate-800',
    icon_bg: 'bg-slate-100 text-slate-700',
  },
  {
    icon: GraduationCap,
    title: 'Faculty Portal',
    description: 'Manage classes and track student performance',
    href: '/faculty-portal',
    gradient: 'from-slate-600 to-slate-700',
    icon_bg: 'bg-slate-100 text-slate-600',
  },
  {
    icon: Users,
    title: 'Parent Portal',
    description: 'Monitor child performance and fees',
    href: '/parent-portal',
    gradient: 'from-slate-700 to-slate-800',
    icon_bg: 'bg-slate-100 text-slate-700',
  },
  {
    icon: BarChart3,
    title: 'Principal Dashboard',
    description: 'School analytics and administration',
    href: '/principal-portal',
    gradient: 'from-slate-600 to-slate-700',
    icon_bg: 'bg-slate-100 text-slate-600',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Upcoming school events and activities',
    href: '/events',
    gradient: 'from-slate-700 to-slate-800',
    icon_bg: 'bg-slate-100 text-slate-700',
  },
  {
    icon: Inbox,
    title: 'Notices',
    description: 'Announcements and important updates',
    href: '/notices',
    gradient: 'from-slate-600 to-slate-700',
    icon_bg: 'bg-slate-100 text-slate-600',
  },
]

export default function ModulesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-sm font-bold">
            Our Services
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Portal & Modules
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive school management platform with role-based access for students, teachers, parents, and administrators
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Link key={module.title} href={module.href}>
                <div className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-400 cursor-pointer h-full transform hover:-translate-y-3 overflow-hidden">
                  {/* Top Border Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${module.gradient}`}></div>
                  
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-400`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`${module.icon_bg} p-4 rounded-xl w-fit mb-6 group-hover:scale-125 transition-transform duration-400 shadow-md`}>
                      <IconComponent size={32} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-all duration-300">{module.title}</h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 text-base mb-8 leading-relaxed">{module.description}</p>
                    
                    {/* CTA */}
                    <div className="inline-flex items-center gap-3 text-slate-700 font-bold text-base group-hover:gap-4 transition-all duration-300">
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">Access Now</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:text-blue-600 transition-all duration-300" />
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
