const jwt = require('jsonwebtoken');
const userService = require('./services/user');
const { isPermitted } = require('./lib/role-permissions');

async function shouldAuthenticated(request, response, next) {
  const authHeader = request.header('Authorization');

  if (!authHeader) {
    return next(new Error('Authorization header is not present'))
  }

  const [, token] = authHeader.split('Bearer ')

  let decoded = null

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return next(error)
  }

  const foundUser = await userService.findById(decoded.userId)

  if (!foundUser) {
    return next(Error('User not found'))
  }

  request.userId = decoded.userId

  next()
}

function createShouldAuthorized (permission) {
  return async function shouldAuthorized (request, response, next) {
    const user = await userService.findById(request.userId)

    if (!isPermitted(permission, user)) {
      return next(new Error('You are not allowed to access/perform action'))
    }

    next()
  }
}

module.exports = {
  shouldAuthenticated,
  createShouldAuthorized
}
