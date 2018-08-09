exports.errorName = {
  ALREADY_ADDED: 'ALREADY_ADDED',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
}

exports.errorType = {
  ALREADY_ADDED: {
    message: 'This has already been added to your watchlist!',
    statusCode: 400,
  },
  NOT_FOUND: {
    message: 'Sorry, I can\'t find that movie or show',
    statusCode: 404,
  },
  UNAUTHORIZED: {
    message: 'Sorry, you need to be logged in for that...',
    statusCode: 401,
  },
}
