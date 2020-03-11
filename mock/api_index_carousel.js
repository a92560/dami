/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 13:59:05
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-15 14:01:57
 */
import Mock from 'mockjs'
export const indexCarouselData = () => {
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    'data|2-4': [{
      id: '@id',
      itemName: '',
      minPrice: 111,
      'imgUrl|+1': [
        '/img/pic1.jpg',
        '/img/pic2.jpg',
        '/img/pic3.jpg'
      ]
    }]
  }
}