const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  let token = req.cookies[process.env.COOKIE_NAME];
  res.locals.user = '';

  if (token) {
    try {
      let decodedToken = jwt.verify(token, process.env.SECRET);
      res.locals.user = decodedToken;
    } catch (error) {
      return res.redirect('/auth/login');
    }
  } else {
    return res.redirect('/auth/login');
  }

  next();
};

exports.isLoggedIn = (req, res, next) => {
  if (res.locals.user) return res.redirect('/');

  next();
};
