'use client'

import { useMemo, useState } from 'react'
import Header from '@/components/header'
import { useAuth } from '@/context/auth-context'
import {
  BarChart3,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageCircle,
  NotebookPen,
  Send,
  TrendingUp,
  Upload,
  Users,
  Clock3,
} from 'lucide-react'

type PortalTab =
  | 'dashboard'
  | 'students'
  | 'attendance'
  | 'results'
  | 'homework'
  | 'notes'
  | 'communication'
  | 'statistics'

type Student = {
  id: number
  name: string
  rollNo: string
  parentName: string
  parentPhone: string
  attendance: number
  average: number
  present: boolean
}

type UploadRecord = {
  id: number
  student: string
  subject: string
  marks: number
  term: string
}

type HomeworkItem = {
  id: number
  title: string
  subject: string
  dueDate: string
}

type NoteItem = {
  id: number
  title: string
  subject: string
  postedOn: string
}

type MessageItem = {
  id: number
  parent: string
  message: string
  time: string
}

function TeacherPortalContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard')

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Smith', rollNo: '10A-01', parentName: 'Anna Smith', parentPhone: '+1 555 1101', attendance: 96, average: 84, present: true },
    { id: 2, name: 'Emma Wilson', rollNo: '10A-02', parentName: 'Laura Wilson', parentPhone: '+1 555 1102', attendance: 98, average: 92, present: true },
    { id: 3, name: 'Michael Brown', rollNo: '10A-03', parentName: 'David Brown', parentPhone: '+1 555 1103', attendance: 89, average: 79, present: false },
    { id: 4, name: 'Sarah Davis', rollNo: '10A-04', parentName: 'Maria Davis', parentPhone: '+1 555 1104', attendance: 93, average: 87, present: true },
    { id: 5, name: 'James Miller', rollNo: '10A-05', parentName: 'Robert Miller', parentPhone: '+1 555 1105', attendance: 95, average: 89, present: true },
    { id: 6, name: 'Lisa Anderson', rollNo: '10A-06', parentName: 'Monica Anderson', parentPhone: '+1 555 1106', attendance: 91, average: 81, present: false },
  ])

  const [results, setResults] = useState<UploadRecord[]>([
    { id: 1, student: 'Emma Wilson', subject: 'Mathematics', marks: 96, term: 'Mid-Term' },
    { id: 2, student: 'Sarah Davis', subject: 'Science', marks: 88, term: 'Mid-Term' },
  ])

  const [homework, setHomework] = useState<HomeworkItem[]>([
    { id: 1, title: 'Algebra practice set', subject: 'Mathematics', dueDate: '2026-08-08' },
    { id: 2, title: 'Lab report summary', subject: 'Science', dueDate: '2026-08-09' },
  ])

  const [notes, setNotes] = useState<NoteItem[]>([
    { id: 1, title: 'Chapter 4 revision notes', subject: 'Mathematics', postedOn: '2026-08-04' },
    { id: 2, title: 'History worksheet', subject: 'Social Studies', postedOn: '2026-08-03' },
  ])

  const [messages, setMessages] = useState<MessageItem[]>([
    { id: 1, parent: 'Anna Smith', message: 'Thanks for the progress update. We will work on homework this week.', time: '10 mins ago' },
    { id: 2, parent: 'Laura Wilson', message: 'Please share extra practice material for the next test.', time: '1 hour ago' },
  ])

  const [resultForm, setResultForm] = useState({ student: '', subject: '', marks: '', term: 'Mid-Term' })
  const [homeworkForm, setHomeworkForm] = useState({ title: '', subject: '', dueDate: '' })
  const [noteForm, setNoteForm] = useState({ title: '', subject: '', summary: '' })
  const [messageForm, setMessageForm] = useState({ parent: '', message: '' })

  const classAverage = useMemo(
    () => Math.round(students.reduce((sum, student) => sum + student.average, 0) / students.length),
    [students]
  )

  const attendanceAverage = useMemo(
    () => Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length),
    [students]
  )

  const presentToday = students.filter((student) => student.present).length
  const homeworkDue = homework.length

  const tabs: { id: PortalTab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Manage Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'results', label: 'Upload Results', icon: Upload },
    { id: 'homework', label: 'Homework', icon: BookOpenCheck },
    { id: 'notes', label: 'Upload Notes', icon: NotebookPen },
    { id: 'communication', label: 'Parent Communication', icon: MessageCircle },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp },
  ]

  const updateAttendance = (studentId: number) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present, attendance: Math.min(100, student.attendance + (student.present ? -1 : 1)) }
          : student
      )
    )
  }

  const handleResultSubmit = () => {
    if (!resultForm.student || !resultForm.subject || !resultForm.marks) return

    setResults((currentResults) => [
      {
        id: currentResults.length + 1,
        student: resultForm.student,
        subject: resultForm.subject,
        marks: Number(resultForm.marks),
        term: resultForm.term,
      },
      ...currentResults,
    ])
    setResultForm({ student: '', subject: '', marks: '', term: 'Mid-Term' })
  }

  const handleHomeworkSubmit = () => {
    if (!homeworkForm.title || !homeworkForm.subject || !homeworkForm.dueDate) return

    setHomework((currentHomework) => [
      {
        id: currentHomework.length + 1,
        title: homeworkForm.title,
        subject: homeworkForm.subject,
        dueDate: homeworkForm.dueDate,
      },
      ...currentHomework,
    ])
    setHomeworkForm({ title: '', subject: '', dueDate: '' })
  }

  const handleNoteSubmit = () => {
    if (!noteForm.title || !noteForm.subject || !noteForm.summary) return

    setNotes((currentNotes) => [
      {
        id: currentNotes.length + 1,
        title: noteForm.title,
        subject: noteForm.subject,
        postedOn: new Date().toISOString().split('T')[0],
      },
      ...currentNotes,
    ])
    setNoteForm({ title: '', subject: '', summary: '' })
  }

  const handleMessageSubmit = () => {
    if (!messageForm.parent || !messageForm.message) return

    setMessages((currentMessages) => [
      {
        id: currentMessages.length + 1,
        parent: messageForm.parent,
        message: messageForm.message,
        time: 'Just now',
      },
      ...currentMessages,
    ])
    setMessageForm({ parent: '', message: '' })
  }

  const statCards = [
    { label: 'Students', value: students.length, icon: Users },
    { label: 'Attendance', value: `${attendanceAverage}%`, icon: ClipboardCheck },
    { label: 'Class Average', value: `${classAverage}%`, icon: TrendingUp },
    { label: 'Homework Items', value: homeworkDue, icon: FileText },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-4 py-16 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-8 h-96 w-96 rounded-full bg-slate-700 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-blue-600 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur">
                <BellRing size={16} />
                Teacher Portal
              </p>
              <h1 className="text-4xl font-bold md:text-6xl">
                Welcome, {user?.name || 'Teacher'}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Manage your class, keep parents informed, and track every student from one dashboard.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <Icon size={24} className="mb-4 text-cyan-300" />
                    <p className="text-sm text-slate-300">{card.label}</p>
                    <p className="text-3xl font-bold">{card.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl lg:grid-cols-4 xl:grid-cols-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-slate-800 to-blue-900 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {activeTab === 'dashboard' && (
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl lg:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">Class at a glance</h2>
                </div>
                <Clock3 className="text-slate-400" size={28} />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">Present Today</p>
                  <p className="mt-3 text-4xl font-bold">{presentToday}</p>
                </div>
                <div className="rounded-2xl bg-blue-950 p-5 text-white">
                  <p className="text-sm text-blue-200">Attendance Rate</p>
                  <p className="mt-3 text-4xl font-bold">{attendanceAverage}%</p>
                </div>
                <div className="rounded-2xl bg-slate-800 p-5 text-white">
                  <p className="text-sm text-slate-300">Average Score</p>
                  <p className="mt-3 text-4xl font-bold">{classAverage}%</p>
                </div>
                <div className="rounded-2xl bg-cyan-900 p-5 text-white">
                  <p className="text-sm text-cyan-200">Homework Due</p>
                  <p className="mt-3 text-4xl font-bold">{homeworkDue}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-slate-900 p-3 text-white">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Manage Students</p>
                      <p className="text-sm text-slate-600">Track student progress and contact details.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-900 p-3 text-white">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Parent Communication</p>
                      <p className="text-sm text-slate-600">Send updates about homework, attendance, and results.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick Actions</p>
              <div className="mt-5 space-y-3">
                {[
                  { label: 'Mark Attendance', target: 'attendance' as PortalTab },
                  { label: 'Upload Results', target: 'results' as PortalTab },
                  { label: 'Assign Homework', target: 'homework' as PortalTab },
                  { label: 'Send Note', target: 'notes' as PortalTab },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setActiveTab(action.target)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-left font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <span>{action.label}</span>
                    <CheckCircle2 size={16} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'students' && (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Manage Students</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Class 10A roster</h2>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                {students.length} students
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {students.map((student) => (
                <article key={student.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
                      <p className="text-sm text-slate-500">Roll No. {student.rollNo}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Attendance</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">{student.attendance}%</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Average</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">{student.average}%</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Parent</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{student.parentName}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">Contact: {student.parentPhone}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'attendance' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Attendance</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Mark today&apos;s attendance</h2>
              <div className="mt-6 space-y-3">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => updateAttendance(student.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                      student.present
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-rose-200 bg-rose-50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">{student.rollNo}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Attendance Summary</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-slate-300 text-sm">Present Students</p>
                  <p className="mt-3 text-4xl font-bold">{presentToday}</p>
                </div>
                <div className="rounded-2xl bg-blue-950 p-5 text-white">
                  <p className="text-blue-200 text-sm">Attendance Average</p>
                  <p className="mt-3 text-4xl font-bold">{attendanceAverage}%</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Class Note</p>
                <p className="mt-2 text-sm text-slate-600">
                  Attendance updates sync with the dashboard so you can quickly spot absences and follow up with parents.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'results' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Upload Results</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Add student marks</h2>

              <div className="mt-6 space-y-4">
                <input
                  value={resultForm.student}
                  onChange={(e) => setResultForm({ ...resultForm, student: e.target.value })}
                  placeholder="Student name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <input
                  value={resultForm.subject}
                  onChange={(e) => setResultForm({ ...resultForm, subject: e.target.value })}
                  placeholder="Subject"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={resultForm.marks}
                    onChange={(e) => setResultForm({ ...resultForm, marks: e.target.value })}
                    placeholder="Marks"
                    type="number"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                  />
                  <input
                    value={resultForm.term}
                    onChange={(e) => setResultForm({ ...resultForm, term: e.target.value })}
                    placeholder="Term"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                  />
                </div>
                <button
                  onClick={handleResultSubmit}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  <Upload size={18} />
                  Save Result
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recent uploads</p>
              <div className="mt-6 space-y-4">
                {results.map((result) => (
                  <div key={result.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">{result.student}</p>
                        <p className="text-sm text-slate-600">{result.subject} - {result.term}</p>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{result.marks}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'homework' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Homework</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Assign work for the class</h2>

              <div className="mt-6 space-y-4">
                <input
                  value={homeworkForm.title}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
                  placeholder="Homework title"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <input
                  value={homeworkForm.subject}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, subject: e.target.value })}
                  placeholder="Subject"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <input
                  value={homeworkForm.dueDate}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })}
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <button
                  onClick={handleHomeworkSubmit}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  <FileText size={18} />
                  Publish Homework
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Assigned homework</p>
              <div className="mt-6 space-y-4">
                {homework.map((item) => (
                  <article key={item.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.subject}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Due {item.dueDate}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'notes' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Upload Notes</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Share class notes</h2>

              <div className="mt-6 space-y-4">
                <input
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  placeholder="Note title"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <input
                  value={noteForm.subject}
                  onChange={(e) => setNoteForm({ ...noteForm, subject: e.target.value })}
                  placeholder="Subject"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <textarea
                  value={noteForm.summary}
                  onChange={(e) => setNoteForm({ ...noteForm, summary: e.target.value })}
                  placeholder="Short summary for students"
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <button
                  onClick={handleNoteSubmit}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  <NotebookPen size={18} />
                  Upload Notes
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recent notes</p>
              <div className="mt-6 space-y-4">
                {notes.map((note) => (
                  <article key={note.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-bold text-slate-900">{note.title}</p>
                    <p className="text-sm text-slate-600">{note.subject}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Posted {note.postedOn}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Parent Communication</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Send a message to parents</h2>

              <div className="mt-6 space-y-4">
                <input
                  value={messageForm.parent}
                  onChange={(e) => setMessageForm({ ...messageForm, parent: e.target.value })}
                  placeholder="Parent name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <textarea
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  placeholder="Write your update"
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                />
                <button
                  onClick={handleMessageSubmit}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recent conversations</p>
              <div className="mt-6 space-y-4">
                {messages.map((message) => (
                  <article key={message.id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-slate-900">{message.parent}</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{message.time}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{message.message}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'statistics' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Statistics</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Class performance</h2>

              <div className="mt-6 space-y-5">
                {students.map((student) => (
                  <div key={student.id}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
                      <span>{student.name}</span>
                      <span>{student.average}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-slate-700 to-blue-700"
                        style={{ width: `${student.average}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Insights</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">Highest scorer</p>
                  <p className="mt-2 text-2xl font-bold">Emma Wilson</p>
                  <p className="text-sm text-slate-300">92% average</p>
                </div>
                <div className="rounded-2xl bg-blue-950 p-5 text-white">
                  <p className="text-sm text-blue-200">Attendance trend</p>
                  <p className="mt-2 text-2xl font-bold">Stable</p>
                  <p className="text-sm text-blue-200">Class average 94%</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Summary</p>
                <p className="mt-2 text-sm text-slate-600">
                  The dashboard keeps attendance, homework, results, notes, and parent communication visible so you can manage the whole class from one place.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default TeacherPortalContent