import { ProtectedRoute } from '@/components/protected-route'
import TeacherPortalContent from '@/components/teacher-portal-content'

export default function FacultyPortalPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherPortalContent />
    </ProtectedRoute>
  )
}
