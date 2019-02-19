const ExtendableError = require('es6-error');

class HttpError extends ExtendableError {
  constructor (...args) {
    super(...args)
    this.payload = {
      message: this.message,
    }
  }
}

class AuthenticationError extends HttpError {
  constructor (message = 'You are not authenticated') {
    super(message)
    this.statusCode = 401
  }
}

class AuthorizationError extends HttpError {
  constructor (message = 'You are not authorized') {
    super(message)
    this.statusCode = 403
  }
}

class BadRequestError extends HttpError {
  constructor (message = 'Bad request') {
    super(message)
    this.statusCode = 400
  }
}

class UnprocessableEntityError extends HttpError {
  constructor (message = 'Cannot process request entity') {
    super(message)
    this.statusCode = 422
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  AuthenticationError,
  AuthorizationError,
  UnprocessableEntityError
}
