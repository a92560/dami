<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 23:09:47
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-14 19:34:09
 -->
<template>
  <div style="marginBottom: 100px;" class="footer-wrapper">
    <div class="footer-top container">
      <ul class="clearfix">
        <li>
          <dl>
            <dt>
              订购方式
            </dt>
            <dd>
              <a href="#">在线订购</a>
            </dd>
            <dd>
              <a href="#">电话订购</a>
            </dd>
            <dd>
              <a href="#">上门订购</a>
            </dd>
            <dd>
              <a href="#">大客户团体订购</a>
            </dd>
            <dd>
              <a href="#">大觅超级票订购</a>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>配送方式</dt>
            <dd>
              <a href="#">送货上门</a>
            </dd>
            <dd>
              <a href="#">电子票</a>
            </dd>
            <dd>
              <a href="#">上门自取</a>
            </dd>
            <dd>
              <a href="#">大觅自助机换票</a>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>支付方式</dt>
            <dd>
              <a href="#">在线支付</a>
            </dd>
            <dd>
              <a href="#">柜台付款</a>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>大觅网微信</dt>
            <dd>
              <span class="t-code"><img :src="imgcode" alt=""> </span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>大觅网触屏版</dt>
            <dd>
              <span class="t-code"><img :src="imgcode" alt=""> </span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>账户安全</dt>
            <dd>
              <a href="#">找回密码</a>
            </dd>
            <dd>
              <a href="#">账户注册</a>
            </dd>
            <dd>
              <a href="#">账户绑定</a>
            </dd>
            <dd>
              <a href="#">SSL安全证书</a>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>配送方式</dt>
            <dd>
              <a href="#">退换及缺货说明</a>
            </dd>
            <dd>
              <a href="#">发票帮助</a>
            </dd>
            <dd>
              <a href="#">订票服务条款</a>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>特色服务</dt>
            <dd>
              <a href="#">演出订阅</a>
            </dd>
          </dl>
        </li>
      </ul>
    </div>

    <!-- 链接 -->
    <div class="t-link tc h4">
      <a href="#">公司介绍</a>&nbsp;|
      <a href="#">品牌识别</a>&nbsp;|
      <a href="#">企业荣誉</a>&nbsp;|
      <a href="#">隐私声明</a>&nbsp;|
      <a href="#">联系及合作</a>&nbsp;|
      <a href="#">招聘信息</a>&nbsp;|
      <a href="#">网站地图</a>&nbsp;|
      <a href="#">友情链接</a>&nbsp;|
      <a href="#">公司大事记</a>
    </div>

    <!-- 版权 -->
    <div class="t-copyright tc">
      <!-- 动态绑定一个key 就不会报警告了 -->
      <a href="#" v-for="(item,index) in copyrights" :key="index">
        <img :src="item.imgurl" />
      </a>
    </div>
  </div>
</template>
<script>
import er_code from './img/p_code.jpg'
// 版权图片
import piao from "./img/piao.png";
import dzyy from "./img/dzyy.png";
import siteseal from "./img/siteseal_gd_3.gif";
import pci from "./img/pci.png";
import xin from "./img/xin.png";
import chengxin from "./img/chengxin.png";
export default {
  name: "Footer",
  data () {
    return {
      imgcode: er_code,
      copyrights: [
        { imgurl: piao },
        { imgurl: dzyy },
        { imgurl: siteseal },
        { imgurl: pci },
        { imgurl: xin },
        { imgurl: chengxin }
      ]
    };
  }
}
</script>
<style lang="less" scoped>
.footer-wrapper{
  background: #e6e6e6;
  color: #333333;
  .footer-top{
    margin-top: 30px;
    border-bottom: 2px solid @HoverC;
    ul{
      padding-bottom: 20px;
      >li{
        width: 12.5%;
        float: left;
        box-sizing: border-box;
        margin-right: 4px;
        &:last-of-type{
          width: 9%;
        }
        dt{
          font-size: 14px;
          padding: 50px 0 15px 0; 
        }
        dd{
          padding: 6px 0; 
        }
      }
    }
    
  }

  .t-link{
    padding: 15px 0;
    a{
      color: #7a667a;
      display: inline-block;
    } 
  }

  // 版权信息
  .t-copyright {
    img {
      margin-right: 20px;
    }
  }
}


</style>