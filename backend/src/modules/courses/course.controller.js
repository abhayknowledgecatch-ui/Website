// course controller
const {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('./course.service');

exports.list = (req, res, next) => {
  try {
    res.json(listCourses());
  } catch (err) {
    next(err);
  }
};

exports.get = (req, res, next) => {
  try {
    const c = getCourse(req.params.courseId);
    if (!c) return res.status(404).json({ message: 'Course not found' });
    res.json(c);
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  try {
    const c = createCourse(req.body);
    res.status(201).json(c);
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const c = updateCourse(req.params.courseId, req.body);
    if (!c) return res.status(404).json({ message: 'Course not found' });
    res.json(c);
  } catch (err) {
    next(err);
  }
};

exports.remove = (req, res, next) => {
  try {
    const ok = deleteCourse(req.params.courseId);
    if (!ok) return res.status(404).json({ message: 'Course not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
