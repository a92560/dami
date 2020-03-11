/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 14:02:57
 * @LastEditors: Darren
 * @LastEditTime: 2020-01-15 14:03:41
 */
import Mock from 'mockjs'
export const indexFloorData = () => {
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    'data|5': [{
      'index|+1': 1,
      // 'itemTypeName': function () {
      //   return '楼层' + this.index
      // },
      'itemTypeName|+1': ['戏剧达人', '体育赛事', '舞蹈古典', '儿童亲子', '摇滚在路上'],
      itemTypeId: '@id',
      'items|5': [{
        id: '@id',
        itemName: '@csentence',
        areaId: 100,
        areaName: '@city',
        address: '@city(true)',
        startDate: '@date',
        endDate: '@date',
        'imgUrl|+1': [
          '/img/big4.jpg',
          '/img/cardimg1.jpg',
          '/img/cardimg3.jpg',
          '/img/cardimg6.jpg',
          '/img/cardimg5.jpg',
          '/img/big5.jpg',
          '/img/cardimg6.jpg',
          '/img/cardimg3.jpg',
          '/img/cardimg4.jpg',
          '/img/cardimg5.jpg',
          '/img/big1.jpg',
          '/img/cardimg2.jpg',
          '/img/cardimg1.jpg',
          '/img/cardimg6.jpg',
          '/img/cardimg5.jpg',
          '/img/big2.jpg',
          '/img/cardimg2.jpg',
          '/img/cardimg3.jpg',
          '/img/cardimg4.jpg',
          '/img/cardimg5.jpg',
          '/img/big3.jpg',
          '/img/cardimg4.jpg',
          '/img/cardimg6.jpg',
          '/img/cardimg1.jpg',
          '/img/cardimg5.jpg'
        ],
        'minPrice|100-1000': 123
      }]
    }]
  }
}