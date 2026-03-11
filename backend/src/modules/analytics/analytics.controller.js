// analytics controller
const { getAdminAnalytics, getUserAnalytics } = require('./analytics.service');

exports.adminStats = (req, res, next) => {
  try {
    const data = getAdminAnalytics();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.userStats = (req, res, next) => {
  try {
    // user id could come from req.user or route param
    const userId = req.user?.id || req.params.userId;
    const data = getUserAnalytics(userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
