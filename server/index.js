const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const expressGraphQL = require('express-graphql')
const keys = require('../keys.json')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')

const { errorType } = require('./services/errors')
const models = require('./models')
const schema = require('./schema/schema')
const winston = require('./winston-config')
const updateShows = require('./services/update')

const MongoStore = require('connect-mongo')(session)

const getErrorCode = errorName => errorType[errorName]

/**
 * Create the web server.
 */
const app = express()
const PORT = process.env.PORT || 3000

/**
 * Connect to the Database.
 */
const MONGO_URI = 'mongodb://default:default@ds113648.mlab.com:13648/subscribe-show'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

/**
 * Configure the server
 */
const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined', { stream: winston.stream }))

/**
 * Configures express to use sessions.  This places an encrypted identifier
 * on the users cookie.  When a user makes a request, this middleware examines
 * the cookie and modifies the request object to indicate which user made the request
 * The cookie itself only contains the id of a session more data about the session
 * is stored inside of MongoDB.
 */

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: keys.session,
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true,
  }),
}))

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize())
app.use(passport.session())

/**
 * Set up the route for GraphQL queries.
 */
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  formatError: (err) => {
    const error = getErrorCode(err.message)
    if (error) {
      return ({ message: error.message, statusCode: error.statusCode })
    }
    return err
  },
}))

/**
 * Open the web server.
 */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
