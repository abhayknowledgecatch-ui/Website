// analytics service

// In a real application these would query the database.
// Here we use in-memory placeholders to demonstrate structure.

const users = [
  {
    id: 1,
    name: 'Alice',
    plan: 'premium',
    // progress: { courseId: { lessonId: percent, ... }, ... }
    progress: { '1': { '1': 100, '2': 50 }, '2': { '1': 10 } },
    loginHistory: [
      '2026-03-01',
      '2026-03-02',
      '2026-03-05',
    ],
    timeWatched: {
      '1': { // course 1
        total: 120, // minutes
        lessons: { '1': 60, '2': 60 }
      },
      '2': {
        total: 30,
        lessons: { '1': 30 }
      }
    }
  },
  {
    id: 2,
    name: 'Bob',
    plan: 'free',
    progress: {},
    loginHistory: ['2026-02-28'],
    timeWatched: {}
  }
];

const courses = [
  { id: 1, title: 'Intro to JS', lessons: [{ id: 1 }, { id: 2 }] },
  { id: 2, title: 'Advanced CSS', lessons: [{ id: 1 }] }
];

function getAdminAnalytics() {
  const totalUsers = users.length;
  const perUser = users.map(u => ({
    id: u.id,
    name: u.name,
    plan: u.plan,
    courseCount: courses.length,
    lessonCount: courses.reduce((sum, c) => sum + c.lessons.length, 0),
    timeWatched: u.timeWatched
  }));
  return {
    totalUsers,
    users: perUser,
    courseCount: courses.length,
    lessonCount: courses.reduce((sum, c) => sum + c.lessons.length, 0)
  };
}

function getUserAnalytics(userId) {
  const user = users.find(u => u.id === +userId);
  if (!user) throw new Error('User not found');

  return {
    progress: user.progress,
    loginHistory: user.loginHistory,
    timeWatched: user.timeWatched,
    // also include per-course total durations for charts
    courses: courses.map(c => ({
      id: c.id,
      lessonCount: c.lessons.length
    }))
  };
}

module.exports = { getAdminAnalytics, getUserAnalytics };
