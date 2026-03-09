'use client'

import Link from 'next/link'
import { useState } from 'react'

// Sample course data
const coursesData = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the basics of React and build interactive UIs',
    category: 'Frontend',
    icon: '⚛️',
    progress: 45,
    lessons: [
      { id: 1, title: 'Introduction to React', duration: '15 min' },
      { id: 2, title: 'JSX and Rendering', duration: '20 min' },
      { id: 3, title: 'Components and Props', duration: '25 min' },
      { id: 4, title: 'State and Hooks', duration: '30 min' },
      { id: 5, title: 'Event Handling', duration: '20 min' },
    ],
  },
  {
    id: 2,
    title: 'JavaScript ES6+',
    description: 'Master modern JavaScript features and best practices',
    category: 'Programming',
    icon: '🚀',
    progress: 60,
    lessons: [
      { id: 1, title: 'Arrow Functions', duration: '15 min' },
      { id: 2, title: 'Destructuring', duration: '20 min' },
      { id: 3, title: 'Promises and Async/Await', duration: '30 min' },
      { id: 4, title: 'Modules and Imports', duration: '20 min' },
    ],
  },
  {
    id: 3,
    title: 'Web Design with CSS',
    description: 'Create beautiful and responsive web designs',
    category: 'Design',
    icon: '🎨',
    progress: 30,
    lessons: [
      { id: 1, title: 'CSS Basics', duration: '20 min' },
      { id: 2, title: 'Flexbox and Grid', duration: '30 min' },
      { id: 3, title: 'Responsive Design', duration: '25 min' },
      { id: 4, title: 'Animations and Transitions', duration: '25 min' },
      { id: 5, title: 'Tailwind CSS', duration: '20 min' },
    ],
  },
  {
    id: 4,
    title: 'Database Design',
    description: 'Learn SQL and database fundamentals',
    category: 'Backend',
    icon: '🗄️',
    progress: 75,
    lessons: [
      { id: 1, title: 'Relational Databases', duration: '25 min' },
      { id: 2, title: 'SQL Queries', duration: '30 min' },
      { id: 3, title: 'Joins and Relationships', duration: '30 min' },
      { id: 4, title: 'Indexing and Optimization', duration: '25 min' },
    ],
  },
  {
    id: 5,
    title: 'Node.js & Express',
    description: 'Build backend applications with Node.js',
    category: 'Backend',
    icon: '🟢',
    progress: 50,
    lessons: [
      { id: 1, title: 'Node.js Basics', duration: '20 min' },
      { id: 2, title: 'Express Server Setup', duration: '25 min' },
      { id: 3, title: 'Routing and Middleware', duration: '30 min' },
      { id: 4, title: 'REST APIs', duration: '30 min' },
    ],
  },
  {
    id: 6,
    title: 'TypeScript Mastery',
    description: 'Type-safe JavaScript for large-scale applications',
    category: 'Programming',
    icon: '🔷',
    progress: 20,
    lessons: [
      { id: 1, title: 'TypeScript Basics', duration: '20 min' },
      { id: 2, title: 'Interfaces and Types', duration: '25 min' },
      { id: 3, title: 'Generics', duration: '30 min' },
      { id: 4, title: 'Advanced Types', duration: '30 min' },
    ],
  },
]

interface CourseCardProps {
  course: typeof coursesData[0]
}

function CourseCard({ course }: CourseCardProps) {
  const [expanded, setExpanded] = useState(false)

  const categoryColors: Record<string, string> = {
    Frontend: 'from-blue-500 to-indigo-600',
    Programming: 'from-yellow-500 to-orange-600',
    Design: 'from-pink-500 to-rose-600',
    Backend: 'from-green-500 to-emerald-600',
  }

  const categoryColor = categoryColors[course.category] || 'from-blue-500 to-indigo-600'

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Course Header with Gradient */}
      <div className={`bg-linear-to-r ${categoryColor} p-6 text-white`}>
        <div className="flex items-start justify-between mb-3">
          <div className="text-5xl">{course.icon}</div>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
        <p className="text-white/90 text-sm">{course.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-linear-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      {/* Course Stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{course.lessons.length}</span> Lessons
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
          >
            {expanded ? 'Hide' : 'View'} Lessons
          </button>
        </div>
      </div>

      {/* Lessons List */}
      {expanded && (
        <div className="px-6 py-4 bg-white border-t border-gray-100 max-h-96 overflow-y-auto">
          <h4 className="font-bold text-gray-900 mb-4 text-base">Course Lessons:</h4>
          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer group"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm group-hover:bg-indigo-200">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">⏱️ {lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 px-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
            Start Course
          </button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const categories = ['All', 'Frontend', 'Backend', 'Programming', 'Design']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCourses = selectedCategory === 'All'
    ? coursesData
    : coursesData.filter(course => course.category === selectedCategory)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="pl-4 sm:pl-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                KnowledgeCatch
              </h1>
              <p className="text-gray-600">
                Expand your skills with our comprehensive courses
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/auth/login"
                className="px-6 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found in this category</p>
          </div>
        )}
      </main>

      {/* Footer Stats */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">{coursesData.length}</div>
              <p className="text-gray-300">Active Courses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">
                {coursesData.reduce((sum, c) => sum + c.lessons.length, 0)}
              </div>
              <p className="text-gray-300">Total Lessons</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">
                {Math.round(coursesData.reduce((sum, c) => sum + c.progress, 0) / coursesData.length)}%
              </div>
              <p className="text-gray-300">Average Progress</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 KnowledgeCatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

