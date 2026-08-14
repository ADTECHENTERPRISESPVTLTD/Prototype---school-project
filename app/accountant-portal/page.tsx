'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import { FileText, Download, Printer, TrendingUp, Calendar, DollarSign, ArrowLeft, User, Hash, IndianRupee, CreditCard, Eye, EyeOff, RotateCcw, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

interface StudentReceipt {
  id: string
  name: string
  utrNo: string
  feeAmount: number
  date: string
  paymentMethod: string
  status: 'Paid' | 'Pending' | 'Flagged' | 'Reversed'
}

interface RevenueData {
  week: number
  weeklyRevenue: number
  monthlyRevenue: number
  yearlyRevenue: number
}

interface RevenueStudentInfo {
  name: string
  className: string
  rollNo: string
}

export default function AccountantPortal() {
  // =========================
  // PROTOTYPE LOGIN
  // =========================
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginError('')

    if (
      email.trim().toLowerCase() === 'accountant@edupro.com' &&
      password === 'accountant123'
    ) {
      setIsLoggedIn(true)
    } else {
      setLoginError('Invalid email or password.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    setLoginError('')
  }

  const [activeTab, setActiveTab] = useState<'receipts' | 'revenue'>('receipts')
  const [receipts, setReceipts] = useState<StudentReceipt[]>([])
  const [hasLoadedReceipts, setHasLoadedReceipts] = useState(false)

  const [showReceiptsTable, setShowReceiptsTable] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    utrNo: '',
    feeAmount: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Bank Transfer',
  })

  const [previewReceipt, setPreviewReceipt] = useState<StudentReceipt | null>(null)
  const [hasGeneratedReceipt, setHasGeneratedReceipt] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [revenueStudentForm, setRevenueStudentForm] = useState<RevenueStudentInfo>({ name: '', className: '', rollNo: '' })
  const [selectedRevenueStudent, setSelectedRevenueStudent] = useState<RevenueStudentInfo | null>(null)

  const [revenueData] = useState<RevenueData[]>([
    { week: 1, weeklyRevenue: 50000, monthlyRevenue: 200000, yearlyRevenue: 2400000 },
    { week: 2, weeklyRevenue: 55000, monthlyRevenue: 210000, yearlyRevenue: 2520000 },
    { week: 3, weeklyRevenue: 48000, monthlyRevenue: 195000, yearlyRevenue: 2340000 },
    { week: 4, weeklyRevenue: 62000, monthlyRevenue: 225000, yearlyRevenue: 2700000 },
  ])

  useEffect(() => {
    const savedReceipts = window.localStorage.getItem('accountant-receipts')
    if (savedReceipts) {
      try {
        const parsedReceipts = JSON.parse(savedReceipts)
        if (Array.isArray(parsedReceipts)) setReceipts(parsedReceipts)
      } catch {
        window.localStorage.removeItem('accountant-receipts')
      }
    }
    setHasLoadedReceipts(true)
  }, [])

  useEffect(() => {
    if (hasLoadedReceipts) window.localStorage.setItem('accountant-receipts', JSON.stringify(receipts))
  }, [hasLoadedReceipts, receipts])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'utrNo' ? value.toUpperCase().replace(/\s/g, '') : value
    }))
    setFormErrors(prev => {
      const { [name]: _removedError, ...remainingErrors } = prev
      return remainingErrors
    })
  }

  const generateReceipt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors: Record<string, string> = {}
    const feeAmount = Number(formData.feeAmount)
    const utrNo = formData.utrNo.trim()

    if (!formData.name.trim()) errors.name = 'Enter the student’s full name.'
    if (!/^[A-Z0-9-]{6,30}$/.test(utrNo)) errors.utrNo = 'Enter a valid transaction ID (6–30 letters, numbers, or hyphens).'
    if (!Number.isFinite(feeAmount) || feeAmount <= 0) errors.feeAmount = 'Enter an amount greater than ₹0.'
    if (!formData.date) errors.date = 'Select the payment date.'
    if (!formData.paymentMethod) errors.paymentMethod = 'Select a payment method.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const newReceipt: StudentReceipt = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      utrNo,
      feeAmount,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      status: 'Paid',
    }

    setReceipts([newReceipt, ...receipts])
    setPreviewReceipt(newReceipt)
    setHasGeneratedReceipt(true)
    setFormErrors({})
    setFormData({
      name: '',
      utrNo: '',
      feeAmount: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Bank Transfer',
    })
  }

  const downloadReceipt = (receipt: StudentReceipt) => {
    const receiptHTML = generateReceiptHTML(receipt)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(receiptHTML))
    element.setAttribute('download', `Receipt_${receipt.utrNo}.html`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const printReceipt = (receipt: StudentReceipt) => {
    const receiptHTML = generateReceiptHTML(receipt)
    const printWindow = window.open('', '', 'height=500,width=800')
    if (printWindow) {
      printWindow.document.write(receiptHTML)
      printWindow.document.close()
      printWindow.print()
    }
  }

    const numberToWords = (num: number): string => {
      const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ']
      const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

      if ((num = num.toString()).length > 9) return 'overflow'
      const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)
      if (!n) return ''
      let str = ''
      str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : ''
      str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : ''
      str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : ''
      str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : ''
      str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : ''
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const generateReceiptHTML = (receipt: StudentReceipt): string => {
      const amountInWords = numberToWords(receipt.feeAmount)
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: 'Times New Roman', serif; color: #000; background: #fff; margin: 0; padding: 0; }
            .receipt-container { width: 100%; max-width: 190mm; margin: 0 auto; border: 2px solid #000; padding: 15mm; box-sizing: border-box; }
          
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; }
            .header p { margin: 5px 0; font-size: 14px; font-weight: bold; }
          
            .receipt-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
            .receipt-title h2 { margin: 0; font-size: 20px; text-decoration: underline; text-underline-offset: 5px; }
          
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; font-size: 16px; }
            .info-item { display: flex; gap: 10px; }
            .label { font-weight: bold; min-width: 120px; }
            .value { border-bottom: 1px dotted #000; flex-grow: 1; }

            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 1px solid #000; }
            th, td { border: 1px solid #000; padding: 12px; text-align: left; }
            th { background: #f0f0f0; font-weight: bold; text-transform: uppercase; font-size: 14px; }
          
            .total-row td { font-weight: bold; font-size: 18px; }
          
            .words-section { margin-bottom: 40px; font-size: 16px; font-style: italic; }
            .words-section span { text-decoration: underline; font-weight: bold; }

            .footer { display: flex; justify-content: space-between; margin-top: 80px; }
            .sig-box { text-align: center; width: 200px; }
            .sig-line { border-top: 1px solid #000; margin-bottom: 5px; }
            .sig-label { font-weight: bold; font-size: 14px; }

            .terms { font-size: 11px; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 10px; }
          
            @media print {
              body { background: #fff; padding: 0; }
              .receipt-container { border: 2px solid #000; margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <h1>EDUPRO HIGH SCHOOL</h1>
              <p>Knowledge Park II, City Centre, Pin - 400012</p>
              <p>Tel: +91 98765 43210 | Email: info@eduproschool.com</p>
            </div>

            <div class="receipt-title">
              <h2>FEE RECEIPT</h2>
              <div style="font-weight: bold;">Receipt No: #REC-${receipt.utrNo.substring(0, 8)}</div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="label">Student Name:</span>
                <span class="value">${receipt.name.toUpperCase()}</span>
              </div>
              <div class="info-item">
                <span class="label">Date:</span>
                <span class="value">${new Date(receipt.date).toLocaleDateString('en-IN')}</span>
              </div>
              <div class="info-item">
                <span class="label">Roll No / ID:</span>
                <span class="value">AD-2024/0${Math.floor(Math.random() * 900) + 100}</span>
              </div>
              <div class="info-item">
                <span class="label">Transaction ID:</span>
                <span class="value">${receipt.utrNo}</span>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width: 10%;">Sl. No</th>
                  <th style="width: 65%;">Particulars</th>
                  <th style="width: 25%; text-align: right;">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>School Fee / Tuition Fee (Monthly)</td>
                  <td style="text-align: right;">${receipt.feeAmount.toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Admission / Development Charges</td>
                  <td style="text-align: right;">0.00</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>Examination & Library Fee</td>
                  <td style="text-align: right;">0.00</td>
                </tr>
                <tr class="total-row">
                  <td colspan="2" style="text-align: right;">GRAND TOTAL:</td>
                  <td style="text-align: right;">₹${receipt.feeAmount.toLocaleString('en-IN')}.00</td>
                </tr>
              </tbody>
            </table>

            <div class="words-section">
              Amount in words: <span>${amountInWords}</span>
            </div>

            <div class="footer">
              <div class="sig-box">
                <div class="sig-line"></div>
                <div class="sig-label">Student/Parent Sign</div>
              </div>
              <div class="sig-box">
                <div class="sig-line"></div>
                <div class="sig-label">Authorized Signatory</div>
              </div>
            </div>

            <div class="terms">
              * Note: Fee once paid is non-refundable. This is an official computer generated receipt. 
              Payment subject to realization of funds.
            </div>
          </div>
        </body>
        </html>
      `
    }

  const calculateTotalRevenue = () => {
    return receipts.reduce((sum, receipt) => sum + receipt.feeAmount, 0)
  }

  const updateReceiptStatus = (id: string, status: StudentReceipt['status']) => {
    setReceipts((currentReceipts) => currentReceipts.map((receipt) => receipt.id === id ? { ...receipt, status } : receipt))
    setPreviewReceipt((currentReceipt) => currentReceipt?.id === id ? { ...currentReceipt, status } : currentReceipt)
  }

  const flagReceiptForReview = (receipt: StudentReceipt) => {
    if (receipt.status === 'Reversed') return
    if (window.confirm(`Flag receipt ${receipt.utrNo} as suspected fraud for review?`)) {
      updateReceiptStatus(receipt.id, 'Flagged')
    }
  }

  const reverseReceipt = (receipt: StudentReceipt) => {
    if (receipt.status === 'Reversed') return
    if (window.confirm(`Reverse payment of ₹${receipt.feeAmount.toLocaleString('en-IN')} for receipt ${receipt.utrNo}? This marks the receipt as reversed.`)) {
      updateReceiptStatus(receipt.id, 'Reversed')
    }
  }

  const getStatusClass = (status: StudentReceipt['status']) => {
    if (status === 'Reversed') return 'bg-gray-200 text-gray-800'
    if (status === 'Flagged') return 'bg-red-100 text-red-800'
    if (status === 'Pending') return 'bg-amber-100 text-amber-800'
    return 'bg-green-100 text-green-800'
  }

  const getRevenueOverview = () => {
    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)
    const totalSince = (startDate: Date) => receipts.reduce((total, receipt) => {
      const paymentDate = new Date(`${receipt.date}T00:00:00`)
      return paymentDate >= startDate && paymentDate <= now ? total + receipt.feeAmount : total
    }, 0)
    const totalForMonths = (months: number) => {
      const startDate = new Date(now)
      startDate.setMonth(startDate.getMonth() - months)
      return totalSince(startDate)
    }

    return [
      { label: "Today's Revenue", amount: totalSince(startOfToday), icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
      { label: '1 Month Revenue', amount: totalForMonths(1), icon: Calendar, color: 'from-emerald-500 to-green-500' },
      { label: '3 Month Revenue', amount: totalForMonths(3), icon: TrendingUp, color: 'from-violet-500 to-purple-500' },
      { label: '6 Month Revenue', amount: totalForMonths(6), icon: Calendar, color: 'from-orange-500 to-amber-500' },
      { label: '1 Year Revenue', amount: totalForMonths(12), icon: TrendingUp, color: 'from-pink-500 to-rose-500' },
    ]
  }

  const getStudentRevenue = (studentName: string) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setHours(0, 0, 0, 0)
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7))

    return receipts.reduce(
      (totals, receipt) => {
        if (receipt.name !== studentName) return totals

        const paymentDate = new Date(`${receipt.date}T00:00:00`)
        if (paymentDate >= startOfWeek && paymentDate <= today) totals.weekly += receipt.feeAmount
        if (paymentDate.getMonth() === today.getMonth() && paymentDate.getFullYear() === today.getFullYear()) totals.monthly += receipt.feeAmount
        if (paymentDate.getFullYear() === today.getFullYear()) totals.yearly += receipt.feeAmount
        return totals
      },
      { weekly: 0, monthly: 0, yearly: 0 }
    )
  }

  const getStudentRevenueRows = () => {
    return Array.from(new Set(receipts.map((receipt) => receipt.name))).map((name) => {
      const studentReceipts = receipts.filter((receipt) => receipt.name === name)
      return {
        name,
        latestReceipt: studentReceipts[0],
        paymentCount: studentReceipts.length,
        ...getStudentRevenue(name),
      }
    })
  }

  const getStudentRevenueTimeline = (studentName: string) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setHours(0, 0, 0, 0)
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7))
    const studentPayments = receipts.filter((receipt) => receipt.name.toLowerCase() === studentName.toLowerCase())
    const amountFor = (matches: (date: Date) => boolean) => studentPayments.reduce((total, receipt) => {
      const paymentDate = new Date(`${receipt.date}T00:00:00`)
      return matches(paymentDate) ? total + receipt.feeAmount : total
    }, 0)

    const weekly = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + index)
      return {
        label: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        amount: amountFor((paymentDate) => paymentDate.toDateString() === date.toDateString()),
      }
    })

    const monthly = Array.from({ length: Math.ceil(new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() / 7) }, (_, index) => {
      const startDay = index * 7 + 1
      const endDay = Math.min(startDay + 6, new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate())
      return {
        label: `Week ${index + 1}`,
        amount: amountFor((paymentDate) => paymentDate.getFullYear() === today.getFullYear() && paymentDate.getMonth() === today.getMonth() && paymentDate.getDate() >= startDay && paymentDate.getDate() <= endDay),
      }
    })

    const yearly = Array.from({ length: 12 }, (_, index) => ({
      label: new Date(today.getFullYear(), index, 1).toLocaleDateString('en-IN', { month: 'short' }),
      amount: amountFor((paymentDate) => paymentDate.getFullYear() === today.getFullYear() && paymentDate.getMonth() === index),
    }))

    return { weekly, monthly, yearly }
  }

  const submitRevenueStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!revenueStudentForm.name.trim() || !revenueStudentForm.className.trim() || !revenueStudentForm.rollNo.trim()) return
    setSelectedRevenueStudent({
      name: revenueStudentForm.name.trim(),
      className: revenueStudentForm.className.trim(),
      rollNo: revenueStudentForm.rollNo.trim(),
    })
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl text-white">₹</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Accountant Login</h1>
              <p className="text-gray-500 mt-2">Login to access the Accountant Portal</p>
            </div>

            {loginError && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter accountant email"
                  autoComplete="username"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 pr-20 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={21} />
                    ) : (
                      <Eye size={21} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg transition"
              >
                Login
              </button>
            </form>

            <div className="mt-7 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-900 mb-2">Prototype Login</p>
              <p className="text-sm text-blue-800">Email: accountant@edupro.com</p>
              <p className="text-sm text-blue-800">Password: accountant123</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            EduPro School Management System
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Accountant Portal</h1>
            <p className="text-gray-600 mt-2">Manage student receipts and revenue tracking</p>
          </div>
                    <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setShowReceiptsTable(!showReceiptsTable)
                setPreviewReceipt(null)
              }}
              className="flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              <FileText size={20} />
              {showReceiptsTable ? 'Hide Receipts' : 'View All Receipts'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <ArrowLeft size={20} />
              Back Home
            </Link>
          </div>
        </div>

                {showReceiptsTable ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg animate-fadeIn">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Issued Receipts</h2>
                <p className="mt-1 text-sm text-gray-600">Review and manage every receipt issued from this portal.</p>
              </div>
              <button 
                onClick={() => setShowReceiptsTable(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Close Table
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">UTR No.</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {receipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{receipt.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{receipt.utrNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-extrabold">₹{receipt.feeAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(receipt.status)}`}>
                          {receipt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setPreviewReceipt(receipt)
                              setShowReceiptsTable(false)
                            }}
                            className="text-slate-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition shadow-sm border border-gray-100"
                            title="View receipt details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => downloadReceipt(receipt)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition shadow-sm border border-gray-100"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => printReceipt(receipt)}
                            className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition shadow-sm border border-gray-100"
                            title="Print"
                          >
                            <Printer size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {receipts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-500">
                          <FileText size={48} className="text-gray-300" />
                          <p className="text-lg font-medium">No receipts have been issued yet.</p>
                          <button 
                            onClick={() => setShowReceiptsTable(false)}
                            className="text-blue-600 font-bold hover:underline"
                          >
                            Generate your first receipt
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
                ) : previewReceipt ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">✅ Receipt Generated Successfully!</h2>
              <button
                onClick={() => setPreviewReceipt(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

                        {/* Receipt Preview */}
            <div className="max-w-3xl mx-auto bg-white border-2 border-black p-12 mb-12 shadow-xl animate-fadeIn font-serif text-black">
              <div className="text-center border-b-2 border-black pb-4 mb-8">
                <h3 className="text-3xl font-bold tracking-widest uppercase">EDUPRO HIGH SCHOOL</h3>
                <p className="text-sm font-bold mt-1">Knowledge Park II, City Centre, Pin - 400012</p>
                <p className="text-xs font-bold mt-1">Tel: +91 98765 43210 | Email: info@eduproschool.com</p>
              </div>

              <div className="flex justify-between items-center mb-10">
                <h4 className="text-xl font-bold underline underline-offset-8">FEE RECEIPT</h4>
                <div className="text-sm font-bold">Receipt No: <span className="border-b border-black font-mono">#REC-{previewReceipt.utrNo.substring(0, 8)}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-10 text-base">
                <div className="flex gap-2">
                  <span className="font-bold whitespace-nowrap">Student Name:</span>
                  <span className="border-b border-black w-full uppercase font-bold">{previewReceipt.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold whitespace-nowrap">Date:</span>
                  <span className="border-b border-black w-full font-bold">{new Date(previewReceipt.date).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold whitespace-nowrap">ID / Roll No:</span>
                  <span className="border-b border-black w-full font-bold">AD-2024/0254</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold whitespace-nowrap">Transaction ID:</span>
                  <span className="border-b border-black w-full font-bold font-mono">{previewReceipt.utrNo}</span>
                </div>
              </div>

              <div className="mb-10">
                <table className="w-full border-collapse border border-black">
                  <thead>
                    <tr className="bg-gray-100 font-bold uppercase text-xs">
                      <th className="border border-black p-3 text-left w-16">Sl. No</th>
                      <th className="border border-black p-3 text-left">Particulars</th>
                      <th className="border border-black p-3 text-right w-32">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    <tr>
                      <td className="border border-black p-4 text-center">1.</td>
                      <td className="border border-black p-4">Monthly Tuition Fee / Academic Charges</td>
                      <td className="border border-black p-4 text-right">{previewReceipt.feeAmount.toLocaleString('en-IN')}.00</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-4 text-center">2.</td>
                      <td className="border border-black p-4">Development & Activity Fee</td>
                      <td className="border border-black p-4 text-right">0.00</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-4 text-center">3.</td>
                      <td className="border border-black p-4">Examination Fee</td>
                      <td className="border border-black p-4 text-right">0.00</td>
                    </tr>
                    <tr className="font-bold text-base">
                      <td colSpan={2} className="border border-black p-4 text-right uppercase tracking-wider">Grand Total:</td>
                      <td className="border border-black p-4 text-right tabular-nums">₹{previewReceipt.feeAmount.toLocaleString('en-IN')}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-16 italic text-sm font-bold">
                Amount in Words: <span className="underline ml-2 uppercase">{numberToWords(previewReceipt.feeAmount)}</span>
              </div>

              <div className="flex justify-between items-end mt-20 px-4">
                <div className="text-center w-48">
                  <div className="border-t border-black mb-1"></div>
                  <p className="text-xs font-bold uppercase">Student/Parent Sign</p>
                </div>
                <div className="text-center w-48">
                  <div className="border-t border-black mb-1"></div>
                  <p className="text-xs font-bold uppercase">Authorized Signatory</p>
                </div>
              </div>

              <div className="mt-12 text-[10px] text-gray-500 border-t border-gray-100 pt-4 leading-tight italic">
                * This is a computer generated official fee receipt. The fee once paid is non-refundable. 
                Valid subject to the realization of the payment in the school&apos;s bank account.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8 mb-8 flex-wrap">
              <button
                onClick={() => printReceipt(previewReceipt)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-lg font-semibold transition shadow-lg transform hover:scale-105"
              >
                <Printer size={20} />
                Print Receipt
              </button>
              <button
                onClick={() => downloadReceipt(previewReceipt)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition shadow-lg transform hover:scale-105"
              >
                <Download size={20} />
                Download Receipt
              </button>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => setPreviewReceipt(null)}
                className="text-blue-600 hover:text-blue-800 font-semibold underline"
              >
                ← Generate Another Receipt
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6 sticky top-24 z-40">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('receipts')}
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === 'receipts'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText size={20} />
                    Receipts & Payments
                  </div>
                </button>
                <button
                    onClick={() => setActiveTab('revenue')}
                    className={`flex-1 py-4 px-6 font-semibold transition ${
                      activeTab === 'revenue'
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp size={20} />
                      Revenue Report
                    </div>
                  </button>
          </div>
        </div>

        {/* Receipts Tab */}
        {activeTab === 'receipts' && !previewReceipt && (
          <div className="space-y-6">
            {/* Add Receipt Form */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Generate Student Receipt</h2>
              <p className="text-center text-sm text-gray-600 -mt-5 mb-6">Enter payment details below. Required fields are marked with *.</p>
              <form onSubmit={generateReceipt} noValidate className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <User size={18} aria-hidden="true" />
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter student full name"
                    autoComplete="name"
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                  {formErrors.name && <p id="name-error" className="mt-2 text-sm text-red-600">{formErrors.name}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Hash size={18} aria-hidden="true" />
                    UTR Number (Unique Transaction Reference) *
                  </label>
                  <input
                    type="text"
                    name="utrNo"
                    value={formData.utrNo}
                    onChange={handleInputChange}
                    placeholder="e.g., UTR20240815001"
                    maxLength={30}
                    autoCapitalize="characters"
                    spellCheck={false}
                    aria-invalid={Boolean(formErrors.utrNo)}
                    aria-describedby="utr-help utr-error"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                  <p id="utr-help" className="text-xs text-gray-600 mt-2">Use the bank/UPI reference or receipt number. Spaces are removed automatically.</p>
                  {formErrors.utrNo && <p id="utr-error" className="mt-2 text-sm text-red-600">{formErrors.utrNo}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <IndianRupee size={18} aria-hidden="true" />
                    Fee Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="feeAmount"
                    value={formData.feeAmount}
                    onChange={handleInputChange}
                    placeholder="e.g., 5000"
                    min="1"
                    step="0.01"
                    inputMode="decimal"
                    aria-invalid={Boolean(formErrors.feeAmount)}
                    aria-describedby={formErrors.feeAmount ? 'amount-error' : undefined}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition"
                  />
                  {formErrors.feeAmount && <p id="amount-error" className="mt-2 text-sm text-red-600">{formErrors.feeAmount}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Calendar size={18} aria-hidden="true" />
                    Payment Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]}
                      aria-invalid={Boolean(formErrors.date)}
                      aria-describedby={formErrors.date ? 'date-error' : undefined}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg text-gray-900 [color-scheme:light] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition"
                    />
                    <Calendar size={21} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-900" />
                  </div>
                  {formErrors.date && <p id="date-error" className="mt-2 text-sm text-red-600">{formErrors.date}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <CreditCard size={18} aria-hidden="true" />
                    Payment Method *
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(formErrors.paymentMethod)}
                    aria-describedby={formErrors.paymentMethod ? 'method-error' : undefined}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition"
                  >
                    <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                    <option value="Online">Online Payment (Google Pay, PhonePe, Paytm, UPI)</option>
                    <option value="Cash">Cash Payment (Direct)</option>
                    <option value="Cheque">Cheque Payment</option>
                  </select>
                  {formErrors.paymentMethod && <p id="method-error" className="mt-2 text-sm text-red-600">{formErrors.paymentMethod}</p>}
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full md:w-96 mx-auto block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-lg font-bold text-lg shadow-lg transition transform hover:scale-105"
              >
                Generate Receipt
              </button>
              </form>
            </div>

            <div className="hidden" aria-hidden="true">
            {/* Receipt Preview */}
            {previewReceipt && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Receipt Preview</h2>
                  <button
                    onClick={() => setPreviewReceipt(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Receipt */}
                <div className="max-w-2xl mx-auto bg-white border-2 border-gray-900 p-8 mb-8" id="receipt-preview">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">FEE RECEIPT</h1>
                    <p className="text-gray-600 mt-1">EduPro School Management System</p>
                    <p className="text-xs text-gray-500 mt-1">Receipt No. {previewReceipt.utrNo}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b-2 border-gray-900">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Receipt Number</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{previewReceipt.utrNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-700">Date</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{previewReceipt.date}</p>
                    </div>
                  </div>

                  <div className="mb-8 pb-8 border-b-2 border-gray-900">
                    <p className="text-sm font-semibold text-gray-700">Student Name</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{previewReceipt.name}</p>
                  </div>

                  <div className="mb-8">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-900">
                          <th className="text-left py-3 text-sm font-semibold text-gray-700">Description</th>
                          <th className="text-right py-3 text-sm font-semibold text-gray-700">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="py-4 text-gray-900">School Fee (Tuition)</td>
                          <td className="text-right py-4 font-semibold text-gray-900">₹{previewReceipt.feeAmount.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mb-8 pb-8 border-b-2 border-gray-900">
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">Total Amount Due</p>
                      <p className="text-3xl font-bold text-gray-900">₹{previewReceipt.feeAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mt-8">
                    <div>
                      <p className="text-xs text-gray-600 mb-16">Received By</p>
                      <p className="text-sm font-semibold text-gray-900 border-t-2 border-gray-900 pt-2">_________________</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-16">Authorized By</p>
                      <p className="text-sm font-semibold text-gray-900 border-t-2 border-gray-900 pt-2">_________________</p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded text-xs text-gray-600 border border-blue-200">
                    <p className="mb-1"><strong>Payment Method:</strong> {previewReceipt.paymentMethod}</p>
                    <p className="mb-1"><strong>Status:</strong> <span className="text-green-600 font-semibold">{previewReceipt.status}</span></p>
                    <p className="text-gray-500">This is a computer-generated receipt and is valid without a signature.</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center mt-8">
                  <button
                    onClick={() => printReceipt(previewReceipt)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-lg font-semibold transition shadow-lg"
                  >
                    <Printer size={20} />
                    Print Receipt
                  </button>
                  <button
                    onClick={() => downloadReceipt(previewReceipt)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition shadow-lg"
                  >
                    <Download size={20} />
                    Download Receipt
                  </button>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Receipts</p>
                    <p className="text-3xl font-bold mt-2">{receipts.length}</p>
                  </div>
                  <FileText size={40} className="opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Revenue</p>
                    <p className="text-3xl font-bold mt-2">₹{calculateTotalRevenue().toLocaleString()}</p>
                  </div>
                  <DollarSign size={40} className="opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Avg. Per Receipt</p>
                    <p className="text-3xl font-bold mt-2">
                      ₹{receipts.length > 0 ? Math.round(calculateTotalRevenue() / receipts.length).toLocaleString() : '0'}
                    </p>
                  </div>
                  <Calendar size={40} className="opacity-50" />
                </div>
              </div>
            </div>

            {/* Receipts List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Issued Receipts</h2>
                <p className="mt-1 text-sm text-gray-600">Review every issued receipt and flag or reverse suspicious payments.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">UTR No.</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {receipts.map((receipt) => (
                      <tr key={receipt.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{receipt.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{receipt.utrNo}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">₹{receipt.feeAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{receipt.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{receipt.paymentMethod}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(receipt.status)}`}>
                            {receipt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setPreviewReceipt(receipt)}
                              className="text-slate-600 hover:text-slate-800 p-2 hover:bg-slate-100 rounded transition"
                              title="Review receipt"
                              aria-label={`Review receipt ${receipt.utrNo}`}
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => downloadReceipt(receipt)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                              title="Download"
                            >
                              <Download size={18} />
                            </button>
                            <button
                              onClick={() => printReceipt(receipt)}
                              className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded transition"
                              title="Print"
                            >
                              <Printer size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {receipts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">No receipts have been issued yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Revenue Overview</h2>
              <p className="mt-1 text-sm text-gray-600">Fee collection across all students by period.</p>
              <div className="mt-8 flex h-80 items-end gap-3 border-b border-l border-gray-200 px-4 pt-8 sm:gap-6">
                {(() => {
                  const overview = getRevenueOverview()
                  const maximumAmount = Math.max(...overview.map((item) => item.amount), 1)
                  return overview.map(({ label, amount }) => (
                    <div key={label} className="flex h-full flex-1 flex-col items-center justify-end gap-2 text-center">
                      <span className="text-xs font-semibold text-gray-700 sm:text-sm">₹{amount.toLocaleString('en-IN')}</span>
                      <div
                        className="w-full max-w-20 rounded-t-lg bg-gradient-to-t from-emerald-600 to-green-400 transition-all"
                        style={{ height: `${Math.max((amount / maximumAmount) * 100, amount > 0 ? 6 : 1)}%` }}
                        title={`${label}: ₹${amount.toLocaleString('en-IN')}`}
                      />
                      <span className="min-h-10 text-xs font-medium leading-4 text-gray-600 sm:text-sm">{label}</span>
                    </div>
                  ))
                })()}
              </div>
            </div>

            <div className="hidden bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 text-center">View Student Revenue</h2>
              <p className="text-center text-sm text-gray-600 mt-2 mb-6">Enter the student's details to view their fee revenue.</p>
              <form onSubmit={submitRevenueStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={revenueStudentForm.name}
                  onChange={(e) => setRevenueStudentForm((current) => ({ ...current, name: e.target.value }))}
                  placeholder="Student name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <input
                  type="text"
                  value={revenueStudentForm.className}
                  onChange={(e) => setRevenueStudentForm((current) => ({ ...current, className: e.target.value }))}
                  placeholder="Class (e.g. 10-A)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <input
                  type="text"
                  value={revenueStudentForm.rollNo}
                  onChange={(e) => setRevenueStudentForm((current) => ({ ...current, rollNo: e.target.value }))}
                  placeholder="Roll number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <button type="submit" className="md:col-span-3 md:w-72 justify-self-center w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-bold transition">Show Revenue</button>
              </form>
            </div>

            {selectedRevenueStudent && (receipts.length === 0 || !getStudentRevenueRows().some((student) => student.name.toLowerCase() === selectedRevenueStudent.name.toLowerCase()) ? (
              <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
                <TrendingUp size={42} className="mx-auto text-green-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">No payment data found</h2>
                <p className="text-gray-600 mt-2">Enter payment details for {selectedRevenueStudent.name} in Receipts & Payments to view their revenue here.</p>
              </div>
            ) : (
              <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <p className="text-sm opacity-90">Student</p>
                <p className="text-2xl font-bold mt-2">{selectedRevenueStudent.name}</p>
                <p className="text-sm mt-1 opacity-90">Class {selectedRevenueStudent.className} · Roll {selectedRevenueStudent.rollNo}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-lg">
                <p className="text-sm opacity-90">Monthly Revenue</p>
                <p className="text-3xl font-bold mt-2">₹{calculateTotalRevenue().toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-lg">
                <p className="text-sm opacity-90">Yearly Revenue</p>
                <p className="text-3xl font-bold mt-2">₹{Math.round(calculateTotalRevenue() / receipts.length).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900">Student Revenue Graph</h2>
              <p className="text-sm text-gray-600 mt-1 mb-6">Weekly, monthly and yearly fee collection for {selectedRevenueStudent.name}.</p>
              <div className="hidden">
              <div className="space-y-6">
                {getStudentRevenueRows().filter((student) => student.name.toLowerCase() === selectedRevenueStudent.name.toLowerCase()).map((student) => {
                  const maximumRevenue = Math.max(student.weekly, student.monthly, student.yearly, 1)
                  return (
                    <div key={student.name} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                      <p className="font-semibold text-gray-900 mb-3">{student.name}</p>
                      {([
                        ['Weekly', student.weekly, 'bg-blue-500'],
                        ['Monthly', student.monthly, 'bg-green-500'],
                        ['Yearly', student.yearly, 'bg-purple-500'],
                      ] as const).map(([label, amount, color]) => (
                        <div key={label} className="flex items-center gap-3 mb-2">
                          <span className="w-16 text-sm text-gray-600">{label}</span>
                          <div className="flex-1 h-7 overflow-hidden rounded-full bg-gray-100">
                            <div className={`${color} h-full min-w-1 flex items-center justify-end px-3 text-xs font-semibold text-white transition-all`} style={{ width: `${Math.max((amount / maximumRevenue) * 100, amount > 0 ? 8 : 0)}%` }} />
                          </div>
                          <span className="w-28 text-right text-sm font-semibold text-gray-900">₹{amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
              </div>
              <div className="space-y-8">
                {(['weekly', 'monthly', 'yearly'] as const).map((period) => {
                  const timeline = getStudentRevenueTimeline(selectedRevenueStudent.name)[period]
                  const maximumAmount = Math.max(...timeline.map((item) => item.amount), 1)
                  const titles = { weekly: 'Weekly Revenue (Day-wise)', monthly: 'Monthly Revenue (Week-wise)', yearly: 'Yearly Revenue (Month-wise)' }
                  const colors = { weekly: 'bg-blue-500', monthly: 'bg-green-500', yearly: 'bg-purple-500' }
                  return (
                    <div key={period}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{titles[period]}</h3>
                      <div className="flex h-56 items-end gap-2 border-b border-l border-gray-200 px-3 pt-5">
                        {timeline.map((item) => (
                          <div key={item.label} className="flex h-full flex-1 flex-col justify-end items-center min-w-0 group">
                            <span className="mb-2 text-xs font-semibold text-gray-700 whitespace-nowrap">₹{item.amount.toLocaleString()}</span>
                            <div className={`${colors[period]} w-full max-w-10 min-h-1 rounded-t transition-all`} style={{ height: `${Math.max((item.amount / maximumAmount) * 100, item.amount > 0 ? 5 : 1)}%` }} title={`${item.label}: ₹${item.amount.toLocaleString()}`} />
                            <span className="mt-2 text-xs text-gray-600">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{selectedRevenueStudent.name}'s Revenue</h2>
                <p className="text-sm text-gray-600 mt-1">Class {selectedRevenueStudent.className} · Roll No. {selectedRevenueStudent.rollNo}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">UTR / Transaction No.</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Payment Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Payment Method</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Weekly Revenue</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Monthly Revenue</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Yearly Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getStudentRevenueRows().filter((student) => student.name.toLowerCase() === selectedRevenueStudent.name.toLowerCase()).map((student) => {
                      return (
                        <tr key={student.name} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}<span className="block text-xs font-normal text-gray-500 mt-1">{student.paymentCount} payment{student.paymentCount > 1 ? 's' : ''}</span></td>
                          <td className="px-6 py-4 text-sm text-gray-700">{student.latestReceipt.utrNo}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{student.latestReceipt.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{student.latestReceipt.paymentMethod}</td>
                          <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">₹{student.weekly.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">₹{student.monthly.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">₹{student.yearly.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="hidden">
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Current Week Revenue</p>
                    <p className="text-3xl font-bold mt-2">₹{revenueData[revenueData.length - 1].weeklyRevenue.toLocaleString()}</p>
                  </div>
                  <Calendar size={40} className="opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Current Month Revenue</p>
                    <p className="text-3xl font-bold mt-2">₹{revenueData[revenueData.length - 1].monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <Calendar size={40} className="opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Yearly Revenue</p>
                    <p className="text-3xl font-bold mt-2">₹{revenueData[revenueData.length - 1].yearlyRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp size={40} className="opacity-50" />
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
              <div className="space-y-6">
                {/* Weekly Revenue */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Revenue</h3>
                  <div className="space-y-3">
                    {revenueData.map((data) => (
                      <div key={`weekly-${data.week}`} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium text-gray-700">Week {data.week}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full flex items-center justify-end pr-4 text-white text-sm font-semibold"
                            style={{ width: `${(data.weeklyRevenue / 62000) * 100}%` }}
                          >
                            ₹{data.weeklyRevenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Revenue */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
                  <div className="space-y-3">
                    {revenueData.map((data) => (
                      <div key={`monthly-${data.week}`} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium text-gray-700">Month {data.week}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-400 h-full flex items-center justify-end pr-4 text-white text-sm font-semibold"
                            style={{ width: `${(data.monthlyRevenue / 225000) * 100}%` }}
                          >
                            ₹{data.monthlyRevenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yearly Revenue */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Yearly Revenue</h3>
                  <div className="space-y-3">
                    {revenueData.map((data) => (
                      <div key={`yearly-${data.week}`} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium text-gray-700">Year {data.week}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-400 h-full flex items-center justify-end pr-4 text-white text-sm font-semibold"
                            style={{ width: `${(data.yearlyRevenue / 2700000) * 100}%` }}
                          >
                            ₹{data.yearlyRevenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Summary Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Revenue Summary</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Period</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Weekly</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Monthly</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Yearly</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {revenueData.map((data, index) => (
                      <tr key={data.week} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {index === 0 ? 'Week 1' : index === 1 ? 'Week 2' : index === 2 ? 'Week 3' : 'Week 4'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          ₹{data.weeklyRevenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          ₹{data.monthlyRevenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          ₹{data.yearlyRevenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {index === 0 ? (
                            <span className="text-gray-600">-</span>
                          ) : (
                            <span className={data.weeklyRevenue > revenueData[index - 1].weeklyRevenue ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {data.weeklyRevenue > revenueData[index - 1].weeklyRevenue ? '+' : ''}
                              {Math.round((((data.weeklyRevenue - revenueData[index - 1].weeklyRevenue) / revenueData[index - 1].weeklyRevenue) * 100) * 10) / 10}%
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
      </div>
            </div>
              </>
            ))}
          </div>
        )}
          </>
        )}
      </div>
    </main>
  )
}