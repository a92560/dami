/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 16:59:40
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 16:31:45
 */
export const fourBreads = ['1&nbsp;选择商品', '2&nbsp;确认订单信息', '3&nbsp;支付订单', '4&nbsp;收取商品']

export const navMenus = [{
    title: "我的大觅",
    key: "/mine",
    icon: "el-icon-user-solid"
  },
  {
    title: "交易中心",
    key: "/mine/trade",
    icon: "el-icon-coin",
    children: [{
      title: "订单管理",
      key: "/mine/orderlist",
      icon: "el-icon-s-management",
    }]
  },
  {
    title: "账户中心",
    key: "/mine/account",
    icon: "el-icon-coin",
    children: [{
        title: "个人信息",
        key: "/mine/personal",
        icon: "el-icon-s-management",
      },
      {
        title: "常用购票人",
        key: "/mine/ticketbuyer",
        icon: "el-icon-s-management",
      }
    ]
  },

]

export const ticketBuyerColumns = [{
    type: "index",
    width: 60,
    align: "center",
    title: "#"
  },
  {
    title: "姓名",
    key: "name"
  },
  {
    title: "卡类型",
    key: "cardType"
  },
  {
    title: "身份证号",
    key: "cardId"
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    align: "center",
    template: true
  }
]

export const personalTabs = ['基本资料', '头像设置', '兴趣爱好']

export const loginTabs = ['账户登录', '短信快捷登录']

export const orderTypeFilterOptions = [{
    value: "",
    label: "全部订单"
  },
  {
    value: "2",
    label: "已取消"
  },
  {
    value: "1",
    label: "已支付"
  },
  {
    value: "0",
    label: "待支付"
  }
]

export const orderCreateTimeFilterOptions = [{
    value: "0",
    label: "全部"
  },
  {
    value: "1",
    label: "一年内"
  },
  {
    value: "2",
    label: "近3个月"
  }
]

export const orderListTableColumns = [{
    type: "expand",
    template: true,
    filterTemplate: true
  }, {
    title: "购买时间",
    key: "sellTime",
  },
  {
    title: "商品名称",
    key: "itemName"
  },
  {
    title: "订单金额",
    key: "totalAmount",
    width: 100
  },
  {
    title: "保险金额",
    key: "insuranceAmount",
    width: 100
  },
  {
    title: "交易状态",
    key: "orderType",
    width: 100
  },
  {
    title: "操作",
    key: "operate",
    width: 80,
    template: true,
    filterTemplate: true
  }
]

export const IMG_BASE_URL = process.env.VUE_APP_IMG_URL

export const TOKEN_KEY = 'DARREN_TOKEN'

export const SEAT_ARRAY_KEY = "DARREN_SEAT"

export const IMG_UPLOAD_ADDRESS = process.env.VUE_APP_IMG_UPLOAD_ADDRESS