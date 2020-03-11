/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 14:08:21
 * @LastEditors: Darren
 * @LastEditTime: 2020-01-15 14:08:53
 */
import Mock from 'mockjs'

export const indexSellData = () => {
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    'data|6': [{
      'id': '@id',
      'itemName': '@csentence',
      'minPrice|100-1000': 123,
      'imgUrl|+1': [
        '/img/cardimg4.jpg',
        '/img/cardimg5.jpg',
        '/img/cardimg3.jpg',
        '/img/cardimg2.jpg',
        '/img/cardimg1.jpg'
      ]
    }]
  }
}