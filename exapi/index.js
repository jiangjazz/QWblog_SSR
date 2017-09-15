const express = require('express')
const request = require('request')

// 创建express路由
const router = express.Router()

// 全局api请求地址
const apiURL = 'http://admin.qteam.cc/api'

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
  request.post({url: `${apiURL}/login`,
    form: {
      email: req.body.email,
      password: req.body.password
    }}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      req.session.userInfo = JSON.parse(body)['user']
      req.session.authUser = JSON.parse(body)['access_token']
    }

    res.status(200).json(JSON.parse(body))
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  request.post({url: `${apiURL}/logout`,
    headers: {
      'Authorization': 'Bearer ' + req.body.token
    }}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      req.session.authUser = JSON.parse(body)['access_token']
    }

    res.status(200).json(JSON.parse(body))
  })
})

router.post('/token', (req, res) => {
  request.post({url: `${apiURL}/token`,
    form: {
      token: req.body.token
    }}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      req.session.authUser = JSON.parse(body)['access_token']
    }

    res.status(200).json(JSON.parse(body))
  })
})

// 导入模块
module.exports = {
  path: '/exapi',
  handler: router
}
