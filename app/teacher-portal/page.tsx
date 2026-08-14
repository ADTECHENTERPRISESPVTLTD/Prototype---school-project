import { ProtectedRoute } from '@/components/protected-route'
import TeacherPortalContent from '@/components/teacher-portal-content'

export default function TeacherPortalPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <TeacherPortalContent />
    </ProtectedRoute>
  )
}