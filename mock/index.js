/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 15:39:33
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 09:57:55
 */
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 15:39:33
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-15 16:51:22
 */
const Mock = require('mockjs')
import { indexNavData } from './api_index_nav'
import { indexLineNavData } from './api_index_linenav'
import { indexCarouselData } from './api_index_carousel'
import { indexFloorData } from './api_index_floor'
import { indexRecommendData } from './api_index_recommend'
import { indexSellData } from './api_index_sell'
import { listQueryCity } from './api_list_querycity'
import { listSortGoods } from './api_list_sortgoods'
import { listQueryGoodsInfo } from './api_list_querygoodsinfo'
import { listGuessLike } from './api_list_guesslike'
import { descComments } from './api_desc_comments'
import { descCommend } from './api_desc_commend'
import { chooseSeatSeatList } from './api_choose_seat_seatlist'
import { payConfirmPay } from './api_pay_confirmpay'
import { orderTicketBuyerList } from './api_order-ticketbuyerlist'
import { orderQueryOrderList } from './api_order_queryorderlist'
import { userLogin } from './api_user_login'
/* 首页商品分类 */
Mock.mock('/api/index/nav', 'get', indexNavData())

/* 首页横向分类导航 */
Mock.mock('/api/index/linenav', 'get', indexLineNavData())

/* 首页轮播图数据 */
Mock.mock('/api/index/carousel', 'get', indexCarouselData())

/* 获取首页楼层数据 */
Mock.mock('/api/index/floor', 'get', indexFloorData())

/* 获取首页推荐数据 */
Mock.mock("/api/index/recommend", "get", indexRecommendData())

/* 获取首页即将开售数据 */
Mock.mock("/api/index/sell", "get", indexSellData())

/* 查询市区列表 */
Mock.mock("/api/list/querycity", 'get', listQueryCity())

/* 商品搜索页查询商品分类列表 */
Mock.mock(RegExp("/api/list/sortgoods" + ".*"), 'post', (options) => Mock.mock(listSortGoods(options)))

/* 商品搜索页根据查询条件获取商品信息 */
// Mock.mock(RegExp("/api/list/querygoodsinfo" + ".*"), 'post', (options) => Mock.mock(listQueryGoodsInfo(options)))

// 根据选择的ID进行猜你喜欢类型选择
Mock.mock(RegExp("/api/list/guesslike" + ".*"), 'post', (options) => Mock.mock(listGuessLike(options)))

// 获取评论列表
Mock.mock("/api/desc/comments", "get", descComments())

// 获取热门推荐列表
Mock.mock("/api/desc/commend", 'get', descCommend())

// 获取座位列表
// Mock.mock("/api/chooseseat/seatlist", 'get', chooseSeatSeatList())

// 根据订单号获取订单信息
Mock.mock("/api/pay/confirmpay", "get", payConfirmPay())

// 获取购票人信息
Mock.mock("/api/order/ticketbuyer", "get", orderTicketBuyerList())

// 获取订单信息
Mock.mock("/api/order/queryorderlist", "get", orderQueryOrderList())

// 登录
// Mock.mock(RegExp("/api/user/login" + ".*"), "POST", (options) => Mock.mock(userLogin(options)))