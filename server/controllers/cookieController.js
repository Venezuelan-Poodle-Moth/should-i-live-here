const cookieController = {};

// set cookie upon each visit to the root directory to store
cookieController.setCookie = (req, res, next) => {
  res.cookie('secret', Math.floor(Math.random() * 100));
  return next();
};

module.exports = cookieController;
