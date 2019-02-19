const { Router } = require('express');
const handlers = require('../handlers/user');
const { shouldAuthenticated } = require('../middlewares');

const router = Router();

router.get(
  '/me',
  shouldAuthenticated,
  handlers.view
);

module.exports = router;
