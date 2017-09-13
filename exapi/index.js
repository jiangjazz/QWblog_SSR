const express = require('express')
const request = require('request')

// Create express router
const router = express.Router()

// Transform req & res to have the same exapi as express
// So we can use res.status() & res.json()
let app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  request.post({url: 'http://admin.qteam.cc/api/login',
    form: {
      email: req.body.email,
      password: req.body.password
    }}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      req.session.authUser = JSON.parse(body)['access_token']
    }

    res.status(200).json(JSON.parse(body))
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  request.post({url: 'http://admin.qteam.cc/api/logout',
    headers: {
      'Authorization': 'Bearer ' + req.body.token
    }}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      delete req.session.authUser
    }

    res.status(200).json(JSON.parse(body))
  })
})

// Export the server middleware
module.exports = {
  path: '/exapi',
  handler: router
}
