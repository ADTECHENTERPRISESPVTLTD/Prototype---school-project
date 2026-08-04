'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { Users, BookOpen, BarChart3, Clock, Plus, CheckCircle, AlertCircle, X, Save, Bell, Trash2 } from 'lucide-react'
import Link from 'next/link'

function FacultyPortalContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('students')
  const [showNewNotice, setShowNewNotice] = useState(false)
  const [noticeData, setNoticeData] = useState({ title: '', content: '', priority: 'medium' })
  const [editingStudent, setEditingStudent] = useState<number | null>(null)
  const [editData, setEditData] = useState({ marks: 0, attendance: 0, subjectId: 0 })
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null)

  // Students with 5 subjects each
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Smith',
      class: '10A',
      subjects: [
        { id: 1, name: 'Mathematics', marks: 82, attendance: 94 },
        { id: 2, name: 'Physics', marks: 78, attendance: 90 },
        { id: 3, name: 'Chemistry', marks: 85, attendance: 92 },
        { id: 4, name: 'English', marks: 80, attendance: 88 },
        { id: 5, name: 'History', marks: 76, attendance: 86 },
      ]
    },
    {
      id: 2,
      name: 'Emma Wilson',
      class: '10A',
      subjects: [
        { id: 1, name: 'Mathematics', marks: 91, attendance: 98 },
        { id: 2, name: 'Physics', marks: 89, attendance: 96 },
        { id: 3, name: 'Chemistry', marks: 94, attendance: 97 },
        { id: 4, name: 'English', marks: 92, attendance: 95 },
        { id: 5, name: 'History', marks: 88, attendance: 94 },
      ]
    },
    {
      id: 3,
      name: 'Michael Brown',
      class: '10A',
      subjects: [
        { id: 1, name: 'Mathematics', marks: 78, attendance: 88 },
        { id: 2, name: 'Physics', marks: 75, attendance: 85 },
        { id: 3, name: 'Chemistry', marks: 80, attendance: 87 },
        { id: 4, name: 'English', marks: 77, attendance: 84 },
        { id: 5, name: 'History', marks: 79, attendance: 86 },
      ]
    },
    {
      id: 4,
      name: 'Sarah Davis',
      class: '10A',
      subjects: [
        { id: 1, name: 'Mathematics', marks: 85, attendance: 92 },
        { id: 2, name: 'Physics', marks: 83, attendance: 90 },
        { id: 3, name: 'Chemistry', marks: 87, attendance: 93 },
        { id: 4, name: 'English', marks: 84, attendance: 91 },
        { id: 5, name: 'History', marks: 82, attendance: 89 },
      ]
    },
    {
      id: 5,
      name: 'James Miller',
      class: '10A',
      subjects: [
        { id: 1, name: 'Mathematics', marks: 88, attendance: 96 },
        { id: 2, name: 'Physics', marks: 86, attendance: 94 },
        { id: 3, name: 'Chemistry', marks: 90, attendance: 95 },
        { id: 4, name: 'English', marks: 87, attendance: 92 },
        { id: 5, name: 'History', marks: 85, attendance: 91 },
      ]
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      class: '10A',
      subjects: [
        { id: 1, name: 'Mathematics', marks: 79, attendance: 90 },
        { id: 2, name: 'Physics', marks: 77, attendance: 88 },
        { id: 3, name: 'Chemistry', marks: 81, attendance: 89 },
        { id: 4, name: 'English', marks: 78, attendance: 87 },
        { id: 5, name: 'History', marks: 80, attendance: 88 },
      ]
    },
  ])

  const [notices, setNotices] = useState([
    { id: 1, title: 'Mid-Term Exam Schedule', content: 'Exams start from March 1st. All students must report 15 mins early.', priority: 'high', date: '2024-02-15', createdBy: 'Dr. Robert Anderson' },
    { id: 2, title: 'Lab Session Cancelled', content: 'Lab session on Friday is postponed to next week.', priority: 'medium', date: '2024-02-14', createdBy: 'Dr. Robert Anderson' },
  ])

  const subjectNames = ['Mathematics', 'Physics', 'Chemistry', 'English', 'History']

  const handleEditClick = (student: any, subject: any) => {
    setSelectedStudent(student)
    setSelectedSubject(subject)
    setEditData({ marks: subject.marks, attendance: subject.attendance, subjectId: subject.id })
    setShowModal(true)
  }

  const handleSaveChanges = () => {
    if (selectedStudent && selectedSubject) {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? {
              ...s,
              subjects: s.subjects.map(sub =>
                sub.id === selectedSubject.id
                  ? { ...sub, marks: editData.marks, attendance: editData.attendance }
                  : sub
              )
            }
          : s
      ))
      setShowModal(false)
      setSelectedStudent(null)
      setSelectedSubject(null)
    }
  }

  const handleAddNotice = () => {
    if (noticeData.title && noticeData.content) {
      const newNotice = {
        id: notices.length + 1,
        ...noticeData,
        date: new Date().toISOString().split('T')[0],
        createdBy: user?.name || 'Teacher'
      }
      setNotices([newNotice, ...notices])
      setNoticeData({ title: '', content: '', priority: 'medium' })
      setShowNewNotice(false)
    }
  }

  const handleDeleteNotice = (id: number) => {
    setNotices(notices.filter(n => n.id !== id))
  }

  const getGradeColor = (marks: number) => {
    if (marks >= 90) return 'from-slate-700 to-slate-800'
    if (marks >= 80) return 'from-slate-600 to-slate-700'
    if (marks >= 70) return 'from-slate-500 to-slate-600'
    return 'from-slate-400 to-slate-500'
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'from-slate-700 to-slate-800'
    if (priority === 'medium') return 'from-slate-600 to-slate-700'
    return 'from-slate-500 to-slate-600'
  }

  const avgMarks = Math.round(
    students.reduce((sum, s) => sum + s.subjects.reduce((subSum, sub) => subSum + sub.marks, 0) / s.subjects.length, 0) / students.length
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Header />

      {/* Hero Banner */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 right-10 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Welcome, Dr. Robert Anderson</h1>
          <p className="text-slate-300 text-xl">Manage your classes and communicate with students & parents</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Users size={36} className="mb-4 opacity-90" />
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wide">Total Students</p>
            <p className="text-5xl font-bold mt-3">{students.length}</p>
          </div>
          <div className="group relative bg-gradient-to-br from-slate-600 to-slate-700 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <BookOpen size={36} className="mb-4 opacity-90" />
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wide">Subjects</p>
            <p className="text-5xl font-bold mt-3">{subjectNames.length}</p>
          </div>
          <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <BarChart3 size={36} className="mb-4 opacity-90" />
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wide">Avg Score</p>
            <p className="text-5xl font-bold mt-3">{avgMarks}%</p>
          </div>
          <div className="group relative bg-gradient-to-br from-slate-600 to-slate-700 text-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Bell size={36} className="mb-4 opacity-90" />
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wide">Notices</p>
            <p className="text-5xl font-bold mt-3">{notices.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-8">
          <div className="flex border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 px-6 py-4 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Users size={20} />
              Students
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
            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-slate-900 mb-8">Manage Student Performance</h3>
                <div className="space-y-6">
                  {students.map((student) => (
                    <div key={student.id} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
                      {/* Student Header */}
                      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-2xl font-bold">{student.name}</h4>
                            <p className="text-slate-300">Class {student.class}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-300 text-sm">Average Score</p>
                            <p className="text-3xl font-bold">
                              {Math.round(student.subjects.reduce((sum, s) => sum + s.marks, 0) / student.subjects.length)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Subjects Grid */}
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {student.subjects.map((subject) => (
                          <div key={subject.id} className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-400 transition-all">
                            <h5 className="font-bold text-slate-900 mb-3">{subject.name}</h5>
                            
                            {/* Marks */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-600">Marks</span>
                                <span className={`bg-gradient-to-r ${getGradeColor(subject.marks)} text-white px-3 py-1 rounded-lg text-sm font-bold`}>
                                  {subject.marks}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-300 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-slate-700 to-slate-800 h-2 rounded-full" 
                                  style={{ width: `${subject.marks}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Attendance */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-600">Attendance</span>
                                <span className="text-sm font-bold text-slate-700">{subject.attendance}%</span>
                              </div>
                              <div className="w-full bg-slate-300 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-slate-600 to-slate-700 h-2 rounded-full" 
                                  style={{ width: `${subject.attendance}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Edit Button */}
                            <button
                              onClick={() => handleEditClick(student, subject)}
                              className="w-full bg-slate-700 hover:bg-slate-800 text-white px-3 py-2 rounded-lg font-bold transition-all text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notices Tab */}
            {activeTab === 'notices' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-bold text-slate-900">Notices & Announcements</h3>
                  <button
                    onClick={() => setShowNewNotice(true)}
                    className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                  >
                    <Plus size={20} />
                    New Notice
                  </button>
                </div>

                {/* New Notice Form */}
                {showNewNotice && (
                  <div className="bg-slate-100 p-8 rounded-2xl border-2 border-slate-300 mb-8">
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">Create New Notice</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={noticeData.title}
                          onChange={(e) => setNoticeData({...noticeData, title: e.target.value})}
                          placeholder="Enter notice title"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                        <textarea
                          value={noticeData.content}
                          onChange={(e) => setNoticeData({...noticeData, content: e.target.value})}
                          placeholder="Enter notice content"
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                        <select
                          value={noticeData.priority}
                          onChange={(e) => setNoticeData({...noticeData, priority: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:outline-none font-medium"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleAddNotice}
                          className="flex-1 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={20} />
                          Publish Notice
                        </button>
                        <button
                          onClick={() => {
                            setShowNewNotice(false)
                            setNoticeData({ title: '', content: '', priority: 'medium' })
                          }}
                          className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
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
                    <div key={notice.id} className="group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-400 hover:shadow-2xl transition-all duration-300">
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
                          <p className="text-sm text-slate-600">📝 By {notice.createdBy}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-3 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {showModal && selectedStudent && selectedSubject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Edit Student Performance</h3>
              
              <div className="bg-slate-100 p-4 rounded-xl mb-6 border-2 border-slate-200">
                <p className="text-sm text-slate-600 font-semibold mb-1">{selectedStudent.name}</p>
                <p className="text-xl font-bold text-slate-900">{selectedSubject.name}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Marks (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editData.marks}
                    onChange={(e) => setEditData({...editData, marks: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:outline-none font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Attendance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editData.attendance}
                    onChange={(e) => setEditData({...editData, attendance: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:outline-none font-bold text-lg"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedStudent(null)
                    setSelectedSubject(null)
                  }}
                  className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Link href="/" className="inline-block mt-12 ml-4 text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition">←</span> Back to Home
      </Link>
    </main>
  )
}

export default function FacultyPortal() {
  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <FacultyPortalContent />
    </ProtectedRoute>
  )
}
