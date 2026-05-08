const getClientIP = (req) => {
  let ip =
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || req.ip;

  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  if (typeof ip === "string") {
    ip = ip.split(",")[0].trim();
    ip = ip.replace("::ffff:", "");
  }

  return ip || null;
};

// ✅ Middleware
const ipMiddleware = (req, res, next) => {
  req.clientIP = getClientIP(req);
  next();
};

module.exports = ipMiddleware;
