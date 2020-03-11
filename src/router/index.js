/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 22:59:47
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 14:36:25
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/index'
import Register from '@/pages/register'
import Login from '@/pages/login'
import TicketList from '@/pages/ticket-list'
import TicketDesc from '@/pages/ticket-desc'
import TicketChooseSeat from '@/pages/ticket-choose-seat'
import OrderConfirm from '@/pages/order-confirm'
import SubmitOrder from '@/pages/submit-order'
import PayMethod from '@/pages/pay-method'
import WechatPay from '@/pages/wechat-pay'
import Mine from '@/pages/mine'
import OrderList from '@/pages/order-list'
import Personal from '@/pages/personal'
import TicketBuyer from '@/pages/ticket-buyer'
import ChangeCity from '@/pages/change-city'
import Service from '@/pages/chat'
import NotFound from '@/pages/404'
import { TOKEN_KEY } from '@/config'
import { Message, MessageBox } from 'element-ui'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    name: "Index",
    path: "/",
    component: Index,
    meta: {
      switch: true
    }
  }, {
    name: "Register",
    path: "/reg",
    component: Register,
    meta: {
      isShowFooter: false,
      isShowHeader: false
    }
  }, {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      isShowFooter: false,
      isShowHeader: false
    }
  }, {
    name: "TicketList",
    path: "/ticketlist",
    component: TicketList
  }, {
    name: "TicketDesc",
    path: "/ticketdesc",
    component: TicketDesc,
    meta: {
      isShowSearchBar: true,
    }
  }, {
    name: "TicketChooseSeat",
    path: "/ticketchooseseat",
    component: TicketChooseSeat,
    meta: {
      isShowSearchBar: false,
      requireAuth: true
    }
  }, {
    name: "OrderConfirm",
    path: "/orderconfirm",
    component: OrderConfirm,
    meta: {
      isShowSearchBar: false,
      isShowFooterSimple: true,
      requireAuth: true
    }
  }, {
    name: "SubmitOrder",
    path: "/submitorder",
    component: SubmitOrder,
    meta: {
      requireAuth: true
    }
  }, {
    name: "Service",
    path: "/service",
    component: Service,
    meta: {
      requireAuth: true
    }
  }, {
    name: "PayMethod",
    path: "/paymethod",
    component: PayMethod,
    meta: {
      isShowSearchBar: false,
      isShowFooterSimple: true,
      requireAuth: true
    }
  }, {
    name: "WechatPay",
    path: "/wechatpay",
    component: WechatPay,
    meta: {
      isShowSearchBar: false,
      isShowFooterSimple: true,
      requireAuth: true
    }
  }, {
    name: "ChangeCity",
    path: "/changecity",
    component: ChangeCity,
  }, {
    name: "Mine",
    path: "/mine",
    component: Mine,
    redirect: "/mine/personal",
    meta: {
      breadcrumb: true,
      title: "我的大觅"
    },
    children: [{
      name: "OrderList",
      path: "/mine/orderlist",
      component: OrderList,
      meta: {
        breadcrumb: true,
        title: "订单管理",
        requireAuth: true
      },
    }, {
      name: "Personal",
      path: "/mine/personal",
      component: Personal,
      meta: {
        breadcrumb: true,
        title: "个人信息",
        requireAuth: true
      }
    }, {
      name: "TicketBuyer",
      path: "/mine/ticketbuyer",
      component: TicketBuyer,
      meta: {
        breadcrumb: true,
        title: "常用购票人",
        requireAuth: true
      }
    }]
  }, {
    name: "404",
    path: "/404",
    component: NotFound,
  }, {
    path: "*",
    redirect: "/404",
    component: NotFound,
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook}
  if (to.meta.requireAuth) {
    if (!window.localStorage.getItem(TOKEN_KEY)) {
      Message.error("请先登录")
      router.replace(`/login?redirect=${to.fullPath}`)
        // next()
    }
  } else if (!to.meta.requireAuth) {
    // 不需要权限  但检测到token过期
    // if (!window.localStorage.getItem(TOKEN_KEY)) {
    //   // const whiteList = ['/']
    //   const path = to.fullPath
    //   if (whiteList.indexOf(path)  -1) {
    //     MessageBox.confirm('是否要重新登录', '登录信息过期', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //       })
    //       .then(() => {
    //         router.replace(`/login?redirect=${path}`)
    //       })
    //       .catch(() => {
    //         next()
    //       })
    //     return
    //   } else {
    //     next()
    //   }
    // }
  }
  next()
})

export default router