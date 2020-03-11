/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 14:19:40
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 10:36:00
 */
import axios from 'axios'
import jsonp from 'jsonp'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Message, MessageBox } from 'element-ui'
import { TOKEN_KEY } from '@/config'

const timeout = 10000
const jsonpConfig = {
  timeout,
}

const axiosConfig = {
  timeout,
  // withCredentials: false
}
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'https://www.anqistudy.com/dami'
    break
  case 'test':
    axios.default.baseURL =
      'https://www.easy-mock.com/mock/5e1ad3810e3372179ec5b3e8/dami/api'
    break
  case 'localhost':
    axios.default.baseURL = 'http://localhost:5000/api/dami'
  default:
    axios.default.baseURL = 'http://localhost:7001'
}

/* 拦截器 */
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem(TOKEN_KEY)
      // 设置URL白名单 性能问题
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  err => {
    Message({
      type: 'error',
      message: err.message,
    })
  }
)

axios.interceptors.response.use(
  response => {
    // 设置白名单
    let { data, config } = response
    // 一般错误拦截
    if (data && data.code !== 0 && data.code !== 666) {
      Message.error(data.message)
      return
    }
    // 篡改路由地址
    if (data && data.code !== 0 && data.code === 777) {
      Message.error(data.message)
      router.push("/")
      return
    }
    if (data.code === 0 && config.url === '/api/user/login') {
      localStorage.setItem(TOKEN_KEY, data.data.token)
    }
    // token过期了
    if (data.code === 666) {
      const path = router.app.$route.fullPath
      Message.error(data.message)
      router.replace(`/login?redirect=${path}`)
      return
    }
    return data
  },
  err => {
    console.log('response err', err)
    Message.error(err.message)
  }
)

export default (method = 'GET', url, option = {}) => {
  // 默认是post / delete / patch
  let isPost = true
  const config = option.config || {}
  delete option.config

  /*  在线测试 */
  // url = axios.default.baseURL + url

  method = (method || '').toUpperCase()

  /*  这些方法不用直接携带data的哦 */
  if (['GET', 'HEAD', 'DELETE', 'JSONP'].indexOf(method) > -1) {
    if (axios.defaults.baseURL === 'http://localhost:8080/api') {
      console.log('skip')
      return
    }
    const query = qs.stringify(option.data, {
      addQueryPrefix: true,
    })

    isPost = false

    if (url.indexOf('?') > -1) {
      url += query.replace('?', '&')
    } else {
      url += query
    }
  }

  /* JSONP 请求 */

  if (method === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {...jsonpConfig, ...config }, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  const makeConfig = { method, url }
  if (isPost) {
    makeConfig.data = option
  }

  return axios({
    ...axiosConfig,
    ...makeConfig,
    ...config,
    /* headers: {
      "Content-Type": "application/json"
    } */
  })
}