/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 15:42:38
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-28 10:52:19
 */
import Mock from 'mockjs'
export const indexNavData = (params) => {
  return Mock.mock({
    success: '0000',
    errorCode: '0000',
    msg: '',
    'data|7': [{
      'id': '@id',
      'itemType|+1': ['演唱会', '音乐会', '歌剧话剧', '曲苑杂坛', '体育比赛', '儿童亲子', '舞蹈芭蕾'],
      'level': 1,
      'parent': 0,
      'aliasName|+1': ['戏剧', '体育', '亲子', '摇滚', '舞蹈古典'],
      'children|2-3': [{
        'id': '@id',
        /* 从属性值 array 中顺序选取 1 个元素，作为最终值。 */
        'itemType|+1': ['子类1', '子类2', '子类3', '子类4', '子类5', '子类6'],
        'level': 2,
        'parent': 1,
        'aliasName': ''
      }],
      'hotItems|4-5': [{
        'id': '@id',
        'itemName': '@csentence',
        'minPrice|100-1000': 123,
        'imgUrl|+1': ['/img/cardimg1.jpg',
          '/img/cardimg2.jpg',
          '/img/cardimg3.jpg',
          '/img/cardimg4.jpg',
          '/img/cardimg5.jpg'
        ]
      }]
    }]
  })
}