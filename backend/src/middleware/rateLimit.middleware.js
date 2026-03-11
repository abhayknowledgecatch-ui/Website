// rate limiting middleware (simple in-memory)
const usage = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

module.exports = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const entry = usage[ip] || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count += 1;
  }

  usage[ip] = entry;

  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests, please try again later' });
  }

  next();
};
