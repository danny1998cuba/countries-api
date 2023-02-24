var express = require('express');
var router = express.Router();

const mainMail = require('../controllers').mail

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'List of countries API' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'List of countries API | About' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'List of countries API | Contact' });
});

router.post('/feedback', async function (req, res, next) {
  const { name, email, phone, message } = req.body;
  try {
    await mainMail(name, email, 'Feedback List of countries API', message);
    res.redirect('/');
  } catch (error) {
    res.sendStatus(500);
  }

});

module.exports = router;
