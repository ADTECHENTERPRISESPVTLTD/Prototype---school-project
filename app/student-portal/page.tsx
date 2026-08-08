'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { BookOpen, Clock, CheckCircle, AlertCircle, Download, Award, TrendingUp, Bell, User, Megaphone, ArrowLeft, Printer, GraduationCap, HelpCircle, FileText, ClipboardList, NotebookPen } from 'lucide-react'
import Link from 'next/link'

function StudentPortalContent() {
  const [activeTab, setActiveTab] = useState('courses')

  const notices = [
    { id: 1, title: 'Mid-Term Exam Schedule', content: 'Exams start from March 1st. All students must report 15 mins early.', priority: 'high', date: '2024-02-15', createdBy: 'Principal' },
    { id: 2, title: 'Lab Session Cancelled', content: 'Lab session on Friday is postponed to next week.', priority: 'medium', date: '2024-02-14', createdBy: 'Dr. Anderson' },
    { id: 3, title: 'Annual Sports Day', content: 'Sports day on 25th March. Students should wear their house colors.', priority: 'low', date: '2024-02-10', createdBy: 'Sports Dept' },
  ]

  const courses = [
    { id: 1, name: 'Mathematics - Calculus', instructor: 'Dr. Sarah Johnson', progress: 95, grade: 'A', marks: 96, remarks: 'Excellent analytical and problem-solving skills.' },
    { id: 2, name: 'Physics - Quantum Mechanics', instructor: 'Dr. James Wilson', progress: 94, grade: 'A', marks: 95, remarks: 'Outstanding comprehension of complex physics concepts.' },
    { id: 3, name: 'Chemistry - Organic Chemistry', instructor: 'Dr. Lisa Miller', progress: 98, grade: 'A+', marks: 98, remarks: 'Exceptional performance in laboratory work and exams.' },
    { id: 4, name: 'English Literature', instructor: 'Prof. Michael Brown', progress: 98, grade: 'A', marks: 96, remarks: 'Strong essay writing and literature interpretation.' },
  ]

  const assignments = [
    { id: 1, title: 'Math Problem Set 5', course: 'Mathematics', dueDate: '2024-02-15', status: 'pending' },
    { id: 2, title: 'Essay on Romeo & Juliet', course: 'English Literature', dueDate: '2024-02-20', status: 'submitted' },
    { id: 3, title: 'Physics Lab Report', course: 'Physics', dueDate: '2024-02-10', status: 'overdue' },
{ id: 4, title: 'Historical Research Paper', course: 'History', dueDate: '2024-02-25', status: 'pending' },
  ]

  const importantQuestions = [
    { id: 1, subject: 'Mathematics', chapter: 'Calculus - Differentiation', questions: ['Derive the chain rule with examples', 'Solve maxima and minima problems', 'Application of derivatives in real life'], difficulty: 'Hard', marks: 8 },
    { id: 2, subject: 'Physics', chapter: 'Quantum Mechanics', questions: ['Explain wave-particle duality', 'State and prove Heisenberg uncertainty principle', 'Describe photoelectric effect with equations'], difficulty: 'Hard', marks: 10 },
    { id: 3, subject: 'Chemistry', chapter: 'Organic Chemistry', questions: ['Explain isomerism types', 'Write mechanisms of substitution reactions', 'Describe functional group identification'], difficulty: 'Medium', marks: 7 },
    { id: 4, subject: 'English Literature', chapter: 'Romeo & Juliet', questions: ['Analyze the theme of fate vs free will', 'Character sketch of Juliet', 'Discuss the role of the Nurse'], difficulty: 'Medium', marks: 6 },
  ]

  const questionPapers = [
    { id: 1, subject: 'Mathematics', exam: 'Mid-Term Exam', year: '2024', marks: '100 Marks', duration: '3 Hours' },
    { id: 2, subject: 'Physics', exam: 'Final Exam', year: '2023', marks: '100 Marks', duration: '3 Hours' },
    { id: 3, subject: 'Chemistry', exam: 'Mid-Term Exam', year: '2024', marks: '80 Marks', duration: '2.5 Hours' },
    { id: 4, subject: 'English Literature', exam: 'Unit Test', year: '2024', marks: '40 Marks', duration: '1.5 Hours' },
  ]

  const homework = [
    { id: 1, subject: 'Mathematics', title: 'Practice Differentiation Problems', date: '2024-02-12', due: '2024-02-18', status: 'pending' },
    { id: 2, subject: 'Chemistry', title: 'Organic Chemistry Worksheet', date: '2024-02-11', due: '2024-02-20', status: 'submitted' },
    { id: 3, subject: 'Physics', title: 'Physics Numericals - Motion & Forces', date: '2024-02-13', due: '2024-02-22', status: 'pending' },
  ]

  const notes = [
    { id: 1, subject: 'Physics', title: 'Handwritten Notes - Quantum Mechanics', date: '2024-02-10', size: '2.4 MB' },
    { id: 2, subject: 'English Literature', title: 'Summary Notes - Romeo & Juliet', date: '2024-02-08', size: '1.8 MB' },
    { id: 3, subject: 'Chemistry', title: 'Organic Chemistry Reaction Guide', date: '2024-02-09', size: '3.1 MB' },
  ]

  const gradeColors: Record<string, string> = {
    'A+': 'from-emerald-500 to-emerald-600',
    'A': 'from-green-500 to-green-600',
    'A-': 'from-teal-500 to-teal-600',
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
        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'courses'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <BookOpen size={16} className="sm:w-5 sm:h-5" />
              Courses
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'assignments'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Clock size={16} className="sm:w-5 sm:h-5" />
              Assignments
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'grades'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <CheckCircle size={16} className="sm:w-5 sm:h-5" />
              Report Card
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'notices'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
<Bell size={16} className="sm:w-5 sm:h-5" />
              Notices
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'questions'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <HelpCircle size={16} className="sm:w-5 sm:h-5" />
              Important Questions
            </button>
            <button
              onClick={() => setActiveTab('papers')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'papers'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <FileText size={16} className="sm:w-5 sm:h-5" />
              Question Papers
            </button>
<button
              onClick={() => setActiveTab('homework')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'homework'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <ClipboardList size={16} className="sm:w-5 sm:h-5" />
              Homework
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-center transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 rounded-xl whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <NotebookPen size={16} className="sm:w-5 sm:h-5" />
              Notes
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-10 bg-gradient-to-b from-white to-slate-50">
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
                  <div key={assignment.id} className="group bg-gradient-to-br from-slate-50 to-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{assignment.title}</h3>
                        <p className="text-slate-600 text-xs sm:text-sm mt-1">{assignment.course}</p>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">Due: {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                        {assignment.status === 'submitted' && (
                          <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm">
                            <CheckCircle size={16} /> Submitted
                          </span>
                        )}
                        {assignment.status === 'pending' && (
                          <span className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm">
                            <Clock size={16} /> Pending
                          </span>
                        )}
                        {assignment.status === 'overdue' && (
                          <span className="flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm">
                            <AlertCircle size={16} /> Overdue
                          </span>
                        )}
                        <button className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition ml-auto sm:ml-0">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'grades' && (
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
                      <p className="font-extrabold text-slate-800 text-base">Alex Johnson</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Class / Section</p>
                      <p className="font-extrabold text-slate-800 text-base">10-A</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Roll Number</p>
                      <p className="font-extrabold text-slate-800 text-base">12</p>
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
                              <span className={`inline-flex items-center justify-center font-extrabold text-white text-xs px-2.5 py-1 rounded-md shadow-sm bg-gradient-to-r ${gradeColors[subj.grade]}`}>
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
                              <p className="text-slate-500 text-[10px] mt-0.5 font-medium">Instructor: {subj.instructor}</p>
                            </div>
                            <span className={`inline-flex items-center justify-center font-extrabold text-white text-[10px] px-2 py-0.5 rounded shadow-sm bg-gradient-to-r ${gradeColors[subj.grade]}`}>
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
                            <span className="text-xl sm:text-2xl font-extrabold text-blue-600">96.25%</span>
                            <span className="text-slate-400 text-xs font-semibold">/ 100%</span>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                          <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] mb-1 leading-normal">Attendance Rate</p>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-xl sm:text-2xl font-extrabold text-emerald-600">94%</span>
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

            {/* Important Questions Tab */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Chapter-wise Important Questions</h3>
                {importantQuestions.map((item) => (
                  <div key={item.id} className="group bg-gradient-to-br from-white to-slate-50 p-4 sm:p-6 lg:p-8 rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">
                            {item.subject}
                          </span>
                          <span className="text-sm font-semibold text-slate-600 break-words">{item.chapter}</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 break-words">{item.chapter}</h4>
                        <ul className="space-y-2">
                          {item.questions.map((q, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed">
                              <HelpCircle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                              <span className="break-words">{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 shrink-0 w-full lg:w-auto justify-start">
                        <span className={`bg-gradient-to-r ${item.difficulty === 'Hard' ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600'} text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg`}>
                          {item.difficulty}
                        </span>
                        <span className="text-sm font-bold text-slate-600">{item.marks} marks</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Question Papers Tab */}
            {activeTab === 'papers' && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Question Papers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {questionPapers.map((paper) => (
                    <div key={paper.id} className="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">
                              {paper.subject}
                            </span>
                            <span className="text-sm font-semibold text-slate-600">{paper.year}</span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{paper.exam}</h4>
                          <p className="text-slate-600 text-sm mb-4">{paper.subject}</p>
                          <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                              <FileText size={14} className="text-blue-600" /> {paper.marks}
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                              <Clock size={14} className="text-blue-600" /> {paper.duration}
                            </span>
                          </div>
                        </div>
                        <button className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-xl transition shrink-0">
                          <Download size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Homework Tab */}
            {activeTab === 'homework' && (
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Homework Assignments</h3>
                <div className="space-y-4">
                  {homework.map((item) => (
                    <div key={item.id} className="group bg-gradient-to-br from-orange-50 to-slate-50 p-4 sm:p-6 rounded-2xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase">
                              Homework
                            </span>
                            <span className="text-sm font-semibold text-slate-600">{item.subject}</span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 break-words">{item.title}</h4>
                          <p className="text-slate-500 text-sm mt-2">Assigned: {item.date}</p>
                          <p className="text-slate-600 text-sm mt-1 inline-flex items-center gap-1.5">
                            <Clock size={14} className="text-orange-500" /> Due: {item.due}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-orange-100 shrink-0">
                          {item.status === 'submitted' ? (
                            <span className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold text-sm">
                              <CheckCircle size={18} /> Submitted
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm">
                              <Clock size={18} /> Pending
                            </span>
                          )}
                          <button className="text-slate-600 hover:text-orange-600 hover:bg-orange-50 p-2 rounded-lg transition">
                            <Download size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Study Notes & Materials</h3>
                <div className="space-y-4">
                  {notes.map((item) => (
                    <div key={item.id} className="group bg-gradient-to-br from-emerald-50 to-slate-50 p-4 sm:p-6 rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase">
                              Notes
                            </span>
                            <span className="text-sm font-semibold text-slate-600">{item.subject}</span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 break-words">{item.title}</h4>
                          <p className="text-slate-500 text-sm mt-2">Posted: {item.date}</p>
                          <p className="text-slate-600 text-sm mt-1 inline-flex items-center gap-1.5">
                            <FileText size={14} className="text-emerald-500" /> Size: {item.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-100 shrink-0">
                          <button className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition">
                            <Download size={20} />
                          </button>
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
