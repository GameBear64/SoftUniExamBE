const router = require('express').Router();

const { auth } = require('./middleware/auth');

const authPages = require('./routes/auth');
const homePages = require('./routes/home');

router.use('/auth', authPages);
router.use(auth);
router.use(homePages);

module.exports = router;
