import request from '@/utils/request'

const Qs = require('qs')

export function login(username, password) {
  let jsonData = {
    'username': username,
    'password': password
  }
  return request({
    url: '/api/admin/login',
    method: 'post',
    data: Qs.stringify(jsonData)
  })
}

export function getInfo(username) {
  let jsonData = {
    'username': username
  }
  return request({
    url: '/api/admin/info',
    method: 'post',
    data: Qs.stringify(jsonData)
  })
}

export function logout(username) {
  let jsonData = {
    'username': username
  }
  return request({
    url: '/api/admin/logout',
    method: 'post',
    data: Qs.stringify(jsonData)
  })
}
