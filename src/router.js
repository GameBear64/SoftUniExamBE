const router = require('express').Router();

const { auth } = require('./middleware/auth');

const authPages = require('./routes/auth');
const homePages = require('./routes/home');
const searchPages = require('./routes/search');
const itemPages = require('./routes/item');

//no user required
router.use('/auth', authPages);
router.use(homePages);

//user required
router.use(auth);
router.use(homePages);
router.use('/item', itemPages);
router.use('/search', searchPages);

module.exports = router;
