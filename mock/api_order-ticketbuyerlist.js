/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-08 15:24:01
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-08 16:07:11
 */
export const orderTicketBuyerList = (params) => {
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    "data|3": [{
      // 联系人ID
      linkId: "@id()",
      // 用户姓名
      name: '@cname()',
      // 身份证号码
      cardId: "372892303849230398",
      // 	字符串	卡类型(0:身份证,1:军官证)
      cardType: '0'
    }]
  }
}