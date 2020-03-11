/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 14:37:47
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 18:54:47
 */
import axios from 'axios'
import request from './request'

/* 获取首页商品分类导航 */
export function getNavs() {
  return request('GET', '/api/navs')
}

// 获取首页item数据
export function getIndexItem() {
  return request('GET', '/api/items/index')
}

// 评论数据
export function postCommentItem(params) {
  return request('GET', `/api/items/comments/${params.userId}`, params)
}

// 获取楼层数据
export function getFloorItems(params) {
  return request('GET', '/api/items/floor', params)
}

// 根据城市ID获取城市名称
export function getCity(params) {
  return request('GET', '/api/city', params)
}

export function getItemData(params) {
  return request('GET', '/api/items/desc', params)
}

// 获取item的座位信息
export function getItemSeat(params) {
  return request('GET', '/api/seats', params)
}

export function getUserData() {
  return request('GET', '/api/user/detail')
}

export function postUserAvatar(params) {
  return request('POST', '/api/user/avatar', params)
}

export function putUserDetail(params) {
  return request('PUT', '/api/user/detail', params)
}

export function getComments(params) {
  return request('GET', '/api/items/comments', params)
}

export function postItemComments(params) {
  return request('POST', '/api/user/comments', params)
}

/* 获取首页横向分类导航 */
export function getIndexLineNav() {
  return request('GET', '/api/index/linenav')
}

/* 获取首页轮播图数据 */
export function getIndexCarousel() {
  return request('GET', '/api/index/carousel')
}

/* 获取首页楼层数据 */
export function getIndexFloor() {
  return request('GET', '/api/index/floor')
}

/* 获取首页推荐数据 */
export function getIndexRecommend() {
  return request('GET', '/api/index/recommend')
}

/*  获取首页即将开售数据 */
export function getIndexSell() {
  return request('GET', '/api/index/sell')
}

/* 查询列表的市区列表 */
export function getListQueryCity() {
  return request('GET', '/api/cities/query')
}

/* 查询列表的分类列表 */
export function getListSortGoods(params) {
  return request('GET', '/api/navs/query', params)
}

/* 获取列表商品（各种查询条件） */
export function getListQueryGoodsInfo(params) {
  return request('GET', '/api/items', params)
}

/* 获取猜你喜欢商品列表 */
export function getListGuessLike(params) {
  return request('POST', '/api/list/guesslike', params)
}

//  获取评论列表
export function getDescComments(params) {
  return request('GET', '/api/desc/comments', params)
}

// 获取热门推荐列表
export function getDescCommend(params) {
  return request('GET', '/api/desc/commend', params)
}

// 获取座位列表
export function getChooseSeatSeatList(params) {
  return request('GET', '/api/seat', params)
}

// 获取订单详情
export function getPayConfirmPay(params) {
  return request('GET', '/api/pay/confirmpay', params)
}

// 获取购票人列表
export function getOrderTicketBuyerList() {
  return request('GET', '/api/user/ticketbuyers')
}

export function postTicketBuyer(params) {
  return request('POST', '/api/user/ticketbuyers', params)
}
// 删除购票人
export function deleteTicketBuyer(params) {
  return request('DELETE', '/api/user/ticketbuyers', params)
}

// 获取订单详情
export function getOrderList(params) {
  return request('GET', '/api/user/orders', params)
}

// 登录
export function postLogin(params) {
  return request('POST', '/api/user/login', params)
}

// 注册
export function postRegister(params) {
  return request('POST', '/api/user/register', params)
}

export function getEmail(params) {
  return request('GET', '/api/user/email', params)
}

// 获取所有省份
export function getProvinces() {
  return request('GET', '/api/provinces')
}

// 获取特定省份下的所有城市
export function getProCities(params) {
  return request('GET', '/api/cities', params)
}

export function postUserOrder(params) {
  return request('POST', '/api/user/orders', params)
}

export function getOrder(params, id) {
  return request('GET', `/api/user/orders/${id}`, params)
}

export function getAllCities(params) {
  return request('GET', '/api/allcities/hot', params)
}

export function getAllCitiesCategory(params) {
  return request('GET', '/api/allcities', params)
}

export function getAllCitiesSearch(params) {
  return request("GET", "/api/allcities/search", params)
}

export function getUsersAndMessages(params) {
  return request("GET", "/api/chats", params)
}

export function postMessage(params) {
  return request("POST", "/api/chats", params)
}

export function updateReadMessage(params) {
  return request("POST", "/api/chats/read", params)
}