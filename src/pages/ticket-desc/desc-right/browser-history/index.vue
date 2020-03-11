<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-02 15:56:21
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-03 15:37:19
 -->
<template>
  <div class="browser-history">
    <div class="title">
      <span>浏览历史</span>
    </div>
    <ul>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
      <li>大型多媒体励志互动儿童剧《爱丽丝梦游仙境》（11月）</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "BrowserHistory",
  data () {
    return {
    };
  }
}
</script>
<style lang="less" scoped>
.browser-history{
  width: 290px;
  >div.title{
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    margin-left: 5px;
    >span{
      display: inline-block;
      margin: 8px 0;
    }
  }
  >ul{
    >li{
      padding: 4px;
      border-bottom: 1px dotted #ccc;
      margin: 0 0 10px 3px;
      line-height: 1.2;
    }
  }
}
</style>