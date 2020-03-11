/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 13:54:04
 * @LastEditors: Darren
 * @LastEditTime: 2020-01-15 13:54:57
 */
import Mock from 'mockjs'

export const indexLineNavData = () => {
  return {
    success: '0000',
    errorCode: '0000',
    msg: '',
    // 'data|5': [{
    //   'id': '@id',
    //   'itemType|+1': ['演唱会', '音乐会', '歌剧话剧', '曲苑杂坛', '体育比赛', '儿童亲子', '舞蹈芭蕾'],
    //   'level': 1,
    //   'aliasName|+1': ['戏剧', '体育', '亲子', '摇滚', '舞蹈古典']
    // }]

    "data": [{
        "id": 21,
        "itemName": "戏曲",
        "level": "2",
        "parent": 3,
        'key': 'default',
        "aliasName": "戏剧"
      },
      {
        "id": 5,
        "itemName": "体育比赛",
        "level": "1",
        "parent": 0,
        'key': 'default',
        "aliasName": "体育"
      },
      {
        "id": 8,
        "itemName": "儿童亲子",
        "level": "1",
        "parent": 0,
        'key': 'template_child',
        "aliasName": "亲子"
      },
      {
        "id": 6,
        "itemName": "舞蹈芭蕾",
        "level": "1",
        "parent": 0,
        'key': 'default',
        "aliasName": "舞蹈古典"
      },
      {
        "id": 11,
        "itemName": "摇滚",
        "level": "2",
        "parent": 1,
        'key': 'default',
        "aliasName": "摇滚"
      }
    ]
  }
}