'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { BookOpen, Clock, CheckCircle, AlertCircle, Download, Award, TrendingUp, Bell, User, Megaphone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function StudentPortalContent() {
  const [activeTab, setActiveTab] = useState('courses')

  const notices = [
    { id: 1, title: 'Mid-Term Exam Schedule', content: 'Exams start from March 1st. All students must report 15 mins early.', priority: 'high', date: '2024-02-15', createdBy: 'Principal' },
    { id: 2, title: 'Lab Session Cancelled', content: 'Lab session on Friday is postponed to next week.', priority: 'medium', date: '2024-02-14', createdBy: 'Dr. Anderson' },
    { id: 3, title: 'Annual Sports Day', content: 'Sports day on 25th March. Students should wear their house colors.', priority: 'low', date: '2024-02-10', createdBy: 'Sports Dept' },
  ]

  const courses = [
    { id: 1, name: 'Mathematics - Calculus', instructor: 'Dr. Sarah Johnson', progress: 95, grade: 'A' },
    { id: 2, name: 'English Literature', instructor: 'Prof. Michael Brown', progress: 98, grade: 'A' },
    { id: 3, name: 'Physics - Quantum Mechanics', instructor: 'Dr. James Wilson', progress: 94, grade: 'A-' },
    { id: 4, name: 'History - World Civilizations', instructor: 'Prof. Emma Davis', progress: 98, grade: 'A' },
  ]

  const assignments = [
    { id: 1, title: 'Math Problem Set 5', course: 'Mathematics', dueDate: '2024-02-15', status: 'pending' },
    { id: 2, title: 'Essay on Romeo & Juliet', course: 'English Literature', dueDate: '2024-02-20', status: 'submitted' },
    { id: 3, title: 'Physics Lab Report', course: 'Physics', dueDate: '2024-02-10', status: 'overdue' },
    { id: 4, title: 'Historical Research Paper', course: 'History', dueDate: '2024-02-25', status: 'pending' },
  ]

  const gradeColors: Record<string, string> = {
    'A': 'from-emerald-500 to-emerald-600',
    'A-': 'from-green-500 to-green-600',
    'B+': 'from-blue-500 to-blue-600',
    'B': 'from-cyan-500 to-cyan-600',
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'from-red-500 to-red-600'
    if (priority === 'medium') return 'from-orange-500 to-orange-600'
    return 'from-blue-500 to-blue-600'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Header />

      {/* Hero Banner */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 right-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Welcome back, Alex Johnson</h1>
          <p className="text-blue-100 text-xl">Track your academic progress and manage your coursework efficiently</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Award size={36} className="mb-4 opacity-90" />
            <p className="text-blue-100 text-sm font-bold uppercase tracking-wide">Percentage</p>
            <p className="text-5xl font-bold mt-3">96.25%</p>
          </div>
          <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <BookOpen size={36} className="mb-4 opacity-90" />
            <p className="text-emerald-100 text-sm font-bold uppercase tracking-wide">Courses</p>
            <p className="text-5xl font-bold mt-3">4</p>
          </div>
          <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Clock size={36} className="mb-4 opacity-90" />
            <p className="text-orange-100 text-sm font-bold uppercase tracking-wide">Pending</p>
            <p className="text-5xl font-bold mt-3">2</p>
          </div>
          <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <TrendingUp size={36} className="mb-4 opacity-90" />
            <p className="text-purple-100 text-sm font-bold uppercase tracking-wide">Attendance</p>
            <p className="text-5xl font-bold mt-3">94%</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-2">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'courses'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <BookOpen size={20} />
              Courses
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'assignments'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Clock size={20} />
              Assignments
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`flex-1 px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'grades'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <CheckCircle size={20} />
              Grades
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex-1 px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'notices'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Bell size={20} />
              Notices
            </button>
          </div>

          {/* Content */}
          <div className="p-10 bg-gradient-to-b from-white to-slate-50">
            {activeTab === 'courses' && (
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">{course.name}</h3>
<p className="text-slate-600 text-base inline-flex items-center gap-1.5"><User size={16} className="text-blue-600" /> {course.instructor}</p>
                      </div>
                      <span className={`bg-gradient-to-r ${gradeColors[course.grade]} text-white text-base font-bold px-5 py-3 rounded-xl shadow-lg`}>
                        {course.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-600">Progress</span>
                          <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-300 rounded-full h-4">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500 shadow-lg" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="group bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">{assignment.title}</h3>
                        <p className="text-slate-600 text-sm mt-1">{assignment.course}</p>
                        <p className="text-slate-500 text-sm mt-2">Due: {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {assignment.status === 'submitted' && (
                          <span className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold text-sm">
                            <CheckCircle size={18} /> Submitted
                          </span>
                        )}
                        {assignment.status === 'pending' && (
                          <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm">
                            <Clock size={18} /> Pending
                          </span>
                        )}
                        {assignment.status === 'overdue' && (
                          <span className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold text-sm">
                            <AlertCircle size={18} /> Overdue
                          </span>
                        )}
                        <button className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'grades' && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-4">
                  <CheckCircle className="text-white" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Grade Summary</h3>
                <p className="text-slate-600 mb-6">All your grades are up to date</p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-600/50 transition-all">
                  Download Report Card
                </button>
              </div>
            )}

            {/* Notices Tab */}
            {activeTab === 'notices' && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">School Notices & Announcements</h3>
                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`bg-gradient-to-r ${getPriorityColor(notice.priority)} text-white px-4 py-2 rounded-lg text-xs font-bold uppercase`}>
                              {notice.priority}
                            </span>
                            <span className="text-sm font-semibold text-slate-600">{notice.date}</span>
                          </div>
                          <h4 className="text-2xl font-bold text-slate-900 mb-2">{notice.title}</h4>
                          <p className="text-slate-700 mb-3 leading-relaxed">{notice.content}</p>
<p className="text-sm text-slate-600 inline-flex items-center gap-1.5"><Megaphone size={14} className="text-blue-600" /> By {notice.createdBy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Link */}
<Link href="/" className="inline-block mt-8 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          Back to Home
        </Link>
      </div>
    </main>
  )
}

export default function StudentPortal() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentPortalContent />
    </ProtectedRoute>
  )
}
