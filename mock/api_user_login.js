/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 11:36:29
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-10 12:42:46
 */
export const userLogin = (params) => {
  console.log("params:::", params)
  const phone = JSON.parse(params.body).phone || ''
  console.log("phone:::", phone)
  let success = 0
  let errorCode = '0000'
  let msg = '登录成功'
  let data = {
      token: '@guid',
      extTime: '60',
      genTime: Math.round(Date.now() / 1000) + '',
      nickName: '巴巴爸爸'
    }
    // 13311112222 测试失败情况
  if (!phone || phone === '13311112222') {
    success = 1006
    errorCode = '1006'
    msg = '用户名或密码错误'
    data = null
  }
  return {
    success,
    errorCode,
    msg,
    data
  }
}