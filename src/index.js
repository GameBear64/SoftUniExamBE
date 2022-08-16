const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

mongoose
  .connect(`mongodb://0.0.0.0:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Successfully connected to DB!');
  })
  .catch(err => {
    return console.log(`Error with DB connection! - `, err);
  });

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(require('./router'));

app.listen(process.env.APP_PORT, () => console.log(`Site up at: http://localhost:${process.env.APP_PORT}/`));
