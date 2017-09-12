// This code will be injected before initializing the root App
import Vue from 'vue'

if (process.BROWSER_BUILD) {
  const particles = require('particles.js')
  Vue.use(particles)
}
