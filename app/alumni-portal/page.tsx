'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { Users, Calendar, MessageSquare, Award, Network } from 'lucide-react'
import Link from 'next/link'

export default function AlumniPortal() {
  const [activeTab, setActiveTab] = useState('events')

  const alumni = [
    { id: 1, name: 'James Mitchell', batch: '2015', company: 'Google', profession: 'Software Engineer' },
    { id: 2, name: 'Lisa Anderson', batch: '2016', company: 'Microsoft', profession: 'Product Manager' },
    { id: 3, name: 'David Chen', batch: '2014', company: 'Goldman Sachs', profession: 'Analyst' },
    { id: 4, name: 'Rachel Johnson', batch: '2017', company: 'McKinsey', profession: 'Consultant' },
  ]

  const upcomingEvents = [
    { id: 1, name: 'Alumni Reunion 2024', date: '2024-03-15', location: 'School Campus', attendees: 250 },
    { id: 2, name: 'Career Workshop', date: '2024-03-22', location: 'Online', attendees: 180 },
    { id: 3, name: 'Sports Day Celebration', date: '2024-04-05', location: 'Stadium', attendees: 150 },
  ]

  const achievements = [
    { id: 1, name: 'Dr. Rajesh Patel', achievement: 'Published 15 Research Papers', year: 2023 },
    { id: 2, name: 'Priya Sharma', achievement: 'Promoted to CEO of TechCorp', year: 2023 },
    { id: 3, name: 'Arjun Kumar', achievement: 'Won National Award for Innovation', year: 2024 },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alumni Portal</h1>
          <p className="text-gray-600 mt-2">Connect with fellow alumni and stay updated</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Total Alumni</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">8,500+</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Active Members</p>
            <p className="text-3xl font-bold text-green-600 mt-2">3,200+</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Events This Year</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">In Fortune 500</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">45</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200 flex-wrap">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 min-w-fit px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'events'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="inline mr-2" size={18} />
              Events
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`flex-1 min-w-fit px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'network'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Network className="inline mr-2" size={18} />
              Network
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 min-w-fit px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'achievements'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Award className="inline mr-2" size={18} />
              Achievements
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'events' && (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>📅 {event.date}</span>
                          <span>📍 {event.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Expected Attendees</p>
                        <p className="text-2xl font-bold text-blue-600">{event.attendees}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                        Register Now
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition text-sm">
                        Share Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'network' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alumni.map((person) => (
                  <div key={person.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{person.name}</h3>
                        <p className="text-sm text-gray-600">Class of {person.batch}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><span className="font-medium text-gray-900">{person.company}</span></p>
                      <p className="text-sm text-gray-600">{person.profession}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
                        Connect
                      </button>
                      <button className="flex-1 text-gray-600 hover:text-gray-900 p-2">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start gap-4">
                      <Award className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                        <p className="text-gray-700 mt-1">{achievement.achievement}</p>
                        <p className="text-sm text-gray-600 mt-2">Year: {achievement.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
