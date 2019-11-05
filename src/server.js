import bodyParser from 'body-parser'
import session from 'express-session'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { sequelize } from './database.js'
import User from './models/user.js'
import House from './models/house.js'
import Review from './models/review.js'
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const sessionStore = new SequelizeStore({
  db: sequelize
})

// Run once to create sessions table in db:
//sessionStore.sync()
User.sync({ alter: true })
House.sync({ alter: true })
Review.sync({ alter: true })

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, done) {
      if (!email || !password) {
        done('Email and password required', null)
        return
      }

      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        done('User not found', null)
        return
      }

      const valid = await user.isPasswordValid(password)
      if (!valid) {
        done('Email and password do not match', null)
        return
      }

      done(null, user)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser((email, done) => {
  User.findOne({ where: { email: email } }).then(user => {
    done(null, user)
  })
})

polka() // You can also use Express
  .use(
    session({
      secret: '23dgaery325fasdftw0u[9un',
      resave: false,
      saveUninitialized: true,
      name: 'sveltebnb',
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
      },
      store: sessionStore
    }),
    bodyParser.json(),
    passport.initialize(),
    passport.session(),
    compression({ threshold: 0 }),
    sirv('static', { dev })
  )
  .use(
    sapper.middleware({
      session: req => {
        return {
          user: req.session && req.session.passport && req.session.passport.user
        }
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
