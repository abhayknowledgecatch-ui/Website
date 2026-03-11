'use client'

'use client'

import { useParams, useRouter } from 'next/navigation'
import { coursesData } from '@/app/lib/coursesData'

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = parseInt(params.courseId as string)

  const course = coursesData.find(c => c.id === courseId)

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const categoryColors: Record<string, string> = {
    Frontend: 'from-blue-500 to-indigo-600',
    Programming: 'from-yellow-500 to-orange-600',
    Design: 'from-pink-500 to-rose-600',
    Backend: 'from-green-500 to-emerald-600',
  }

  const categoryColor = categoryColors[course.category] || 'from-blue-500 to-indigo-600'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">KnowledgeCatch</h1>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </header>

      {/* Course Header */}
      <div className={`bg-gradient-to-r ${categoryColor} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-5xl mr-4">{course.icon}</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {course.category}
              </span>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-4">{course.title}</h2>
          <p className="text-xl text-white/90 mb-6">{course.description}</p>
          
          {/* Progress Bar */}
          <div className="max-w-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-lg font-bold">{course.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">About This Course</h3>
          <p className="text-gray-600 text-lg">{course.description}</p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Lessons</p>
                <p className="text-3xl font-bold text-indigo-600">{course.lessons.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Your Progress</p>
                <p className="text-3xl font-bold text-green-600">{course.progress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h3>
          <div className="grid grid-cols-1 gap-4">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <button
                  onClick={() => {
                    const lessonUrl = `/courses/${courseId}/${lesson.id}`
                    window.open(lessonUrl, '_blank', 'width=1200,height=800,menubar=no,toolbar=no')
                  }}
                  className="w-full p-6 text-left hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg group-hover:bg-indigo-200">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">⏱️ {lesson.duration}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full group-hover:bg-indigo-200">
                        Open Lesson
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all"
          >
            ← Back to Courses
          </button>
        </div>
      </main>
    </div>
  )
}
