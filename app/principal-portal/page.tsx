'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { Users, BookOpen, TrendingUp, Award, AlertCircle, BarChart3, Edit2, Save, X, Filter, Bell, Plus, Trash2, ArrowLeft, CalendarRange } from 'lucide-react'
import Link from 'next/link'
import TimetableView from '@/components/timetable-view'
import { schoolTimetable } from '@/lib/timetable-data'

function PrincipalPortalContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showNewNotice, setShowNewNotice] = useState(false)
  const [noticeData, setNoticeData] = useState({ title: '', content: '', priority: 'medium' })
  const [notices, setNotices] = useState([
    { id: 1, title: 'Mid-Term Exam Schedule', content: 'Exams start from March 1st. All students must report 15 mins early.', priority: 'high', date: '2024-02-15', createdBy: 'Principal' },
    { id: 2, title: 'Lab Session Cancelled', content: 'Lab session on Friday is postponed to next week.', priority: 'medium', date: '2024-02-14', createdBy: 'Principal' },
  ])
  const [showEditModal, setShowEditModal] = useState(false)

  const handleAddNotice = () => {
    if (noticeData.title && noticeData.content) {
      const newNotice = {
        id: notices.length + 1,
        ...noticeData,
        date: new Date().toISOString().split('T')[0],
        createdBy: 'Principal'
      }
      setNotices([newNotice, ...notices])
      setNoticeData({ title: '', content: '', priority: 'medium' })
      setShowNewNotice(false)
    }
  }

  const handleDeleteNotice = (id: number) => {
    setNotices(notices.filter(n => n.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'from-red-500 to-red-600'
    if (priority === 'medium') return 'from-orange-500 to-orange-600'
    return 'from-blue-500 to-blue-600'
  }
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [editData, setEditData] = useState({ marks: 0, attendance: 0 })
  const [filterClass, setFilterClass] = useState('All')

  const [allStudents, setAllStudents] = useState([
    // Class 10A
    { id: 1, name: 'John Smith', class: '10A', marks: 95, attendance: 94, status: 'Active' },
    { id: 2, name: 'Emma Wilson', class: '10A', marks: 98, attendance: 98, status: 'Active' },
    { id: 3, name: 'Michael Brown', class: '10A', marks: 95, attendance: 88, status: 'Active' },
    // Class 10B
    { id: 4, name: 'Sarah Davis', class: '10B', marks: 94, attendance: 92, status: 'Active' },
    { id: 5, name: 'James Miller', class: '10B', marks: 96, attendance: 96, status: 'Active' },
    { id: 6, name: 'Lisa Anderson', class: '10B', marks: 95, attendance: 90, status: 'Active' },
    // Class 11A
    { id: 7, name: 'David Taylor', class: '11A', marks: 96, attendance: 95, status: 'Active' },
    { id: 8, name: 'Sophie Martin', class: '11A', marks: 98, attendance: 99, status: 'Active' },
    // Class 11B
    { id: 9, name: 'Oliver Johnson', class: '11B', marks: 94, attendance: 85, status: 'Active' },
    { id: 10, name: 'Ava Thompson', class: '11B', marks: 96, attendance: 91, status: 'Active' },
  ])

  const stats = [
    { label: 'Total Students', value: allStudents.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Faculty Members', value: '125+', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { label: 'Pass Rate', value: '98%', icon: Award, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Average Percentage', value: '95.2%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ]

  const departments = [
    { name: 'Science', students: 420, teachers: 32, passRate: 96 },
    { name: 'Mathematics', students: 380, teachers: 28, passRate: 94 },
    { name: 'English', students: 350, teachers: 25, passRate: 97 },
    { name: 'History', students: 300, teachers: 22, passRate: 95 },
    { name: 'Commerce', students: 250, teachers: 18, passRate: 93 },
    { name: 'Arts', students: 200, teachers: 15, passRate: 92 },
  ]

  const classData = [
    { class: '10A', students: 45, avgPercentage: 96, attendance: 94 },
    { class: '10B', students: 42, avgPercentage: 95, attendance: 92 },
    { class: '10C', students: 48, avgPercentage: 93, attendance: 90 },
    { class: '11A', students: 40, avgPercentage: 97, attendance: 95 },
    { class: '11B', students: 43, avgPercentage: 95, attendance: 93 },
  ]

  const filteredStudents = filterClass === 'All' 
    ? allStudents 
    : allStudents.filter(s => s.class === filterClass)

  const handleEditStudent = (student: typeof allStudents[0]) => {
    setSelectedStudent(student)
    setEditData({ marks: student.marks, attendance: student.attendance })
    setShowEditModal(true)
  }

  const handleSaveStudent = () => {
    if (selectedStudent) {
      setAllStudents(allStudents.map(s =>
        s.id === selectedStudent.id
          ? { ...s, marks: editData.marks, attendance: editData.attendance }
          : s
      ))
      setShowEditModal(false)
      setSelectedStudent(null)
    }
  }

  const getGradeColor = (marks: number) => {
    if (marks >= 90) return 'from-emerald-500 to-emerald-600'
    if (marks >= 80) return 'from-blue-500 to-blue-600'
    if (marks >= 70) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-slate-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 right-10 w-80 h-80 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Principal Dashboard</h1>
          <p className="text-blue-100 text-xl">Complete school overview and student management</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome, {user?.name}</h2>
          <p className="text-slate-600 text-lg">Here's an overview of your school's performance and key metrics.</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2`}>
                <Icon size={40} className="mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-semibold">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-2 flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 min-w-fit px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-slate-900 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <BarChart3 size={20} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 min-w-fit px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-slate-900 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Users size={20} />
              Students
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`flex-1 min-w-fit px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'departments'
                  ? 'bg-gradient-to-r from-slate-900 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <BookOpen size={20} />
              Departments
            </button>
<button
              onClick={() => setActiveTab('notices')}
              className={`flex-1 min-w-fit px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'notices'
                  ? 'bg-gradient-to-r from-slate-900 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Bell size={20} />
              Notices
            </button>
            <button
              onClick={() => setActiveTab('timetable')}
              className={`flex-1 min-w-fit px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'timetable'
                  ? 'bg-gradient-to-r from-slate-900 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <CalendarRange size={20} />
              Timetable
            </button>
          </div>

          {/* Content */}
          <div className="p-10 bg-gradient-to-b from-white to-slate-50">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-900">Class Performance Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classData.map((cls, idx) => (
                    <div key={idx} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all">
                      <h4 className="text-2xl font-bold text-slate-900 mb-6">{cls.class}</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="font-semibold text-slate-700">Students</span>
                          <span className="text-2xl font-bold text-blue-600">{cls.students}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                          <span className="font-semibold text-slate-700">Average Percentage</span>
                          <span className="text-2xl font-bold text-emerald-600">{cls.avgPercentage}%</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                          <span className="font-semibold text-slate-700">Attendance</span>
                          <span className="text-2xl font-bold text-orange-600">{cls.attendance}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">Manage All Students</h3>
                  <div className="flex items-center gap-3">
                    <Filter size={20} className="text-slate-600" />
                    <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="px-4 py-2 border-2 border-slate-300 rounded-lg font-bold focus:outline-none focus:border-blue-500"
                    >
                      <option>All</option>
                      <option>10A</option>
                      <option>10B</option>
                      <option>10C</option>
                      <option>11A</option>
                      <option>11B</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900">{student.name}</h4>
                          <p className="text-slate-600 text-sm mt-1">Class: {student.class} | ID: #{student.id}</p>
                        </div>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                        >
                          <Edit2 size={18} />
                          Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-slate-600 font-semibold mb-2">Marks</p>
                          <div className={`bg-gradient-to-r ${getGradeColor(student.marks)} text-white px-4 py-3 rounded-xl font-bold text-xl text-center`}>
                            {student.marks}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 font-semibold mb-2">Attendance</p>
                          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-3 rounded-xl font-bold text-xl text-center">
                            {student.attendance}%
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 font-semibold mb-2">Status</p>
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold text-center">
                            {student.status}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 font-semibold mb-2">Grade</p>
                          <div className={`bg-gradient-to-r ${getGradeColor(student.marks)} text-white px-4 py-3 rounded-xl font-bold text-center`}>
                            {student.marks >= 90 ? 'A' : student.marks >= 80 ? 'B' : student.marks >= 70 ? 'C' : 'D'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Departments Tab */}
            {activeTab === 'departments' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Department Overview</h3>
                <div className="grid grid-cols-1 gap-4">
                  {departments.map((dept, idx) => (
                    <div key={idx} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-bold text-slate-900">{dept.name}</h4>
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold">
                          {dept.passRate}% Pass
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <p className="text-sm text-slate-600 font-semibold">Students</p>
                          <p className="text-2xl font-bold text-blue-600 mt-2">{dept.students}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                          <p className="text-sm text-slate-600 font-semibold">Teachers</p>
                          <p className="text-2xl font-bold text-purple-600 mt-2">{dept.teachers}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <p className="text-sm text-slate-600 font-semibold">Ratio</p>
                          <p className="text-2xl font-bold text-orange-600 mt-2">{Math.round(dept.students / dept.teachers)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notices Tab */}
            {activeTab === 'notices' && (
              <div className="space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Notices & Announcements</h3>
                  <button
                    onClick={() => setShowNewNotice(true)}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Plus size={20} />
                    New Notice
                  </button>
                </div>

                {/* New Notice Form */}
                {showNewNotice && (
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-8 rounded-2xl border-2 border-purple-200 mb-8">
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Create New Notice</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={noticeData.title}
                          onChange={(e) => setNoticeData({...noticeData, title: e.target.value})}
                          placeholder="Enter notice title"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                        <textarea
                          value={noticeData.content}
                          onChange={(e) => setNoticeData({...noticeData, content: e.target.value})}
                          placeholder="Enter notice content"
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                        <select
                          value={noticeData.priority}
                          onChange={(e) => setNoticeData({...noticeData, priority: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                          onClick={handleAddNotice}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={20} />
                          Publish Notice
                        </button>
                        <button
                          onClick={() => {
                            setShowNewNotice(false)
                            setNoticeData({ title: '', content: '', priority: 'medium' })
                          }}
                          className="flex-1 bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-400 transition-all flex items-center justify-center gap-2"
                        >
                          <X size={20} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

{/* Notices List */}
                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="group bg-gradient-to-br from-white to-slate-50 p-4 sm:p-8 rounded-2xl border-2 border-slate-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <span className={`bg-gradient-to-r ${getPriorityColor(notice.priority)} text-white px-4 py-2 rounded-lg text-xs font-bold uppercase`}>
                              {notice.priority}
                            </span>
                            <span className="text-sm font-semibold text-slate-600">{notice.date}</span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 break-words">{notice.title}</h4>
                          <p className="text-slate-700 mb-3 leading-relaxed break-words">{notice.content}</p>
<p className="text-sm text-slate-600 inline-flex items-center gap-1.5"><Edit2 size={14} className="text-slate-500" /> By {notice.createdBy}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="text-red-500 hover:bg-red-50 p-3 rounded-lg transition shrink-0"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
</div>
              </div>
            )}

            {/* Timetable Tab */}
            {activeTab === 'timetable' && (
              <TimetableView
                entries={schoolTimetable}
                title="School-wide Timetable"
                subtitle="Weekly schedule overview across all classes • Academic Year 2025-2026"
              />
            )}
          </div>
        </div>

<Link href="/" className="inline-block mt-12 text-slate-900 hover:text-slate-700 font-semibold flex items-center gap-2 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          Back to Home
        </Link>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Update Student Data</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Student: {selectedStudent.name}</label>
                <p className="text-slate-600">Class: {selectedStudent.class}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Marks (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editData.marks}
                  onChange={(e) => setEditData({ ...editData, marks: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Attendance (0-100%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editData.attendance}
                  onChange={(e) => setEditData({ ...editData, attendance: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-lg"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStudent}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
              >
                <Save size={20} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function PrincipalPortal() {
  return (
    <ProtectedRoute allowedRoles={['principal']}>
      <PrincipalPortalContent />
    </ProtectedRoute>
  )
}
