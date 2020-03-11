# dami

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 功能介绍
1. 搜索相关Item详情
2. Item地点通过百度地图展示
3. 通过Item评论辨别当前Item质量


### 项目部分组件展示

1. 面包屑组件
```javascript
<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item 
        v-for="(item, i) in levelList"
        :key="item.path"
        >
        <!-- 不能跳转：路由没有配置重定向或者当前项已经是最后一项 -->
        <span
          v-if="item.redirect === 'noredirect' || i === levelList.length - 1"
          class="no-redirect"
        >{{item.meta.title}}</span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import pathToRegexp from "path-to-regexp"
export default {
  name: "MBreadCrumb",
  data () {
    return {
      levelList: []
    };
  },
  watch: {
    // 观察$route变化
    $route: {
      handler(route){
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  methods: {
    
    getBreadcrumb() {

      // /mine/orderlist
      // ['/', '/mine', '/mine/orderlist']
      // 面包屑仅显示包含meta.title 和 item.meta.breadcrumb 不为false的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb === true)
      // 不是以/mine开头的
      if(!this.isHome(matched[0])){
        matched = [{path: "/mine", redirect: "/mine", meta: {title: "我的大觅"}}].concat(matched)
      }
      /* // 以/mine/orderlist
      if(matched[1].path === '/mine/orderlist'){
        matched.splice(1, 0, {path: "/mine/trade/orderlist", redirect: "/mine/trade/orderlist", meta: {title: "交易中心"}})
      }

      // 以/mine/personal || /mine/ticketbuyer
      if(matched[1].path === '/mine/personal' || matched[1].path === '/mine/ticketbuyer'){
        matched.splice(1, 0, {path: "/mine/account/personal", redirect: "/mine/account/personal", meta: {title: "账户中心"}})
      } */

      this.levelList = matched
    },
    isHome(route){
      const name = route && route.name
      if(!name){
        return false
      }
      return name.trim().toLocaleLowerCase() === 'mine'.toLocaleLowerCase()
    },
    pathCompile(path){
      const {params} = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },

    handleLink(item){
      const {redirect, path} = item
      // 相同路径
      if(path === this.$route.path || redirect === this.$route.path){
        return 
      }
      if(redirect){
        this.$router.push(redirect)
        return 
      }

      // 编译path 避免存在路径参数
      this.$router.push(this.pathCompile(path))
    }


  },
}
</script>
<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
}
.app-breadcrumb{
  width: 100%;
  border: 1px solid #efefef;
  height: 38px;
  padding: 0 15px;
  box-sizing: border-box;
  padding-right: 0;
  line-height: 38px;
  color: #333;
  margin-bottom: 15px;
  background: linear-gradient(top, #efefef, #fff);
}
.app-breadcrumb.el-breadcrumb .no-redirect {
  color: #97a8be;
  cursor: text;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>

```


2. axios 封装

```javascript
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
    axios.default.baseURL = 'http://localhost:7001' // 注意最后这里要改成你当前后端运行地址
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
```

### 未来规划和展望
1. 希望添加oauth2.0授权登录
2. 添加历史浏览记录


