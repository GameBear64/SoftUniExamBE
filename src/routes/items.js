const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { Item } = require('../models/Crypto.js');

// === CREATE ===
router.get('/create', (req, res) => {
  // remember son, dying is gay
  // if(locals.user){}
  res.render('create');
});

router.post('/create', isNotLogged, async (req, res) => {
  try {
    await Item.create({ ...req.body, author: req.userInSession });
  } catch (error) {
    //handle better once you know what youll be handling
    res.render('create', { error });
  }

  res.redirect(`/catalog`);
});

// === READ ===
router.get('/details/:id', async (req, res) => {
  let item = await PostModel.findOne({ _id: ObjectId(req.params.id) });

  res.render('details', { ...item });
});

// === UPDATE ===
router.get('/edit/:id', async (req, res) => {
  let item = await PostModel.findOne({ _id: ObjectId(req.params.id) });
  if (item.owner != res.locals.user.userID) return;

  res.render('edit', { ...item });
});

router.post('/edit/:id', async (req, res) => {
  let item = await PostModel.findOne({ _id: ObjectId(req.params.id) });
  if (item.owner != res.locals.user.userID) return;

  try {
    await post.update({ ...req.body });
  } catch (error) {
    //handle better once you know what youll be handling
    res.render('create', { error });
  }

  res.redirect('/catalog');
});

// === DELETE ===
router.get('/delete/:id', async (req, res) => {
  let item = await PostModel.findOne({ _id: ObjectId(req.params.id) });
  if (item.owner != res.locals.user.userID) return;

  await item.delete();

  res.redirect('/catalog');
});

// === Action ===
router.post('/like/:id', async (req, res) => {
  let item = await PostModel.findOne({ _id: ObjectId(req.params.id) });

  await item.update({ $push: { likes: req.userInSession } }, { timestamps: false });

  res.redirect(`/crypto/details/${req.params.id}`);
});

module.exports = router;
