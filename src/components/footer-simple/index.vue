<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 14:54:24
 * @LastEditors: Darren
 * @LastEditTime: 2020-02-06 14:55:02
 -->
<template>
  <footer>
    <ul class=" clearfix">
      <li>
        <a href="javascript:;">公司介绍</a>
      </li>
      <li>
        <a href="javascript:;">品牌识别</a>
      </li>
      <li>
        <a href="javascript:;">企业荣誉</a>
      </li>
      <li>
        <a href="javascript:;">隐私声明</a>
      </li>
      <li>
        <a href="javascript:;">联系及合作</a>
      </li>
      <li>
        <a href="javascript:;">招聘信息</a>
      </li>
      <li>
        <a href="javascript:;">网站地图</a>
      </li>
      <li>
        <a href="javascript:;">友情链接</a>
      </li>
      <li>
        <a href="javascript:;">公司大事记</a>
      </li>
    </ul>
    <p>京ICP证031086号 | 京ICP备1013248号 | 京公安网11032040599500349号 | 广播电视节目制作经营许可证（京）字第032256号</p>
    <p>网络文化经营许可证 京网文[2018]3243-534号 | 营业性演出许可证 京市演出888号</p>
    <p>北京阿博文化有限公司 大觅网 Copyright 2008-2018 All Right Reserved</p>
  </footer>

</template>
<script>
export default {
  name: "FooterSimple"
}
</script>
<style lang='less' scoped>
footer {
  width: 100%;
  // background-color: #e6e6e6;
  text-align: center;
  // position: fixed;
  // bottom: 0;
  ul {
    width: 900px;
    margin: 0 auto 40px;
    padding: 20px 0;
  }
  li {
    float: left;
    padding: 12px;
  }
  li:after {
    content: "|";
    padding-left: 12px;
  }
  li:last-child:after {
    content: "";
  }
  p {
    line-height: 20px;
    margin: 10px 0;
  }
}
</style>
