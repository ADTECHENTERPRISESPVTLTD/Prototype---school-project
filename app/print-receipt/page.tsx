'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { ArrowLeft, Printer } from 'lucide-react'

function ReceiptContent() {
  const searchParams = useSearchParams()
  const month = searchParams.get('month') || 'Outstanding Fees'
  const amount = searchParams.get('amount') || '0'
  const txnId = searchParams.get('txnId') || 'TXN1000000000'
  const receiptNo = `REC2026-${Math.floor(100000 + Math.random() * 900000)}`
  const dateStr = new Date().toISOString().split('T')[0]

  useEffect(() => {
    // Wait a brief moment to ensure layout paints completely before print dialog opens
    const timer = setTimeout(() => {
      window.print()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:mx-0 print:w-full">
      {/* Paid Stamp */}
      <div className="absolute top-10 right-10 border-4 border-emerald-500 text-emerald-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest px-3 py-1.5 rounded-xl transform rotate-12 opacity-80 print:opacity-100">
        Fees Paid
      </div>

      {/* Header */}
      <div className="text-center border-b-2 border-dashed border-slate-200 pb-6 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">EDUPRO HIGH SCHOOL</h2>
        <p className="text-slate-500 text-xs mt-1">123 Education Lane, Science City, SC 50001</p>
        <h3 className="text-purple-600 text-sm uppercase tracking-widest font-bold mt-4">Fee Payment Receipt</h3>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8 text-xs sm:text-sm">
        <div>
          <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">Receipt Details</h4>
          <p className="font-bold text-slate-800">Receipt No: <span className="font-mono text-slate-600">{receiptNo}</span></p>
          <p className="font-bold text-slate-800">Date: <span className="font-mono text-slate-600">{dateStr}</span></p>
          <p className="font-bold text-slate-800">Txn ID: <span className="font-mono text-slate-600">{txnId}</span></p>
        </div>
        <div className="text-right">
          <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">Student Details</h4>
          <p className="font-bold text-slate-800">Name: Alex Johnson</p>
          <p className="font-bold text-slate-800">Class / Section: 10A</p>
          <p className="font-bold text-slate-800">Roll No: 12</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse mb-8 text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="py-3 px-2 text-left font-bold text-slate-500 uppercase tracking-wider text-[10px]">Description</th>
            <th className="py-3 px-2 text-right font-bold text-slate-500 uppercase tracking-wider text-[10px]">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="py-4 px-2 font-bold text-slate-800">School Tuition Fees - {month}</td>
            <td className="py-4 px-2 text-right font-bold text-slate-800">₹{Number(amount).toLocaleString()}.00</td>
          </tr>
          <tr className="text-slate-500">
            <td className="py-3 px-2">Payment Mode: UPI / Online</td>
            <td className="py-3 px-2 text-right">-</td>
          </tr>
          <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
            <td className="py-4 px-2 text-blue-900 font-extrabold">Total Paid Amount</td>
            <td className="py-4 px-2 text-right text-blue-900 font-extrabold">₹{Number(amount).toLocaleString()}.00</td>
          </tr>
        </tbody>
      </table>

      {/* Signature Section */}
      <div className="flex justify-between items-end mt-8 border-t border-slate-100 pt-6">
        <div>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Status</p>
          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider">
            Approved
          </span>
        </div>
        <div className="text-center flex flex-col items-center">
          <img src="/signature.png" alt="Authorised Signature" className="h-10 object-contain mb-1 mix-blend-multiply" />
          <div className="w-28 border-b border-slate-200"></div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Authorised Signatory</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 pt-6 text-center text-slate-400 text-[10px] sm:text-xs mt-6">
        <p className="font-medium">This is an officially signed fee receipt generated by EDUPRO High School.</p>
        <p className="mt-1">Thank you for your support!</p>
      </div>
    </div>
  )
}

export default function PrintReceiptPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4">
      {/* Navigation bar hidden during print */}
      <div className="max-w-xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => window.close()}
          className="bg-white text-slate-700 px-4 py-2 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1.5 text-sm shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Portal
        </button>
        <button
          onClick={() => window.print()}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 transition flex items-center gap-1.5 text-sm shadow-sm"
        >
          <Printer size={16} /> Print Again
        </button>
      </div>

      <Suspense fallback={<div className="text-center text-slate-500 mt-10">Loading Receipt details...</div>}>
        <ReceiptContent />
      </Suspense>
    </main>
  )
}
