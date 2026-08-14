export type TimetableEntry = {
  day: string
  time: string
  period: string
  subject: string
  teacher: string
  room: string
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export const TIME_SLOTS = [
  '08:00 - 08:45',
  '08:45 - 09:30',
  '09:30 - 10:15',
  '10:15 - 11:00',
  '11:00 - 11:45',
]

export const PERIOD_LABELS = ['P1', 'P2', 'P3', 'P4', 'P5']

// Student / Parent timetable (class 10A)
export const classTimetable: TimetableEntry[] = [
  { day: 'Monday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Monday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Monday', time: '09:30 - 10:15', period: 'P3', subject: 'English', teacher: 'Prof. Michael Brown', room: 'Room 103' },
  { day: 'Monday', time: '10:15 - 11:00', period: 'P4', subject: 'Chemistry', teacher: 'Dr. Lisa Miller', room: 'Lab 1' },
  { day: 'Monday', time: '11:00 - 11:45', period: 'P5', subject: 'History', teacher: 'Mr. Alan Green', room: 'Room 205' },

  { day: 'Tuesday', time: '08:00 - 08:45', period: 'P1', subject: 'Physics', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Tuesday', time: '08:45 - 09:30', period: 'P2', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Tuesday', time: '09:30 - 10:15', period: 'P3', subject: 'Chemistry', teacher: 'Dr. Lisa Miller', room: 'Lab 1' },
  { day: 'Tuesday', time: '10:15 - 11:00', period: 'P4', subject: 'Physical Ed', teacher: 'Coach Robert Lee', room: 'Gymnasium' },
  { day: 'Tuesday', time: '11:00 - 11:45', period: 'P5', subject: 'English', teacher: 'Prof. Michael Brown', room: 'Room 103' },

  { day: 'Wednesday', time: '08:00 - 08:45', period: 'P1', subject: 'Chemistry', teacher: 'Dr. Lisa Miller', room: 'Lab 1' },
  { day: 'Wednesday', time: '08:45 - 09:30', period: 'P2', subject: 'English', teacher: 'Prof. Michael Brown', room: 'Room 103' },
  { day: 'Wednesday', time: '09:30 - 10:15', period: 'P3', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Wednesday', time: '10:15 - 11:00', period: 'P4', subject: 'History', teacher: 'Mr. Alan Green', room: 'Room 205' },
  { day: 'Wednesday', time: '11:00 - 11:45', period: 'P5', subject: 'Computer Science', teacher: 'Ms. Priya Sharma', room: 'Computer Lab' },

  { day: 'Thursday', time: '08:00 - 08:45', period: 'P1', subject: 'English', teacher: 'Prof. Michael Brown', room: 'Room 103' },
  { day: 'Thursday', time: '08:45 - 09:30', period: 'P2', subject: 'Chemistry', teacher: 'Dr. Lisa Miller', room: 'Lab 1' },
  { day: 'Thursday', time: '09:30 - 10:15', period: 'P3', subject: 'Physics', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Thursday', time: '10:15 - 11:00', period: 'P4', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Thursday', time: '11:00 - 11:45', period: 'P5', subject: 'Arts & Music', teacher: 'Ms. Emma Davis', room: 'Art Room' },

  { day: 'Friday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Friday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Friday', time: '09:30 - 10:15', period: 'P3', subject: 'Computer Science', teacher: 'Ms. Priya Sharma', room: 'Computer Lab' },
  { day: 'Friday', time: '10:15 - 11:00', period: 'P4', subject: 'English', teacher: 'Prof. Michael Brown', room: 'Room 103' },
  { day: 'Friday', time: '11:00 - 11:45', period: 'P5', subject: 'Homeroom / Assembly', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
]

// Teacher timetable (Dr. Sarah Johnson - Mathematics + Class 10A homeroom)
export const teacherTimetable: TimetableEntry[] = [
  { day: 'Monday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Monday', time: '08:45 - 09:30', period: 'P2', subject: 'Mathematics (10B)', teacher: 'Dr. Sarah Johnson', room: 'Room 202' },
  { day: 'Monday', time: '09:30 - 10:15', period: 'P3', subject: 'Free Period', teacher: '—', room: 'Staff Room' },
  { day: 'Monday', time: '10:15 - 11:00', period: 'P4', subject: 'Mathematics (11A)', teacher: 'Dr. Sarah Johnson', room: 'Room 301' },
  { day: 'Monday', time: '11:00 - 11:45', period: 'P5', subject: 'Mathematics (11B)', teacher: 'Dr. Sarah Johnson', room: 'Room 302' },

  { day: 'Tuesday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (10B)', teacher: 'Dr. Sarah Johnson', room: 'Room 202' },
  { day: 'Tuesday', time: '08:45 - 09:30', period: 'P2', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Tuesday', time: '09:30 - 10:15', period: 'P3', subject: 'Mathematics (10A) Lab', teacher: 'Dr. Sarah Johnson', room: 'Math Lab' },
  { day: 'Tuesday', time: '10:15 - 11:00', period: 'P4', subject: 'Free Period', teacher: '—', room: 'Staff Room' },
  { day: 'Tuesday', time: '11:00 - 11:45', period: 'P5', subject: 'Mathematics (11A)', teacher: 'Dr. Sarah Johnson', room: 'Room 301' },

  { day: 'Wednesday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (11B)', teacher: 'Dr. Sarah Johnson', room: 'Room 302' },
  { day: 'Wednesday', time: '08:45 - 09:30', period: 'P2', subject: 'Mathematics (10A)', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Wednesday', time: '09:30 - 10:15', period: 'P3', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Wednesday', time: '10:15 - 11:00', period: 'P4', subject: 'Mathematics (10B) Lab', teacher: 'Dr. Sarah Johnson', room: 'Math Lab' },
  { day: 'Wednesday', time: '11:00 - 11:45', period: 'P5', subject: 'Free Period', teacher: '—', room: 'Staff Room' },

  { day: 'Thursday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (10A) Lab', teacher: 'Dr. Sarah Johnson', room: 'Math Lab' },
  { day: 'Thursday', time: '08:45 - 09:30', period: 'P2', subject: 'Mathematics (10B)', teacher: 'Dr. Sarah Johnson', room: 'Room 202' },
  { day: 'Thursday', time: '09:30 - 10:15', period: 'P3', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Thursday', time: '10:15 - 11:00', period: 'P4', subject: 'Mathematics (11A)', teacher: 'Dr. Sarah Johnson', room: 'Room 301' },
  { day: 'Thursday', time: '11:00 - 11:45', period: 'P5', subject: 'Free Period', teacher: '—', room: 'Staff Room' },

  { day: 'Friday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Friday', time: '08:45 - 09:30', period: 'P2', subject: 'Mathematics (11B)', teacher: 'Dr. Sarah Johnson', room: 'Room 302' },
  { day: 'Friday', time: '09:30 - 10:15', period: 'P3', subject: 'Mathematics (10A)', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Friday', time: '10:15 - 11:00', period: 'P4', subject: 'Mathematics (10B)', teacher: 'Dr. Sarah Johnson', room: 'Room 202' },
  { day: 'Friday', time: '11:00 - 11:45', period: 'P5', subject: 'Staff Meeting', teacher: 'All Faculty', room: 'Conference Room' },
]

// Principal timetable (school-wide schedule overview by class)
export const schoolTimetable: TimetableEntry[] = [
  { day: 'Monday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (10A)', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Monday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics (10A)', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Monday', time: '09:30 - 10:15', period: 'P3', subject: 'English (10A)', teacher: 'Prof. Michael Brown', room: 'Room 103' },
  { day: 'Monday', time: '10:15 - 11:00', period: 'P4', subject: 'Chemistry (10A)', teacher: 'Dr. Lisa Miller', room: 'Lab 1' },
  { day: 'Monday', time: '11:00 - 11:45', period: 'P5', subject: 'History (10A)', teacher: 'Mr. Alan Green', room: 'Room 205' },

  { day: 'Tuesday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (10B)', teacher: 'Dr. Sarah Johnson', room: 'Room 202' },
  { day: 'Tuesday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics (10B)', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Tuesday', time: '09:30 - 10:15', period: 'P3', subject: 'English (10B)', teacher: 'Prof. Michael Brown', room: 'Room 104' },
  { day: 'Tuesday', time: '10:15 - 11:00', period: 'P4', subject: 'Chemistry (10B)', teacher: 'Dr. Lisa Miller', room: 'Lab 1' },
  { day: 'Tuesday', time: '11:00 - 11:45', period: 'P5', subject: 'History (10B)', teacher: 'Mr. Alan Green', room: 'Room 206' },

  { day: 'Wednesday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (11A)', teacher: 'Dr. Sarah Johnson', room: 'Room 301' },
  { day: 'Wednesday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics (11A)', teacher: 'Dr. James Wilson', room: 'Lab 3' },
  { day: 'Wednesday', time: '09:30 - 10:15', period: 'P3', subject: 'English (11A)', teacher: 'Prof. Michael Brown', room: 'Room 303' },
  { day: 'Wednesday', time: '10:15 - 11:00', period: 'P4', subject: 'Chemistry (11A)', teacher: 'Dr. Lisa Miller', room: 'Lab 2' },
  { day: 'Wednesday', time: '11:00 - 11:45', period: 'P5', subject: 'Computer Science (11A)', teacher: 'Ms. Priya Sharma', room: 'Computer Lab' },

  { day: 'Thursday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (11B)', teacher: 'Dr. Sarah Johnson', room: 'Room 302' },
  { day: 'Thursday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics (11B)', teacher: 'Dr. James Wilson', room: 'Lab 3' },
  { day: 'Thursday', time: '09:30 - 10:15', period: 'P3', subject: 'English (11B)', teacher: 'Prof. Michael Brown', room: 'Room 304' },
  { day: 'Thursday', time: '10:15 - 11:00', period: 'P4', subject: 'Chemistry (11B)', teacher: 'Dr. Lisa Miller', room: 'Lab 2' },
  { day: 'Thursday', time: '11:00 - 11:45', period: 'P5', subject: 'Arts & Music (11B)', teacher: 'Ms. Emma Davis', room: 'Art Room' },

  { day: 'Friday', time: '08:00 - 08:45', period: 'P1', subject: 'Mathematics (10A)', teacher: 'Dr. Sarah Johnson', room: 'Room 201' },
  { day: 'Friday', time: '08:45 - 09:30', period: 'P2', subject: 'Physics (10A)', teacher: 'Dr. James Wilson', room: 'Lab 2' },
  { day: 'Friday', time: '09:30 - 10:15', period: 'P3', subject: 'Computer Science (10A)', teacher: 'Ms. Priya Sharma', room: 'Computer Lab' },
  { day: 'Friday', time: '10:15 - 11:00', period: 'P4', subject: 'English (10A)', teacher: 'Prof. Michael Brown', room: 'Room 103' },
  { day: 'Friday', time: '11:00 - 11:45', period: 'P5', subject: 'Homeroom / Assembly', teacher: 'All Faculty', room: 'Room 201' },
]

export const subjectColors: Record<string, string> = {
  Mathematics: 'from-blue-500 to-indigo-600',
  Physics: 'from-cyan-500 to-blue-600',
  Chemistry: 'from-emerald-500 to-teal-600',
  English: 'from-purple-500 to-fuchsia-600',
  History: 'from-amber-500 to-orange-600',
  'Computer Science': 'from-slate-600 to-slate-800',
  'Physical Ed': 'from-green-500 to-lime-600',
  'Arts & Music': 'from-pink-500 to-rose-600',
  'Homeroom / Assembly': 'from-slate-500 to-slate-700',
  'Staff Meeting': 'from-slate-700 to-slate-900',
  'Free Period': 'from-slate-300 to-slate-400',
}
