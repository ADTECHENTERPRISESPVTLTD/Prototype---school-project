'use client'

import { useEffect } from 'react'
import { ArrowLeft, Printer, GraduationCap } from 'lucide-react'

export default function PrintReportPage() {
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
    { name: 'English Literature', grade: 'A', marks: 96, remarks: 'Strong essay writing and literature interpretation.' }
  ]

  const totalScore = courses.reduce((sum, c) => sum + (c.marks || 0), 0)
  const maxScore = courses.length * 100

  const gradeColors: Record<string, string> = {
    'A+': 'text-emerald-600',
    'A': 'text-green-600',
    'A-': 'text-teal-600',
    'B+': 'text-blue-600',
    'B': 'text-cyan-600',
  }

  useEffect(() => {
    // Wait a brief moment to ensure layout paints completely before print dialog opens
    const timer = setTimeout(() => {
      window.print()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(192,132,252,0.15),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.16),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] py-8 px-4">
      {/* Navigation bar hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
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

      <div className="max-w-4xl mx-auto bg-white/95 border border-violet-200 p-8 sm:p-12 rounded-[30px] shadow-[0_25px_80px_rgba(15,23,42,0.12)] relative overflow-hidden print:border-none print:shadow-none print:p-0 print:mx-0 print:w-full">
        {/* Watermark Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 text-[120px] font-extrabold text-slate-50 opacity-40 select-none pointer-events-none tracking-widest z-0 print:text-slate-100/60 print:opacity-30">
          EDUPRO
        </div>

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center border-b border-violet-200 pb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-violet-700 to-cyan-600 text-white p-3 rounded-2xl shadow-lg">
                <GraduationCap size={40} />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight uppercase">EDUPRO HIGH SCHOOL</h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wider uppercase mt-1">123 Education Lane, Science City, SC 50001</p>
            <h3 className="text-violet-700 text-base sm:text-lg uppercase tracking-widest font-black mt-4 border-t border-violet-100 pt-3">Academic Performance Report Card</h3>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-slate-50 via-violet-50 to-cyan-50 border border-violet-100 p-5 rounded-2xl text-xs sm:text-sm">
            <div>
              <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1">Student Name</h4>
              <p className="font-extrabold text-slate-800 text-base">{child.name}</p>
            </div>
            <div>
              <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1">Class / Section</h4>
              <p className="font-extrabold text-slate-800 text-base">{child.class}</p>
            </div>
            <div>
              <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1">Roll Number</h4>
              <p className="font-extrabold text-slate-800 text-base">{child.rollNo}</p>
            </div>
            <div>
              <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1">Student ID</h4>
              <p className="font-extrabold text-slate-800 text-base">STU2025-012</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50/50">
                <th className="py-3 px-3 text-left font-bold text-slate-600 uppercase tracking-wider text-[10px]">Subject</th>
                <th className="py-3 px-3 text-center font-bold text-slate-600 uppercase tracking-wider text-[10px]">Max Marks</th>
                <th className="py-3 px-3 text-center font-bold text-slate-600 uppercase tracking-wider text-[10px]">Marks Obtained</th>
                <th className="py-3 px-3 text-center font-bold text-slate-600 uppercase tracking-wider text-[10px]">Grade</th>
                <th className="py-3 px-3 text-left font-bold text-slate-600 uppercase tracking-wider text-[10px] pl-6">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((subj, idx) => (
                <tr key={idx} className="hover:bg-slate-50/20">
                  <td className="py-4 px-3 font-extrabold text-slate-900">{subj.name}</td>
                  <td className="py-4 px-3 text-center text-slate-500 font-semibold">100</td>
                  <td className="py-4 px-3 text-center font-bold text-slate-800">{subj.marks}</td>
                  <td className={`py-4 px-3 text-center font-black ${gradeColors[subj.grade] || 'text-blue-600'}`}>{subj.grade}</td>
                  <td className="py-4 px-3 text-slate-600 italic pl-6">{subj.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Metrics & Signature Section */}
          <div className="border-t border-slate-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Cumulative Percentage</span>
                  <span className="text-xl font-black text-blue-900">{child.percentage}%</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Attendance Rate</span>
                  <span className="text-xl font-black text-emerald-700">{child.attendance}%</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Total Score</span>
                  <span className="text-xl font-black text-slate-800">{totalScore} <span className="text-slate-400 font-normal">/ {maxScore}</span></span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-center">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Result Status</span>
                  <span className="text-sm font-black text-emerald-600 uppercase tracking-wider">Passed (Promoted)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Teacher Remarks</h4>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                "Alex has consistently demonstrated academic excellence and active participation in class discussions. Keep up the high standards!"
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-12 text-center text-xs sm:text-sm">
            <div className="flex flex-col items-center justify-end h-16">
              <div className="w-full max-w-[150px] border-b border-slate-300 mb-2"></div>
              <p className="font-bold text-slate-700">Dr. Sarah Johnson</p>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Class Teacher</p>
            </div>
            <div className="flex flex-col items-center justify-end relative h-16">
              <img src="/signature.png" alt="Principal Signature" className="h-10 object-contain mb-1 mix-blend-multiply absolute bottom-7" />
              <div className="w-full max-w-[150px] border-b border-slate-300 mb-2"></div>
              <p className="font-bold text-slate-700">Dr. Arthur Pendelton</p>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Principal</p>
            </div>
            <div className="flex flex-col items-center justify-end h-16">
              <div className="w-full max-w-[150px] border-b border-slate-300 mb-2"></div>
              <p className="font-bold text-slate-700"></p>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Parent Signature</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
