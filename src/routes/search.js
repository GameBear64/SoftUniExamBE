const router = require('express').Router();
const { Item } = require('../models/Item.js');

router.get('/', async (req, res) => {
  let items = await Item.find({});

  res.render('search', { items });
});

router.post('/', async (req, res) => {
  let { search } = req.body;

  // prettier-ignore
  let itemFind = await Item.find({
    $match: {
      $or: [
        { name: { $regex: search, $options: 'i' } }, 
        { description: { $regex: search, $options: 'i' } }
      ],
    },
  })

  res.render('search', { itemFind });
});

module.exports = router;
