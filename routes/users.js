const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync.js');
const passport = require('passport');
const users = require('../controllers/users.js');

router
  .route('/register')
  .post(catchAsync(users.register))
  .get(users.renderRegister);

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      keepSessionInfo: true,
    }),
    users.login
  );

router.get('/logout', users.logout);

module.exports = router;
