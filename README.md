# EduPro Admin - School Management Portal

A comprehensive, modern school management system built with Next.js, featuring role-based authentication and dedicated portals for different user types.

## Features Implemented

### 1. Role-Based Authentication System
- **Login Page** - Beautiful role selection with 4 user types
- **Auth Context** - Global state management with localStorage persistence
- **Protected Routes** - Role-specific access control for all portals
- **User Sessions** - Auto-login on page reload

### 2. User Roles & Portals

#### Student Portal (`/student-portal`)
- View enrolled courses with progress tracking
- Track assignments and submission status
- Check grades and GPA
- View attendance records
- Manage coursework

#### Teacher/Faculty Portal (`/faculty-portal`)
- Manage assigned classes and students
- View student submissions
- Create and grade assignments
- Track class performance
- Monitor student progress

#### Parent Portal (`/parent-portal`) - NEW
- Monitor child's academic progress
- View grades and course performance
- Check assignment status and due dates
- See attendance records
- Receive school announcements
- Track GPA and overall performance

#### Principal Portal (`/principal-portal`) - NEW
- Complete school analytics dashboard
- View all departments and their performance
- Monitor class-wise performance metrics
- Access staff and student statistics
- View pass rates across departments
- Generate reports
- Quick action buttons for school management

### 3. Header Navigation
- Dynamic login/logout functionality
- Role-specific portal access
- User profile with dropdown menu
- Mobile-responsive menu
- Notification bell with activity indicator

### 4. Homepage Features
- Beautiful hero section with school building image
- Statistics showcase (50+ Programs, 10K+ Students, 98% Success)
- Six interactive module cards with hover effects
- Call-to-action buttons for admissions and portals
- Animated gradient backgrounds with glassmorphism effects

### 5. Additional Pages
- **Academics** - Academic programs, subjects offered, teaching methodology
- **Events** - Filterable school events with registration
- **Notices** - Categorized announcements with priority levels
- **About** - School mission, vision, and core values
- **Admissions** - Online application form

## Demo Credentials

All portals use the same demo password for testing:

```
Password: password

Student:
Email: student@school.com

Teacher:
Email: teacher@school.com

Parent:
Email: parent@school.com

Principal:
Email: principal@school.com
```

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Authentication**: Custom Auth Context with localStorage
- **State Management**: React Context API
- **Icons**: Lucide React
- **Images**: Next.js Image component

## File Structure

```
app/
├── layout.tsx                          # Root layout with AuthProvider
├── page.tsx                            # Homepage
├── login/
│   └── page.tsx                        # Login page
├── student-portal/
│   └── page.tsx                        # Student dashboard
├── faculty-portal/
│   └── page.tsx                        # Teacher dashboard
├── parent-portal/
│   └── page.tsx                        # Parent dashboard
├── principal-portal/
│   └── page.tsx                        # Principal dashboard
├── academics/
│   └── page.tsx                        # Academics info
├── events/
│   └── page.tsx                        # Events listing
├── notices/
│   └── page.tsx                        # Notices & announcements
├── about/
│   └── page.tsx                        # About the school
└── admissions/
    └── page.tsx                        # Admissions form

components/
├── header.tsx                          # Navigation header with auth
├── hero-section.tsx                    # Homepage hero
├── modules-section.tsx                 # Portal cards
├── protected-route.tsx                 # Route protection component

context/
└── auth-context.tsx                    # Authentication context

public/
└── school-building.png                 # School building image
```

## Key Features Implemented

1. **Role-Based Access Control**
   - Students can only see their own data
   - Teachers see their assigned classes
   - Parents see their children's information
   - Principals see complete school overview

2. **Responsive Design**
   - Mobile-first approach
   - Desktop, tablet, and mobile views optimized
   - Smooth transitions and animations

3. **Beautiful UI/UX**
   - Gradient backgrounds and animations
   - Consistent color scheme
   - Professional card-based layouts
   - Interactive hover effects
   - Loading states

4. **Data Security**
   - Protected routes redirect unauthorized users to login
   - Role validation on each page
   - Clean logout functionality
   - Session persistence via localStorage

## Demo Flows

### Student Login Flow
1. Go to `/login`
2. Select "Student" role
3. Click "Demo Login"
4. Redirected to `/student-portal`
5. See courses, assignments, and grades
6. Click logout to return to login page

### Teacher Login Flow
1. Go to `/login`
2. Select "Teacher" role
3. Click "Demo Login"
4. Redirected to `/faculty-portal`
5. See classes and student submissions
6. Manage assignments and grades

### Parent Login Flow
1. Go to `/login`
2. Select "Parent" role
3. Click "Demo Login"
4. Redirected to `/parent-portal`
5. Monitor child's academic progress
6. View courses and assignments

### Principal Login Flow
1. Go to `/login`
2. Select "Principal" role
3. Click "Demo Login"
4. Redirected to `/principal-portal`
5. View complete school analytics
6. Monitor all departments and classes

## Deployment

The app is ready for deployment to Vercel:

```bash
npm run build
vercel deploy
```

## Future Enhancements

- Real database integration (Neon/Supabase)
- Email notifications
- Real-time chat/messaging
- Calendar and scheduling
- File upload for assignments
- Advanced analytics and reporting
- Mobile app integration
- Two-factor authentication
- Multi-language support

## Notes

- All data is currently demo/mock data stored in React state
- For production, integrate with a real database backend
- Customize demo credentials in `context/auth-context.tsx`
- Update school information in respective pages

---

Built with ❤️ for educational institutions
