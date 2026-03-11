'use client'

import { useParams, useRouter } from 'next/navigation'
import { coursesData } from '@/app/lib/coursesData'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = parseInt(params.courseId as string)
  const lessonId = parseInt(params.lessonId as string)

  const course = coursesData.find(c => c.id === courseId)
  const lesson = course?.lessons.find(l => l.id === lessonId)

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist.</p>
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

  // Find lesson index for navigation
  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId)
  const previousLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KnowledgeCatch</h1>
              <p className="text-sm text-gray-600">{course.title}</p>
            </div>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <button onClick={() => window.history.back()} className="text-indigo-600 hover:text-indigo-700">
              {course.title}
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{lesson.title}</span>
          </div>
        </div>
      </div>

      {/* Lesson Header */}
      <div className={`bg-gradient-to-r ${categoryColor} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{course.icon}</span>
            <div>
              <p className="text-white/80">Lesson {lessonIndex + 1} of {course.lessons.length}</p>
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
            </div>
          </div>
          <p className="text-white/90">Duration: ⏱️ {lesson.duration}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lesson Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h2>
            
            {/* Placeholder content - replace with actual lesson content */}
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Welcome to <strong>{lesson.title}</strong> from the <strong>{course.title}</strong> course!
              </p>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-2">📚 Lesson Overview</h3>
                <p>
                  This section contains the detailed content for this lesson. Replace this placeholder with your actual lesson content including:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2">
                  <li>Detailed explanations and concepts</li>
                  <li>Code examples and snippets</li>
                  <li>Interactive practice exercises</li>
                  <li>Media content (videos, images, etc.)</li>
                  <li>Key takeaways and summary</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Concepts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Concept 1</h4>
                  <p className="text-sm">Add your first key concept here</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Concept 2</h4>
                  <p className="text-sm">Add your second key concept here</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practice</h3>
              <p>Add practice exercises, quizzes, or coding challenges here to help reinforce the lesson concepts.</p>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Lesson Progress</h3>
            <span className="text-2xl font-bold text-indigo-600">0%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8">
          {previousLesson ? (
            <button
              onClick={() => router.push(`/courses/${courseId}/${previousLesson.id}`)}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              ← Previous Lesson
            </button>
          ) : (
            <div className="flex-1"></div>
          )}
          
          <button
            onClick={() => router.push(`/courses/${courseId}`)}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all"
          >
            Back to Course
          </button>

          {nextLesson ? (
            <button
              onClick={() => router.push(`/courses/${courseId}/${nextLesson.id}`)}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Next Lesson →
            </button>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>

        {/* Completion Message */}
        {!nextLesson && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-900 mb-2">🎉 Course Complete!</h3>
            <p className="text-green-800">Great job completing all lessons in this course! Consider exploring other courses to expand your knowledge.</p>
          </div>
        )}
      </main>
    </div>
  )
}
