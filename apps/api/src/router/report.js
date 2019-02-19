const { Router } = require('express');
const handlers = require('../handlers/report');
const { PERMISSIONS } = require('../lib/role-permissions');
const { shouldAuthenticated, createShouldAuthorized } = require('../middlewares')

const router = Router();

router.get(
  '/',
  shouldAuthenticated,
  createShouldAuthorized(PERMISSIONS.VIEW_REPORT),
  handlers.view
);
router.post(
  '/',
  shouldAuthenticated,
  createShouldAuthorized(PERMISSIONS.CREATE_REPORT),
  handlers.create
);

module.exports = router;
