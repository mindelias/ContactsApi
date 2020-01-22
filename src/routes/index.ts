import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Jennifer' });
});

router.get('/home', function(_req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/aminat', function(_req, res) {
  res.render('index', { title: 'Aminat' });
});

router.get('/birin', function(_req, res) {
  res.render('index', { title: 'Bibirinbulu' });
});

export default router;
