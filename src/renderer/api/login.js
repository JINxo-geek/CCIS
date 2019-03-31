import request from '@/utils/request'

export function login(username, password) {
  var data2 = request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
  return data2
}

export function getInfo(token) {
  console.log('执行了getInfo函数' + token)
  var data = request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
  console.log(typeof data)
  console.log(data)
  return data
}

export function logout() {
  return request({// 退出接口等到code=20000成功
    url: '/repo/getAll',
    method: 'get'
  })
}
