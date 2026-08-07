'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock, CreditCard, AlertTriangle, Bell, X, Megaphone, ShieldCheck, Smartphone, Landmark, ArrowLeft, Check, Loader2, Printer, Download, GraduationCap } from 'lucide-react'
import Link from 'next/link'

function ParentPortalContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState<'select' | 'qr' | 'processing' | 'success'>('select')
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'bank'>('upi')

  const child = {
    name: 'Alex Johnson',
    class: '10A',
    rollNo: '12',
    percentage: 96.25,
    attendance: 94,
  }

  const courses = [
    { name: 'Mathematics', grade: 'A', marks: 96, remarks: 'Excellent analytical and problem-solving skills.' },
    { name: 'Physics', grade: 'A', marks: 95, remarks: 'Outstanding comprehension of complex physics concepts.' },
    { name: 'Chemistry', grade: 'A+', marks: 98, remarks: 'Exceptional performance in laboratory work and exams.' },
    { name: 'English', grade: 'A', marks: 96, remarks: 'Strong essay writing and literature interpretation.' }
  ]

  const notices = [
    { id: 1, title: 'Mid-Term Exam Schedule', content: 'Exams start from March 1st. All students must report 15 mins early.', priority: 'high', date: '2024-02-15', createdBy: 'Principal' },
    { id: 2, title: 'Lab Session Cancelled', content: 'Lab session on Friday is postponed to next week.', priority: 'medium', date: '2024-02-14', createdBy: 'Dr. Anderson' },
    { id: 3, title: 'Annual Sports Day', content: 'Sports day on 25th March. Students should wear their house colors.', priority: 'low', date: '2024-02-10', createdBy: 'Sports Dept' },
  ]

  const [totalFees, setTotalFees] = useState(50000)
  const [paidFees, setPaidFees] = useState(10000)
  const pendingFees = totalFees - paidFees
  const paidPercentage = (paidFees / totalFees) * 100

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, month: 'January', amount: 5000, date: '2024-01-05', status: 'Paid' },
    { id: 2, month: 'February', amount: 5000, date: '2024-02-07', status: 'Paid' },
    { id: 3, month: 'March', amount: 5000, date: 'Pending', status: 'Pending' },
    { id: 4, month: 'April', amount: 5000, date: 'Pending', status: 'Pending' },
  ])

  const handlePaymentSuccess = () => {
    setPaidFees(totalFees)
    setPaymentHistory(prev => prev.map(item => ({
      ...item,
      status: 'Paid',
      date: item.date === 'Pending' ? new Date().toISOString().split('T')[0] : item.date
    })))
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
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Welcome, Mrs. Johnson</h1>
          <p className="text-blue-100 text-xl">Monitor {child.name}&apos;s academic progress and manage fees</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Child Info Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 mb-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Student Name</p>
              <p className="text-2xl font-bold text-slate-900">{child.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Class</p>
              <p className="text-2xl font-bold text-blue-600">{child.class}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Roll No.</p>
              <p className="text-2xl font-bold text-slate-900">{child.rollNo}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Percentage</p>
              <p className="text-2xl font-bold text-emerald-600">{child.percentage}%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-8">
          <div className="flex border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <BookOpen size={16} className="sm:w-5 sm:h-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reportcard')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'reportcard'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <CheckCircle size={16} className="sm:w-5 sm:h-5" />
              Report Card
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'fees'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <CreditCard size={16} className="sm:w-5 sm:h-5" />
              Fees
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'notices'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Bell size={16} className="sm:w-5 sm:h-5" />
              Notices
            </button>
          </div>

          {/* Content */}
          <div className="p-10 bg-gradient-to-b from-white to-slate-50">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Academic Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course, idx) => (
                    <div key={idx} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">{course.name}</h4>
                        </div>
                        <span className={`bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold`}>
                          {course.grade}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-600 mb-2">Marks</p>
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-slate-300 rounded-full h-4">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full" 
                              style={{ width: `${course.marks}%` }}
                            ></div>
                          </div>
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap">
                            {course.marks}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Report Card Tab */}
            {activeTab === 'reportcard' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg relative max-w-4xl mx-auto">
                  {/* School Header */}
                  <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/50 via-transparent to-transparent"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="bg-blue-600/20 p-3.5 rounded-2xl border border-blue-500/30">
                        <GraduationCap className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">EDUPRO HIGH SCHOOL</h2>
                        <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mt-0.5">Academic Performance Report Card</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right relative z-10">
                      <p className="text-sm font-bold text-blue-400">Academic Year: 2025-2026</p>
                      <p className="text-xs text-slate-400 mt-0.5">Term: Mid-Term Examination</p>
                    </div>
                  </div>

                  {/* Student Details Info Bar */}
                  <div className="bg-slate-50 border-b border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Student Name</p>
                      <p className="font-extrabold text-slate-800 text-base">{child.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Class / Section</p>
                      <p className="font-extrabold text-slate-800 text-base">{child.class}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Roll Number</p>
                      <p className="font-extrabold text-slate-800 text-base">{child.rollNo}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Student ID</p>
                      <p className="font-extrabold text-slate-800 text-base">STU2025-012</p>
                    </div>
                  </div>

                  {/* Subjects Grades Table (Tablet/Desktop) */}
                  <div className="hidden sm:block p-6 sm:p-8 overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200">
                          <th className="py-4 text-left font-bold text-slate-500 uppercase tracking-wider text-xs">Subject</th>
                          <th className="py-4 text-center font-bold text-slate-500 uppercase tracking-wider text-xs">Max Marks</th>
                          <th className="py-4 text-center font-bold text-slate-500 uppercase tracking-wider text-xs">Marks Obtained</th>
                          <th className="py-4 text-center font-bold text-slate-500 uppercase tracking-wider text-xs">Grade</th>
                          <th className="py-4 text-left font-bold text-slate-500 uppercase tracking-wider text-xs pl-6">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {courses.map((subj, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 font-bold text-slate-900">{subj.name}</td>
                            <td className="py-4 text-center text-slate-600 font-semibold">100</td>
                            <td className="py-4 text-center">
                              <span className="inline-flex items-center justify-center font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full text-sm">
                                {subj.marks}
                              </span>
                            </td>
                            <td className="py-4 text-center">
                              <span className={`inline-flex items-center justify-center font-extrabold text-white text-xs px-2.5 py-1 rounded-md shadow-sm bg-gradient-to-r ${
                                subj.grade === 'A+' ? 'from-emerald-500 to-emerald-600' :
                                subj.grade === 'A' ? 'from-green-500 to-green-600' :
                                subj.grade === 'A-' ? 'from-teal-500 to-teal-600' :
                                'from-blue-500 to-blue-600'
                              }`}>
                                {subj.grade}
                              </span>
                            </td>
                            <td className="py-4 text-slate-600 text-sm pl-6 italic">{subj.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Subjects Grades Cards (Mobile Only) */}
                  <div className="block sm:hidden p-4 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Subject Grades</h3>
                    <div className="space-y-4">
                      {courses.map((subj, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-3 animate-fadeIn">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{subj.name}</h4>
                            </div>
                            <span className={`inline-flex items-center justify-center font-extrabold text-white text-[10px] px-2.5 py-0.5 rounded shadow-sm bg-gradient-to-r ${
                              subj.grade === 'A+' ? 'from-emerald-500 to-emerald-600' :
                              subj.grade === 'A' ? 'from-green-500 to-green-600' :
                              subj.grade === 'A-' ? 'from-teal-500 to-teal-600' :
                              'from-blue-500 to-blue-600'
                            }`}>
                              {subj.grade}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 text-xs text-slate-700 font-semibold bg-white border border-slate-200/40 rounded-xl p-2.5">
                            <div>
                              <span className="text-slate-400 font-medium block text-[9px] uppercase tracking-wider">Score</span>
                              <span className="text-slate-900 font-bold">{subj.marks} <span className="text-slate-400 font-normal">/ 100</span></span>
                            </div>
                            <div className="h-6 w-[1px] bg-slate-200"></div>
                            <div>
                              <span className="text-slate-400 font-medium block text-[9px] uppercase tracking-wider">Status</span>
                              <span className="text-emerald-600 font-bold">Passed</span>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-slate-400 font-medium block text-[9px] uppercase tracking-wider mb-1">Remarks</span>
                            <p className="text-slate-600 text-xs italic bg-white border border-slate-200/40 rounded-xl p-3 leading-relaxed">
                              "{subj.remarks}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="border-t border-slate-200 bg-slate-50/50 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Performance Summary Indicators */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Performance Metrics</h3>
                      <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                          <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] mb-1 leading-normal">Cumulative Percentage</p>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-xl sm:text-2xl font-extrabold text-blue-600">{child.percentage}%</span>
                            <span className="text-slate-400 text-xs font-semibold">/ 100%</span>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                          <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] mb-1 leading-normal">Attendance Rate</p>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-xl sm:text-2xl font-extrabold text-emerald-600">{child.attendance}%</span>
                            <span className="text-slate-400 text-xs font-semibold">/ 100%</span>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                          <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] mb-1 leading-normal">Total Score</p>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-xl sm:text-2xl font-extrabold text-slate-800">
                              {courses.reduce((sum, c) => sum + (c.marks || 0), 0)}
                            </span>
                            <span className="text-slate-400 text-xs font-semibold">/ {courses.length * 100}</span>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col justify-center">
                          <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] mb-1 leading-normal">Result Status</p>
                          <span className="text-xs sm:text-base font-extrabold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Passed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* School Remarks & Seals */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Teacher Remarks</h3>
                        <p className="text-slate-600 text-sm italic leading-relaxed bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                          "Alex has consistently demonstrated academic excellence and active participation in class discussions. Keep up the high standards!"
                        </p>
                      </div>
                      
                      {/* Buttons to print / download */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                        <button
                          onClick={() => {
                            const printWindow = window.open('', '_blank')
                            if (!printWindow) return

                            const studentName = child.name
                            const className = child.class
                            const rollNo = child.rollNo
                            const attendance = child.attendance.toString()
                            const percentage = child.percentage.toString()
                            const totalObtained = courses.reduce((sum, c) => sum + (c.marks || 0), 0)
                            const totalMax = courses.length * 100
                            const remarks = 'Alex has consistently demonstrated academic excellence and active participation in class discussions. Keep up the high standards!'

                            const tableRows = courses.map(c => `
                              <tr>
                                <td style="font-weight: bold; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.name}</td>
                                <td style="text-align: center; padding: 12px 10px; border: 1px solid #cbd5e1;">100</td>
                                <td style="text-align: center; font-weight: bold; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.marks}</td>
                                <td style="text-align: center; font-weight: bold; color: #1e3a8a; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.grade}</td>
                                <td style="font-style: italic; color: #475569; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.remarks}</td>
                              </tr>
                            `).join('')

                            const htmlContent = `
                              <html>
                                <head>
                                  <title>Report Card - ${studentName}</title>
                                  <style>
                                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                                    body {
                                      font-family: 'Inter', sans-serif;
                                      color: #1e293b;
                                      padding: 40px;
                                      margin: 0;
                                      background-color: white;
                                    }
                                    .report-card {
                                      border: 4px double #1e3a8a;
                                      padding: 35px;
                                      border-radius: 12px;
                                      max-width: 850px;
                                      margin: 0 auto;
                                      position: relative;
                                      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                                    }
                                    .watermark {
                                      position: absolute;
                                      top: 50%;
                                      left: 50%;
                                      transform: translate(-50%, -50%) rotate(-30deg);
                                      font-size: 80px;
                                      color: rgba(30, 58, 138, 0.03);
                                      font-weight: 800;
                                      pointer-events: none;
                                      white-space: nowrap;
                                      z-index: 0;
                                    }
                                    .header {
                                      text-align: center;
                                      border-bottom: 3px double #e2e8f0;
                                      padding-bottom: 20px;
                                      margin-bottom: 25px;
                                    }
                                    .school-name {
                                      font-size: 32px;
                                      font-weight: 800;
                                      color: #1e3a8a;
                                      margin: 0;
                                      letter-spacing: 1.5px;
                                    }
                                    .school-subtitle {
                                      font-size: 13px;
                                      color: #64748b;
                                      margin: 6px 0 0 0;
                                      text-transform: uppercase;
                                      letter-spacing: 2px;
                                    }
                                    .title {
                                      font-size: 20px;
                                      font-weight: 800;
                                      margin: 20px 0 0 0;
                                      color: #0f172a;
                                      text-transform: uppercase;
                                      letter-spacing: 1.5px;
                                    }
                                    .info-grid {
                                      display: grid;
                                      grid-template-cols: 1fr 1fr;
                                      gap: 15px;
                                      margin-bottom: 30px;
                                      font-size: 14px;
                                    }
                                    .info-item {
                                      display: flex;
                                      border-bottom: 1px dashed #cbd5e1;
                                      padding-bottom: 5px;
                                    }
                                    .info-label {
                                      font-weight: 700;
                                      color: #475569;
                                      width: 140px;
                                    }
                                    .info-value {
                                      color: #0f172a;
                                      font-weight: 600;
                                    }
                                    table {
                                      width: 100%;
                                      border-collapse: collapse;
                                      margin-bottom: 30px;
                                      z-index: 1;
                                      position: relative;
                                    }
                                    th {
                                      background-color: #f8fafc;
                                      color: #1e3a8a;
                                      font-weight: 800;
                                      text-transform: uppercase;
                                      font-size: 12px;
                                      letter-spacing: 0.5px;
                                      border: 1px solid #cbd5e1;
                                      padding: 12px 10px;
                                      text-align: left;
                                    }
                                    .summary-section {
                                      display: grid;
                                      grid-template-cols: 1.2fr 1fr;
                                      gap: 20px;
                                      margin-bottom: 40px;
                                      border: 1px solid #cbd5e1;
                                      border-radius: 8px;
                                      padding: 20px;
                                      background-color: #f8fafc;
                                    }
                                    .summary-title {
                                      font-weight: 800;
                                      margin-bottom: 12px;
                                      font-size: 13px;
                                      color: #1e3a8a;
                                      text-transform: uppercase;
                                      letter-spacing: 0.5px;
                                    }
                                    .summary-row {
                                      display: flex;
                                      justify-content: space-between;
                                      margin-bottom: 8px;
                                      font-size: 14px;
                                      border-bottom: 1px solid #e2e8f0;
                                      padding-bottom: 4px;
                                    }
                                    .summary-row:last-child {
                                      border-bottom: none;
                                    }
                                    .remarks-box {
                                      font-style: italic;
                                      color: #334155;
                                      font-size: 13px;
                                      line-height: 1.6;
                                      background: white;
                                      padding: 12px;
                                      border-radius: 6px;
                                      border: 1px solid #e2e8f0;
                                    }
                                    .signatures {
                                      display: flex;
                                      justify-content: space-between;
                                      margin-top: 60px;
                                      padding-top: 20px;
                                    }
                                    .sig-block {
                                      text-align: center;
                                      width: 30%;
                                    }
                                    .sig-line {
                                      border-top: 1px solid #94a3b8;
                                      margin-bottom: 8px;
                                    }
                                    .sig-title {
                                      font-size: 12px;
                                      font-weight: 600;
                                      color: #64748b;
                                    }
                                    .sig-name {
                                      font-size: 13px;
                                      font-weight: 700;
                                      color: #1e293b;
                                    }
                                    @media print {
                                      body {
                                        padding: 0;
                                      }
                                      .report-card {
                                        border: 4px double #1e3a8a;
                                        box-shadow: none;
                                        page-break-inside: avoid;
                                      }
                                    }
                                  </style>
                                </head>
                                <body>
                                  <div class="report-card">
                                    <div class="watermark">EDUPRO HIGH</div>
                                    <div class="header">
                                      <h1 class="school-name">EDUPRO HIGH SCHOOL</h1>
                                      <p class="school-subtitle">100 Education Blvd, Science City • Tel: (555) 0199</p>
                                      <h2 class="title">Academic Performance Report Card</h2>
                                      <p style="margin: 6px 0 0 0; font-size: 12px; font-weight: 600; color: #475569;">ACADEMIC YEAR: 2025-2026 • TERM: MID-TERM</p>
                                    </div>
                                    
                                    <div class="info-grid">
                                      <div class="info-item">
                                        <span class="info-label">Student Name:</span>
                                        <span class="info-value">${studentName}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">Class / Section:</span>
                                        <span class="info-value">${className}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">Roll Number:</span>
                                        <span class="info-value">${rollNo}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">Student ID:</span>
                                        <span class="info-value">STU2025-${rollNo.padStart(3, '0')}</span>
                                      </div>
                                    </div>
                                    
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Subject Name</th>
                                          <th style="text-align: center; width: 100px;">Max Marks</th>
                                          <th style="text-align: center; width: 120px;">Marks Obtained</th>
                                          <th style="text-align: center; width: 80px;">Grade</th>
                                          <th>Remarks</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        ${tableRows}
                                      </tbody>
                                    </table>
                                    
                                    <div class="summary-section">
                                      <div>
                                        <div class="summary-title">Academic Summary</div>
                                        <div class="summary-row">
                                          <span>Total Marks Obtained:</span>
                                          <strong>${totalObtained} / ${totalMax}</strong>
                                        </div>
                                        <div class="summary-row">
                                          <span>Overall Percentage:</span>
                                          <strong>${percentage}%</strong>
                                        </div>
                                        <div class="summary-row">
                                          <span>Attendance Rate:</span>
                                          <strong>${attendance}%</strong>
                                        </div>
                                        <div class="summary-row">
                                          <span>Result Status:</span>
                                          <strong style="color: #10b981;">PASSED (PROMOTED)</strong>
                                        </div>
                                      </div>
                                      <div>
                                        <div class="summary-title">Class Teacher Remarks</div>
                                        <div class="remarks-box font-style: italic;">
                                          "${remarks}"
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div class="signatures">
                                      <div class="sig-block">
                                        <div class="sig-line" style="margin-top: 25px;"></div>
                                        <div class="sig-name">Dr. Sarah Johnson</div>
                                        <div class="sig-title">Class Teacher</div>
                                      </div>
                                      <div class="sig-block">
                                        <div class="sig-line" style="margin-top: 25px;"></div>
                                        <div class="sig-name">Dr. Arthur Pendelton</div>
                                        <div class="sig-title">Principal</div>
                                      </div>
                                      <div class="sig-block">
                                        <div class="sig-line" style="margin-top: 25px;"></div>
                                        <div class="sig-name"></div>
                                        <div class="sig-title">Parent Signature</div>
                                      </div>
                                    </div>
                                  </div>
                                  <script>
                                    window.onload = function() {
                                      window.print();
                                      setTimeout(function() {
                                        window.close();
                                      }, 500);
                                    }
                                  </script>
                                </body>
                              </html>
                            `

                            printWindow.document.open()
                            printWindow.document.write(htmlContent)
                            printWindow.document.close()
                          }}
                          className="flex-1 min-w-[150px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Printer size={18} /> Print Report
                        </button>
                        <button
                          onClick={() => {
                            const printWindow = window.open('', '_blank')
                            if (!printWindow) return

                            const studentName = child.name
                            const className = child.class
                            const rollNo = child.rollNo
                            const attendance = child.attendance.toString()
                            const percentage = child.percentage.toString()
                            const totalObtained = courses.reduce((sum, c) => sum + (c.marks || 0), 0)
                            const totalMax = courses.length * 100
                            const remarks = 'Alex has consistently demonstrated academic excellence and active participation in class discussions. Keep up the high standards!'

                            const tableRows = courses.map(c => `
                              <tr>
                                <td style="font-weight: bold; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.name}</td>
                                <td style="text-align: center; padding: 12px 10px; border: 1px solid #cbd5e1;">100</td>
                                <td style="text-align: center; font-weight: bold; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.marks}</td>
                                <td style="text-align: center; font-weight: bold; color: #1e3a8a; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.grade}</td>
                                <td style="font-style: italic; color: #475569; padding: 12px 10px; border: 1px solid #cbd5e1;">${c.remarks}</td>
                              </tr>
                            `).join('')

                            const htmlContent = `
                              <html>
                                <head>
                                  <title>Report Card - ${studentName}</title>
                                  <style>
                                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                                    body {
                                      font-family: 'Inter', sans-serif;
                                      color: #1e293b;
                                      padding: 40px;
                                      margin: 0;
                                      background-color: white;
                                    }
                                    .report-card {
                                      border: 4px double #1e3a8a;
                                      padding: 35px;
                                      border-radius: 12px;
                                      max-width: 850px;
                                      margin: 0 auto;
                                      position: relative;
                                      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                                    }
                                    .watermark {
                                      position: absolute;
                                      top: 50%;
                                      left: 50%;
                                      transform: translate(-50%, -50%) rotate(-30deg);
                                      font-size: 80px;
                                      color: rgba(30, 58, 138, 0.03);
                                      font-weight: 800;
                                      pointer-events: none;
                                      white-space: nowrap;
                                      z-index: 0;
                                    }
                                    .header {
                                      text-align: center;
                                      border-bottom: 3px double #e2e8f0;
                                      padding-bottom: 20px;
                                      margin-bottom: 25px;
                                    }
                                    .school-name {
                                      font-size: 32px;
                                      font-weight: 800;
                                      color: #1e3a8a;
                                      margin: 0;
                                      letter-spacing: 1.5px;
                                    }
                                    .school-subtitle {
                                      font-size: 13px;
                                      color: #64748b;
                                      margin: 6px 0 0 0;
                                      text-transform: uppercase;
                                      letter-spacing: 2px;
                                    }
                                    .title {
                                      font-size: 20px;
                                      font-weight: 800;
                                      margin: 20px 0 0 0;
                                      color: #0f172a;
                                      text-transform: uppercase;
                                      letter-spacing: 1.5px;
                                    }
                                    .info-grid {
                                      display: grid;
                                      grid-template-cols: 1fr 1fr;
                                      gap: 15px;
                                      margin-bottom: 30px;
                                      font-size: 14px;
                                    }
                                    .info-item {
                                      display: flex;
                                      border-bottom: 1px dashed #cbd5e1;
                                      padding-bottom: 5px;
                                    }
                                    .info-label {
                                      font-weight: 700;
                                      color: #475569;
                                      width: 140px;
                                    }
                                    .info-value {
                                      color: #0f172a;
                                      font-weight: 600;
                                    }
                                    table {
                                      width: 100%;
                                      border-collapse: collapse;
                                      margin-bottom: 30px;
                                      z-index: 1;
                                      position: relative;
                                    }
                                    th {
                                      background-color: #f8fafc;
                                      color: #1e3a8a;
                                      font-weight: 800;
                                      text-transform: uppercase;
                                      font-size: 12px;
                                      letter-spacing: 0.5px;
                                      border: 1px solid #cbd5e1;
                                      padding: 12px 10px;
                                      text-align: left;
                                    }
                                    .summary-section {
                                      display: grid;
                                      grid-template-cols: 1.2fr 1fr;
                                      gap: 20px;
                                      margin-bottom: 40px;
                                      border: 1px solid #cbd5e1;
                                      border-radius: 8px;
                                      padding: 20px;
                                      background-color: #f8fafc;
                                    }
                                    .summary-title {
                                      font-weight: 800;
                                      margin-bottom: 12px;
                                      font-size: 13px;
                                      color: #1e3a8a;
                                      text-transform: uppercase;
                                      letter-spacing: 0.5px;
                                    }
                                    .summary-row {
                                      display: flex;
                                      justify-content: space-between;
                                      margin-bottom: 8px;
                                      font-size: 14px;
                                      border-bottom: 1px solid #e2e8f0;
                                      padding-bottom: 4px;
                                    }
                                    .summary-row:last-child {
                                      border-bottom: none;
                                    }
                                    .remarks-box {
                                      font-style: italic;
                                      color: #334155;
                                      font-size: 13px;
                                      line-height: 1.6;
                                      background: white;
                                      padding: 12px;
                                      border-radius: 6px;
                                      border: 1px solid #e2e8f0;
                                    }
                                    .signatures {
                                      display: flex;
                                      justify-content: space-between;
                                      margin-top: 60px;
                                      padding-top: 20px;
                                    }
                                    .sig-block {
                                      text-align: center;
                                      width: 30%;
                                    }
                                    .sig-line {
                                      border-top: 1px solid #94a3b8;
                                      margin-bottom: 8px;
                                    }
                                    .sig-title {
                                      font-size: 12px;
                                      font-weight: 600;
                                      color: #64748b;
                                    }
                                    .sig-name {
                                      font-size: 13px;
                                      font-weight: 700;
                                      color: #1e293b;
                                    }
                                    @media print {
                                      body {
                                        padding: 0;
                                      }
                                      .report-card {
                                        border: 4px double #1e3a8a;
                                        box-shadow: none;
                                        page-break-inside: avoid;
                                      }
                                    }
                                  </style>
                                </head>
                                <body>
                                  <div class="report-card">
                                    <div class="watermark">EDUPRO HIGH</div>
                                    <div class="header">
                                      <h1 class="school-name">EDUPRO HIGH SCHOOL</h1>
                                      <p class="school-subtitle">100 Education Blvd, Science City • Tel: (555) 0199</p>
                                      <h2 class="title">Academic Performance Report Card</h2>
                                      <p style="margin: 6px 0 0 0; font-size: 12px; font-weight: 600; color: #475569;">ACADEMIC YEAR: 2025-2026 • TERM: MID-TERM</p>
                                    </div>
                                    
                                    <div class="info-grid">
                                      <div class="info-item">
                                        <span class="info-label">Student Name:</span>
                                        <span class="info-value">${studentName}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">Class / Section:</span>
                                        <span class="info-value">${className}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">Roll Number:</span>
                                        <span class="info-value">${rollNo}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">Student ID:</span>
                                        <span class="info-value">STU2025-${rollNo.padStart(3, '0')}</span>
                                      </div>
                                    </div>
                                    
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Subject Name</th>
                                          <th style="text-align: center; width: 100px;">Max Marks</th>
                                          <th style="text-align: center; width: 120px;">Marks Obtained</th>
                                          <th style="text-align: center; width: 80px;">Grade</th>
                                          <th>Remarks</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        ${tableRows}
                                      </tbody>
                                    </table>
                                    
                                    <div class="summary-section">
                                      <div>
                                        <div class="summary-title">Academic Summary</div>
                                        <div class="summary-row">
                                          <span>Total Marks Obtained:</span>
                                          <strong>${totalObtained} / ${totalMax}</strong>
                                        </div>
                                        <div class="summary-row">
                                          <span>Overall Percentage:</span>
                                          <strong>${percentage}%</strong>
                                        </div>
                                        <div class="summary-row">
                                          <span>Attendance Rate:</span>
                                          <strong>${attendance}%</strong>
                                        </div>
                                        <div class="summary-row">
                                          <span>Result Status:</span>
                                          <strong style="color: #10b981;">PASSED (PROMOTED)</strong>
                                        </div>
                                      </div>
                                      <div>
                                        <div class="summary-title">Class Teacher Remarks</div>
                                        <div class="remarks-box font-style: italic;">
                                          "${remarks}"
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div class="signatures">
                                      <div class="sig-block">
                                        <div class="sig-line" style="margin-top: 25px;"></div>
                                        <div class="sig-name">Dr. Sarah Johnson</div>
                                        <div class="sig-title">Class Teacher</div>
                                      </div>
                                      <div class="sig-block">
                                        <div class="sig-line" style="margin-top: 25px;"></div>
                                        <div class="sig-name">Dr. Arthur Pendelton</div>
                                        <div class="sig-title">Principal</div>
                                      </div>
                                      <div class="sig-block">
                                        <div class="sig-line" style="margin-top: 25px;"></div>
                                        <div class="sig-name"></div>
                                        <div class="sig-title">Parent Signature</div>
                                      </div>
                                    </div>
                                  </div>
                                  <script>
                                    window.onload = function() {
                                      window.print();
                                      setTimeout(function() {
                                        window.close();
                                      }, 500);
                                    }
                                  </script>
                                </body>
                              </html>
                            `
                            printWindow.document.open()
                            printWindow.document.write(htmlContent)
                            printWindow.document.close()
                          }}
                          className="flex-1 min-w-[150px] bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Download size={18} /> Save as PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fees Tab */}
            {activeTab === 'fees' && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Fees & Payments</h3>

                {/* Fees Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Total Fees */}
                  <div className="group bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border-2 border-blue-200">
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Total Fees</p>
                    <p className="text-4xl font-bold text-slate-900 mb-4">₹{totalFees.toLocaleString()}</p>
                    <div className="w-full bg-slate-300 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" 
                        style={{ width: `${paidPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">{Math.round(paidPercentage)}% Paid</p>
                  </div>

                  {/* Paid Fees */}
                  <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border-2 border-emerald-200">
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Paid Fees</p>
                    <p className="text-4xl font-bold text-emerald-600 mb-4">₹{paidFees.toLocaleString()}</p>
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>

                  {/* Pending Fees */}
                  <div className="group bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-2 border-red-200">
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Pending Fees</p>
                    <p className="text-4xl font-bold text-red-600 mb-4">₹{pendingFees.toLocaleString()}</p>
                    <AlertTriangle size={32} className="text-red-600" />
                  </div>
                </div>

                {/* Payment Button */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border-2 border-purple-200 text-center">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Pay Your Fees Online</h4>
                  <p className="text-slate-700 mb-6">Secure online payment with multiple payment methods</p>
                  <button
                    onClick={() => {
                      if (pendingFees > 0) {
                        setPaymentStep('select');
                        setShowPaymentModal(true);
                      }
                    }}
                    disabled={pendingFees === 0}
                    className={`px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto ${
                      pendingFees === 0 
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed transform hover:scale-100 hover:shadow-none' 
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    }`}
                  >
                    <CreditCard size={24} />
                    {pendingFees === 0 ? 'Fees Fully Paid' : `Pay ₹${pendingFees.toLocaleString()} Now`}
                  </button>
                </div>

                {/* Payment History */}
                <div className="mt-12">
                  <h4 className="text-2xl font-bold text-slate-900 mb-6">Payment History</h4>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border-2 border-slate-200 flex justify-between items-center hover:shadow-lg transition-all">
                        <div>
                          <p className="font-bold text-slate-900 text-lg">{payment.month}</p>
                          <p className="text-sm text-slate-600">₹{payment.amount.toLocaleString()} • {payment.date}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-lg font-bold text-sm ${
                          payment.status === 'Paid' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
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
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Modal Close Button for non-processing states */}
            {paymentStep !== 'processing' && (
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>
            )}

            {paymentStep === 'select' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Online Payment</h3>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6 border-2 border-purple-200">
                  <p className="text-sm text-slate-600 font-semibold mb-2">Amount to Pay</p>
                  <p className="text-4xl font-bold text-slate-900">₹{pendingFees.toLocaleString()}</p>
                  <p className="text-sm text-slate-600 mt-2">Student: {child.name} • Class: {child.class}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div 
                    onClick={() => setSelectedMethod('card')}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-purple-500 transition ${
                      selectedMethod === 'card' ? 'border-purple-500 bg-purple-50/30' : 'border-slate-200'
                    }`}
                  >
                    <CreditCard size={24} className="text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Credit/Debit Card</p>
                      <p className="text-sm text-slate-600">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setSelectedMethod('upi')}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-purple-500 transition ${
                      selectedMethod === 'upi' ? 'border-purple-500 bg-purple-50/30' : 'border-slate-200'
                    }`}
                  >
                    <Smartphone size={24} className="text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">UPI Payment</p>
                      <p className="text-sm text-slate-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setSelectedMethod('bank')}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-purple-500 transition ${
                      selectedMethod === 'bank' ? 'border-purple-500 bg-purple-50/30' : 'border-slate-200'
                    }`}
                  >
                    <Landmark size={24} className="text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Bank Transfer</p>
                      <p className="text-sm text-slate-600">Direct NEFT/RTGS Transfer</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                  <p className="text-sm text-slate-700 inline-flex items-center gap-2"><ShieldCheck size={16} className="text-blue-600 flex-shrink-0" /> Secure Payment • 100% Safe • No Hidden Charges</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setPaymentStep('qr')}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'qr' && (
              <div className="text-center animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Pay Here</h3>
                <p className="text-slate-500 text-sm">Scan the QR code below using any UPI app</p>
                
                <div className="relative my-6 mx-auto w-64 h-64 bg-slate-950 rounded-2xl flex items-center justify-center border-4 border-slate-900 p-4 overflow-hidden shadow-2xl">
                  {/* Pulse scan line effect */}
                  <div className="absolute inset-x-0 h-1 bg-purple-500 opacity-60 animate-pulse top-4 shadow-[0_0_10px_#a855f7]"></div>
                  
                  <img 
                    src="/payment-qr.png" 
                    alt="PhonePe QR Code" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Amount to Pay</p>
                  <p className="text-3xl font-extrabold text-slate-900">₹{pendingFees.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">Merchant: AD Tech School Portal</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setPaymentStep('select')}
                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setPaymentStep('processing');
                      setTimeout(() => {
                        handlePaymentSuccess();
                        setPaymentStep('success');
                      }, 2500);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    I Have Paid
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
                <Loader2 className="w-16 h-16 text-purple-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verifying Payment</h3>
                <p className="text-slate-600 text-sm max-w-xs">
                  Please wait while we verify your transaction with the bank. Do not close or refresh this window.
                </p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center animate-fadeIn">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-200 shadow-lg shadow-emerald-100/50">
                  <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Thank you. Your fee payment has been successfully recorded.
                </p>
                
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-left space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Transaction ID:</span> 
                    <span className="font-mono font-bold text-slate-900">TXN{Math.floor(1000000000 + Math.random() * 9000000000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Paid Amount:</span> 
                    <span className="font-extrabold text-emerald-600">₹{pendingFees.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Payment Mode:</span> 
                    <span>UPI / PhonePe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Date & Time:</span> 
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentStep('select');
                  }}
                  className="w-full bg-gradient-to-r from-emerald-50 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Close & Return
                </button>
              </div>
            )}
          </div>
        </div>
      )}

<Link href="/" className="inline-block mt-12 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group m-8">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
        Back to Home
      </Link>
    </main>
  )
}

export default function ParentPortal() {
  return (
    <ProtectedRoute allowedRoles={['parent']}>
      <ParentPortalContent />
    </ProtectedRoute>
  )
}
