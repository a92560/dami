/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 16:51:35
 * @LastEditors: Darren
 * @LastEditTime: 2020-01-22 11:03:05
 */
import Mock from 'mockjs'

export const listSortGoods = (options) => {
  options = JSON.parse(options.body).parent;
  let level = options == 0 ? '"level": 1' : ('"level|1-2":' + options);
  let levelParam = '{"id|+1": 1,  ' +
    '"itemType|+1": [  ' +
    '  "音乐会",  ' +
    '  "朗诵",  ' +
    '  "曲苑杂坛",  ' +
    '  "独奏",  ' +
    '  "管弦乐",  ' +
    '  "声乐及合唱",  ' +
    '],  ' +
    level + ',' +
    '"parent|1-3" : 0,  ' +
    'aliasName : ""  }'
  let json = eval('(' + levelParam + ')');
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    "data|6": [
      json
    ]
  }
}