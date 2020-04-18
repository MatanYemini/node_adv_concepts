const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // after executing route handler
  await next();

  clearHash(req.user.id);
};
