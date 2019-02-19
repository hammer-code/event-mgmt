const jwt = require('jsonwebtoken');
const userService = require('./services/user');
const { isPermitted } = require('./lib/role-permissions');
const { AuthenticationError, AuthorizationError } = require('./lib/errors');

async function shouldAuthenticated(request, response, next) {
  const authHeader = request.header('Authorization');

  if (!authHeader) {
    return next(new AuthenticationError('Authorization header is not present'))
  }

  const [, token] = authHeader.split('Bearer ')

  let decoded = null

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return next(new AuthenticationError('Not valid token'))
  }

  const foundUser = await userService.findById(decoded.userId)

  if (!foundUser) {
    return next(new AuthenticationError('User was not found'))
  }

  request.userId = decoded.userId

  next()
}

function createShouldAuthorized (permission) {
  return async function shouldAuthorized (request, response, next) {
    const user = await userService.findById(request.userId)

    if (!isPermitted(permission, user)) {
      return next(new AuthorizationError('You are not allowed to access/perform action'))
    }

    next()
  }
}

module.exports = {
  shouldAuthenticated,
  createShouldAuthorized
}
