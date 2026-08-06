'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock, CreditCard, AlertTriangle, Bell, X, Megaphone, ShieldCheck, Smartphone, Landmark, ArrowLeft, Check, Loader2 } from 'lucide-react'
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
    { name: 'Mathematics', grade: 'A', marks: 96 },
    { name: 'Physics', grade: 'A', marks: 95 },
    { name: 'Chemistry', grade: 'A+', marks: 98 },
    { name: 'English', grade: 'A', marks: 96 }
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
          <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <BookOpen className="w-6 h-6 sm:w-9 sm:h-9 mb-2 sm:mb-4 opacity-90" />
            <p className="text-blue-100 text-xs sm:text-sm font-bold uppercase tracking-wide">Courses</p>
            <p className="text-xl sm:text-3xl md:text-5xl font-bold mt-2 sm:mt-3 break-all">{courses.length}</p>
          </div>
          <div className="group relative bg-gradient-to-br from-slate-600 to-slate-700 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <CheckCircle className="w-6 h-6 sm:w-9 sm:h-9 mb-2 sm:mb-4 opacity-90" />
            <p className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wide">Avg Grade</p>
            <p className="text-xl sm:text-3xl md:text-5xl font-bold mt-2 sm:mt-3 break-all">A</p>
          </div>
          <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <TrendingUp className="w-6 h-6 sm:w-9 sm:h-9 mb-2 sm:mb-4 opacity-90" />
            <p className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wide">Attendance</p>
            <p className="text-xl sm:text-3xl md:text-5xl font-bold mt-2 sm:mt-3 break-all">{child.attendance}%</p>
          </div>
          <div className="group relative bg-gradient-to-br from-slate-600 to-slate-700 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <CreditCard className="w-6 h-6 sm:w-9 sm:h-9 mb-2 sm:mb-4 opacity-90" />
            <p className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wide">Pending Fees</p>
            <p className="text-lg sm:text-2xl md:text-4xl font-bold mt-2 sm:mt-3 break-all">₹{pendingFees.toLocaleString()}</p>
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
