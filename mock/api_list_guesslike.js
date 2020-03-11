/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-31 10:37:55
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-31 19:40:16
 */
export const listGuessLike = (params) => {
  let itemTypeId = JSON.parse(params.body).itemTypeId
  if (itemTypeId == 0) {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data|3-5": [{
        "id": '@string("number", 2)',
        "itemName": '@csentence(5)',
        "imgUrl": 'https://pimg.dmcdn.cn/perform/project/1381/138121_n.jpg',
        "areaId": '@string("number", 3)',
        "areaName": '@province',
        "address": '@county(true)',
        "startDate": '@datetime("yyyy-MM-dd")',
        "endDate": '@datetime("yyyy-MM-dd")',
        "minPrice": '@integer(60, 100)'
      }]
    }
  } else if (itemTypeId == 1) {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data|3-4": [{
        "id": '@string("number", 2)',
        "itemName": '@csentence(10)',
        "imgUrl": 'https://pimg.dmcdn.cn/perform/project/1381/138121_n.jpg',
        "areaId": '@string("number", 3)',
        "areaName": '@province',
        "address": '@county(true)',
        "startDate": '@datetime("yyyy-MM-dd")',
        "endDate": '@datetime("yyyy-MM-dd")',
        "minPrice": '@integer(60, 100)'
      }]
    }
  } else {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data": {
        "currentPage": params,
        "pageCount": 1,
        "pageSize": 10,
        "total": 6
      }
    }
  }
}