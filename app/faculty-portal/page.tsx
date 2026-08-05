'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/context/auth-context'
import { Users, BookOpen, BarChart3, Clock, Plus, CheckCircle, AlertCircle, X, Save, Bell, Trash2, Edit3, ArrowLeft } from 'lucide-react'
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
        import { ProtectedRoute } from '@/components/protected-route'
        import TeacherPortalContent from '@/components/teacher-portal-content'

        export default function FacultyPortalPage() {
          return (
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPortalContent />
            </ProtectedRoute>
          )
        }
          </div>
        )}
      </div>

<Link href="/" className="inline-block mt-12 ml-4 text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-2 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
        Back to Home
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
