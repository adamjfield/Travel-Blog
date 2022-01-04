const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  console.log(req)
  res.render('dashboard');
});


module.exports = router;
