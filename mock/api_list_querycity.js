/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 15:36:52
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-15 15:40:59
 */
import Mock from 'mockjs'

export const listQueryCity = () => {
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    "data|7": [{
      "id|+1": 1,
      "name|+1": [
        "北京",
        "上海",
        "深圳",
        "杭州",
        "广州",
        "成都",
        "西安"
      ]
    }]
  }
}