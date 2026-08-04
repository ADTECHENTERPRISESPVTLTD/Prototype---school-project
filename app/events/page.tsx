'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { Calendar, MapPin, Users, ChevronRight, Filter, Bell } from 'lucide-react'
import Link from 'next/link'

export default function EventsPage() {
  const [filter, setFilter] = useState('all')

  const events = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: '2024-02-28',
      time: '9:00 AM - 5:00 PM',
      location: 'School Stadium',
      category: 'sports',
      attendees: 500,
      description: 'Experience an exciting day of athletic competitions and team sports.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 2,
      title: 'Science Fair 2024',
      date: '2024-03-10',
      time: '10:00 AM - 4:00 PM',
      location: 'School Auditorium',
      category: 'academic',
      attendees: 350,
      description: 'Showcase innovative science projects and experiments.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Annual Day Celebrations',
      date: '2024-03-22',
      time: '6:00 PM - 10:00 PM',
      location: 'Open Air Theater',
      category: 'cultural',
      attendees: 1000,
      description: 'Join us for an evening of cultural performances and awards.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 4,
      title: 'Career Fair 2024',
      date: '2024-04-05',
      time: '9:00 AM - 3:00 PM',
      location: 'School Campus',
      category: 'academic',
      attendees: 600,
      description: 'Meet leading companies and explore career opportunities.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 5,
      title: 'Debate Championship',
      date: '2024-04-15',
      time: '2:00 PM - 6:00 PM',
      location: 'Conference Hall',
      category: 'competition',
      attendees: 200,
      description: 'Watch talented debaters compete in national championship.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 6,
      title: 'Alumni Reunion',
      date: '2024-04-25',
      time: '5:00 PM - 10:00 PM',
      location: 'School Grounds',
      category: 'social',
      attendees: 800,
      description: 'Reconnect with alumni and celebrate school\'s legacy.',
      color: 'from-indigo-500 to-indigo-600'
    },
  ]

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Header />

      {/* Hero Banner */}
      <section className="relative py-12 px-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">School Events</h1>
          <p className="text-pink-100 text-lg">Discover upcoming activities and celebrations</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Filter size={24} />
            Filter Events
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['all', 'academic', 'sports', 'cultural', 'competition', 'social'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`p-3 rounded-xl font-bold text-center transition-all duration-200 transform hover:scale-105 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-pink-300'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-r ${event.color} opacity-90`}></div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition">{event.title}</h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Calendar size={18} className="text-pink-600" />
                    <span className="text-sm font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <MapPin size={18} className="text-pink-600" />
                    <span className="text-sm font-semibold">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Users size={18} className="text-pink-600" />
                    <span className="text-sm font-semibold">{event.attendees} Expected</span>
                  </div>
                </div>

                {/* Register Button */}
                <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group">
                  Register Now
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <Bell size={32} className="mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Never Miss an Event</h2>
              <p className="text-blue-100 mb-4">Subscribe to get instant notifications about all upcoming school events</p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none"
                />
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <Link href="/" className="inline-block mt-12 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition">←</span> Back to Home
        </Link>
      </div>
    </main>
  )
}
