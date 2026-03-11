// course service

// sample in-memory course list
let courses = [
  { id: 1, title: 'Intro to JavaScript', description: 'Learn JS basics', lessons: [] },
  { id: 2, title: 'Advanced CSS', description: 'Deep dive into CSS', lessons: [] }
];

function listCourses() {
  return courses;
}

function getCourse(id) {
  return courses.find(c => c.id === +id);
}

function createCourse(data) {
  const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
  const course = { id: newId, lessons: [], ...data };
  courses.push(course);
  return course;
}

function updateCourse(id, data) {
  const idx = courses.findIndex(c => c.id === +id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...data };
  return courses[idx];
}

function deleteCourse(id) {
  const idx = courses.findIndex(c => c.id === +id);
  if (idx === -1) return false;
  courses.splice(idx, 1);
  return true;
}

module.exports = { listCourses, getCourse, createCourse, updateCourse, deleteCourse };
