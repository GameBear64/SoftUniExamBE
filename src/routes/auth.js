const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { isLogged } = require('../middleware/auth');
const User = require('../models/User.js');

router.get('/logout', (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.redirect('/');
});

router.use(isLogged);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  user.comparePassword(password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '2d' });

      res.cookie(process.env.COOKIE_NAME, token);
      res.redirect('/');

      return;
    }

    return res.render('login', { error: 'Incorrect credentials' });
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { name, email, password, passwordAgain } = req.body;

  if (password !== passwordAgain) return res.render('register', { error: 'Passwords do not match!' });

  let user = await User.create({ name, email, password });
  const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '2d' });

  res.cookie(process.env.COOKIE_NAME, token);
  res.redirect('/');
});

module.exports = router;
