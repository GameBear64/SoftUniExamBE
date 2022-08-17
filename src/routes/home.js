const router = require('express').Router();
const { Item } = require('../models/Item.js');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/catalog', async (req, res) => {
  let items = await Item.find({}).populate('author');

  res.render('catalog', { items });
});

module.exports = router;
