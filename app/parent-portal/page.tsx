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

  const [selectedMonthToPay, setSelectedMonthToPay] = useState<any>(null)
  const [lastTxnId, setLastTxnId] = useState('')
  const [customAmount, setCustomAmount] = useState<string>('0')
  const [totalFees, setTotalFees] = useState(60000)
  const [paidFees, setPaidFees] = useState(10000)
  const pendingFees = totalFees - paidFees
  const paidPercentage = (paidFees / totalFees) * 100

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, month: 'January', amount: 5000, date: '2026-01-05', status: 'Paid', txnId: 'TXN2026010501' },
    { id: 2, month: 'February', amount: 5000, date: '2026-02-07', status: 'Paid', txnId: 'TXN2026020702' },
    { id: 3, month: 'March', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 4, month: 'April', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 5, month: 'May', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 6, month: 'June', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 7, month: 'July', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 8, month: 'August', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 9, month: 'September', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 10, month: 'October', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 11, month: 'November', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
    { id: 12, month: 'December', amount: 5000, date: 'Pending', status: 'Unpaid', txnId: '' },
  ])

  const downloadReceipt = (month: string, amount: number, customTxnId?: string) => {
    const txnId = customTxnId || `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`
    window.open(`/print-receipt?month=${encodeURIComponent(month)}&amount=${amount}&txnId=${encodeURIComponent(txnId)}`, '_blank')
  }

  const handlePaymentSuccess = () => {
    const generatedTxnId = `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`
    setLastTxnId(generatedTxnId)
    const todayStr = new Date().toISOString().split('T')[0]
    const amtPaid = Number(customAmount) || 0

    if (selectedMonthToPay) {
      setPaidFees(prev => prev + amtPaid)
      setPaymentHistory(prev => prev.map(item => {
        if (item.id === selectedMonthToPay.id) {
          return {
            ...item,
            amount: amtPaid,
            status: 'Paid',
            date: todayStr,
            txnId: generatedTxnId
          }
        }
        return item
      }))
    } else {
      setPaidFees(prev => prev + amtPaid)
      let remaining = amtPaid
      setPaymentHistory(prev => prev.map(item => {
        if (item.status === 'Unpaid' && remaining > 0) {
          const allocation = Math.min(item.amount, remaining)
          remaining -= allocation
          return {
            ...item,
            amount: allocation,
            status: 'Paid',
            date: todayStr,
            txnId: generatedTxnId
          }
        }
        return item
      }))
    }
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
                            window.open('/print-report', '_blank')
                          }}
                          className="flex-1 min-w-[150px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Printer size={18} /> Print Report
                        </button>
                        <button
                          onClick={() => {
                            window.open('/print-report', '_blank')
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
                        setSelectedMonthToPay(null);
                        setCustomAmount(pendingFees.toString());
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
                      <div 
                        key={payment.id} 
                        onClick={() => {
                          if (payment.status === 'Unpaid') {
                            setSelectedMonthToPay(payment)
                            setCustomAmount(payment.amount.toString())
                            setPaymentStep('select')
                            setShowPaymentModal(true)
                          }
                        }}
                        className={`bg-gradient-to-br from-white to-slate-50 p-5 rounded-2xl border-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                          payment.status === 'Unpaid'
                            ? 'border-red-200 hover:border-purple-300 hover:bg-purple-50/10 cursor-pointer hover:shadow-md'
                            : 'border-slate-200 hover:shadow-sm'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="font-bold text-slate-900 text-base sm:text-lg">{payment.month}</h5>
                            {payment.status === 'Unpaid' && (
                              <span className="text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                Click to Pay
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600">
                            ₹{payment.amount.toLocaleString()} 
                            {payment.status === 'Paid' ? ` • Paid on ${payment.date}` : ` • ${payment.date}`}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 sm:border-transparent">
                          {payment.status === 'Paid' ? (
                            <>
                              <span className="bg-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-lg font-bold text-xs sm:text-sm">
                                Paid
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  downloadReceipt(payment.month, payment.amount, payment.txnId)
                                }}
                                className="text-slate-500 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-xl border border-slate-200 hover:border-purple-200 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold ml-auto sm:ml-0"
                              >
                                <Download size={14} /> <span>Receipt</span>
                              </button>
                            </>
                          ) : (
                            <span className="bg-red-100 text-red-700 px-3.5 py-1.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1 ml-auto sm:ml-0">
                              <AlertCircle size={14} /> Unpaid
                            </span>
                          )}
                        </div>
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
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Modal Close Button for non-processing states */}
            {paymentStep !== 'processing' && (
              <button 
                onClick={() => {
                  setShowPaymentModal(false)
                  setSelectedMonthToPay(null)
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>
            )}

            {paymentStep === 'select' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Online Payment</h3>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-2xl mb-6 border-2 border-purple-200">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 block">Amount to Pay (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 font-extrabold text-2xl">₹</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border-2 border-purple-300 rounded-xl text-slate-900 font-extrabold text-2xl focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                  <div className="mt-3 pt-3 border-t border-purple-200/60 text-xs text-slate-700 space-y-1">
                    <p className="font-semibold text-purple-700">
                      {selectedMonthToPay ? `Fee Category: tuition fee - ${selectedMonthToPay.month} 2026` : 'Fee Category: All Pending Term Fees'}
                    </p>
                    <p className="text-slate-500">Student: {child.name} • Class: {child.class}</p>
                  </div>
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
                      <p className="font-bold text-slate-900 text-sm">Credit/Debit Card</p>
                      <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
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
                      <p className="font-bold text-slate-900 text-sm">UPI Payment</p>
                      <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
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
                      <p className="font-bold text-slate-900 text-sm">Bank Transfer</p>
                      <p className="text-xs text-slate-500">Direct NEFT/RTGS Transfer</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                  <p className="text-[11px] text-slate-700 inline-flex items-center gap-2"><ShieldCheck size={16} className="text-blue-600 flex-shrink-0" /> Secure Payment • 100% Safe • No Hidden Charges</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false)
                      setSelectedMonthToPay(null)
                    }}
                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setPaymentStep('qr')}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all text-sm w-full sm:w-auto"
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
                
                <div className="relative my-6 mx-auto w-56 h-56 bg-slate-950 rounded-2xl flex items-center justify-center border-4 border-slate-900 p-4 overflow-hidden shadow-2xl">
                  {/* Pulse scan line effect */}
                  <div className="absolute inset-x-0 h-1 bg-purple-500 opacity-60 top-4 shadow-[0_0_10px_#a855f7]"></div>
                  
                  <img 
                    src="/payment-qr.png" 
                    alt="PhonePe QR Code" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Amount to Pay</p>
                  <p className="text-3xl font-extrabold text-slate-900">₹{Number(customAmount).toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedMonthToPay ? `Merchant Ref: Tuition Fee - ${selectedMonthToPay.month}` : 'Merchant Ref: All Pending Term Fees'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setPaymentStep('select')}
                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200 text-sm w-full sm:w-auto"
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
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all text-sm w-full sm:w-auto"
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
                
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Transaction ID:</span> 
                    <span className="font-mono font-bold text-slate-900">{lastTxnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Paid Amount:</span> 
                    <span className="font-extrabold text-emerald-600">₹{Number(customAmount).toLocaleString()}.00</span>
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const monthName = selectedMonthToPay ? selectedMonthToPay.month : 'Outstanding Term Fees'
                      const amountVal = Number(customAmount) || 0
                      downloadReceipt(monthName, amountVal, lastTxnId)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
                  >
                    <Download size={16} /> Receipt
                  </button>
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setPaymentStep('select');
                      setSelectedMonthToPay(null);
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold border border-slate-200 transition-all text-sm w-full sm:w-auto"
                  >
                    Close
                  </button>
                </div>
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
