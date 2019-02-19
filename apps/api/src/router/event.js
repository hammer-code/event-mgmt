const { Router } = require('express');
const handlers = require('../handlers/event');
const { PERMISSIONS } = require('../lib/role-permissions');
const { shouldAuthenticated, createShouldAuthorized } = require('../middlewares')

const router = Router();

router.get('/', handlers.index);

router.post(
  '/',
  shouldAuthenticated,
  createShouldAuthorized(PERMISSIONS.CREATE_EVENT),
  handlers.create
);

router.get('/:id', handlers.view);

router.patch(
  '/:id',
  shouldAuthenticated,
  createShouldAuthorized(PERMISSIONS.UPDATE_EVENT),
  handlers.update
);

router.delete(
  '/:id',
  shouldAuthenticated,
  createShouldAuthorized(PERMISSIONS.REMOVE_EVENT),
  handlers.remove
);

module.exports = router;
