import ExtendableError from 'es6-error';

class AuthenticationError extends ExtendableError {
  constructor (message = 'You are not authenticated') {
    super(message)
    this.statusCode = 401
  }
}

class AuthorizationError extends ExtendableError {
  constructor (message = 'You are not authorized') {
    super(message)
    this.statusCode = 403
  }
}

class BadRequestError extends ExtendableError {
  constructor (message = 'Bad request') {
    super(message)
    this.statusCode = 400
  }
}

class UnprocessableEntityError extends ExtendableError {
  constructor (message = 'Cannot process request entity') {
    super(message)
    this.statusCode = 422
  }
}

module.exports = {
  BadRequestError,
  AuthenticationError,
  AuthorizationError,
  UnprocessableEntityError
}
