/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-09 14:31:08
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-09 14:36:33
 */
export const orderQueryOrderList = (params) => {
  return {
    success: '',
    errorCode: '0000',
    msg: '',
    "data|3": [{
      orderNo: "@id",
      sellTime: "@now()",
      itemName: "@csentence(20)",
      num: "@integer(1, 5)",
      price: "@integer(100, 200)",
      totalAmount: "@integer(600, 1000)",
      "orderType|1": [
        "-1",
        "0",
        "2"
      ],
      operate: ""
    }]
  }
}