export const listQueryGoodsInfo = (options) => {
  let paid = parseInt(JSON.parse(options.body).parent);
  console.log(paid)
  if (paid == 0) {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data": {
        "currentPage": 1,
        "pageCount": 1,
        "pageSize": 10,
        "rows|13": [{
          "id": '@string("number", 2)',
          "imgUrl": 'https://pimg.dmcdn.cn/perform/project/1381/138121_n.jpg',
          "areaName": '@province',
          "itemName": '@csentence(5)',
          "abstractMessage": '@csentence()',
          "startTime": '@datetime("yyyy-MM-dd")',
          "endTime": '@datetime("yyyy-MM-dd")',
          "address": '@county(true)',
          // "latitude": '@float(3, 54, 1)',
          "latitude|+1": [
            "41.1",
            "32.9",
            "40.6",
            "38.8",
            "39.9",
            "41.3",
            "31.1",
            "41.1",
            "41.1",
            "41.1",
            "41.1",
            "41.1",
            "41.1",

          ],
          "longitude|+1": [
            "123.0",
            "117.3",
            "109.8",
            "115.4",
            "116.4",
            "123.7",
            "97.1",
            "125.3",
            "123.0",
            "123.0",
            "123.0",
            "123.0",
          ],
          "minPrice": '@integer(60, 100)',
          "maxPrice": '@integer(80, 300)'

        }],
        "total": '@integer(14, 40)'
      }
    }
  } else if (paid == 1) {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data": {
        "currentPage": 1,
        "pageCount": 1,
        "pageSize": 10,
        "rows|6": [{
          "id": '@string("number", 3)',
          "imgUrl": 'https://pimg.dmcdn.cn/perform/project/1381/138121_n.jpg',
          "areaName": '@province',
          "itemName": '@csentence(10)',
          "abstractMessage": '@csentence()',
          "startTime": '@datetime("yyyy-MM-dd")',
          "endTime": '@datetime("yyyy-MM-dd")',
          "address": '@county(true)',
          "latitude": '@float(3, 54, 3)',
          "longitude": '@float(73, 136, 3)',
          "minPrice": '@integer(60, 100)',
          "maxPrice": '@integer(80, 300)'
        }],
        "total": 6
      }
    }
  } else if (paid == 2) {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data": {
        "currentPage": 1,
        "pageCount": 1,
        "pageSize": 10,
        "rows|6": [{
          "id": '@string("number", 3)',
          "imgUrl": 'https://pimg.dmcdn.cn/perform/project/1381/138121_n.jpg',
          "areaName": '@province',
          "itemName": '@csentence(15)',
          "abstractMessage": '@csentence()',
          "startTime": '@datetime("yyyy-MM-dd")',
          "endTime": '@datetime("yyyy-MM-dd")',
          "address": '@county(true)',
          "latitude": '@float(3, 54, 3)',
          "longitude": '@float(73, 136, 3)',
          "minPrice": '@integer(60, 100)',
          "maxPrice": '@integer(80, 300)'
        }],
        "total": 6
      }
    }
  } else if (paid == 3) {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data": {
        "currentPage": 1,
        "pageCount": 1,
        "pageSize": 10,
        "rows|6": [{
          "id": '@string("number", 3)',
          "imgUrl": 'https://pimg.dmcdn.cn/perform/project/1381/138121_n.jpg',
          "areaName": '@province',
          "itemName": '@csentence(20)',
          "abstractMessage": '@csentence()',
          "startTime": '@datetime("yyyy-MM-dd")',
          "endTime": '@datetime("yyyy-MM-dd")',
          "address": '@county(true)',
          "latitude": '@float(3, 54, 3)',
          "longitude": '@float(73, 136, 3)',
          "minPrice": '@integer(60, 100)',
          "maxPrice": '@integer(80, 300)'
        }],
        "total": 6
      }
    }
  } else {
    return {
      "success": "string",
      "errorCode": "string",
      "msg": "",
      "data": {
        "currentPage": options,
        "pageCount": 1,
        "pageSize": 10,
        "total": 6
      }
    }
  }
}