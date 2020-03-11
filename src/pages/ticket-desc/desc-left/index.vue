<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-01 20:01:59
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-08 16:35:35
 -->
<template>
  <div class="desc-left">
    <ul class="tabs clearfix">
      <li
        :class="['tab', { active: activeIndex === index }]"
        v-for="(item, index) in [
          '演出信息',
          '精彩剧评',
          '购买说明',
          '付款方式',
        ]"
        :key="index"
        @click="handleTabShow(index)"
      >
        {{ item }}
      </li>
    </ul>
    <desc-block-item title="基本信息">
      <div class="content information">
        <table>
          <tr class="row">
            <td class="column">演出时间</td>
            <td class="column">2018.01.06-01.14</td>
            <td class="column">演出场馆</td>
            <td class="column">光华路5号国际会展中心三楼湖西岛音乐厅</td>
          </tr>
          <tr class="row">
            <td class="column">演出时间</td>
            <td class="column">2018.01.06-01.14</td>
            <td class="column">演出场馆</td>
            <td class="column">
              <p>光华路5号国际会展中心三楼湖西岛音乐厅</p>
              <p>光华路5号国际会展中心三楼湖西岛音乐厅</p>
              <p>光华路5号国际会展中心三楼湖西岛音乐厅</p>
              <p>光华路5号国际会展中心三楼湖西岛音乐厅</p>
              <p>光华路5号国际会展中心三楼湖西岛音乐厅</p>
              <p>光华路5号国际会展中心三楼湖西岛音乐厅</p>
            </td>
          </tr>
        </table>
      </div>
    </desc-block-item>
    <desc-block-item title="项目介绍">
      <div class="content introduction">
        <div class="normal entrance">英文站入口</div>
        <p class="english-link">
          英文站购买链接：https://en.dami.cn/event/tickets_135693/
        </p>
        <div class="normal show-intro">演出介绍</div>
        <p>世界经典原版音乐剧《猫》</p>
        <p>猫的足迹</p>
        <p>
          超过20种语言，30个国家，300座城市，7300万观众超过20种语言，30个国家，300座城市，7300万观众超过20种语言，30个国家，300座城市，7300万观众超过20种语言，30个国家，300座城市，7300万观众超过20种语言，30个国家，300座城市，7300万观众超过20种语言，30个国家，300座城市，7300万观众超过20种语言，30个国家，300座城市，7300万观众
        </p>
        <p>横扫7座托尼奖，囊获奥利弗奖、格莱美奖等全球主要奖项</p>
        <p>伦敦西区及纽约百老汇有史以来成功、连续公演最久的音乐剧之一</p>
        <p class="p-img">
          <img :src="imgUrl" alt="" />
        </p>
        <p>伦敦西区及纽约百老汇有史以来成功、连续公演最久的音乐剧之一</p>
        <p>伦敦西区及纽约百老汇有史以来成功、连续公演最久的音乐剧之一</p>
        <p>伦敦西区及纽约百老汇有史以来成功、连续公演最久的音乐剧之一</p>
      </div>
    </desc-block-item>
    <desc-block-item title="写剧评">
      <div class="content write-comment">
        <div class="rate-content">
          <div class="rate-selection">
            <div class="text">打个分吧</div>
            <el-rate
              class="rate"
              v-model="rate"
              show-score
              :colors="['#ff3c1b', '#ff3c1b', '#ff3c1b']"
              @change="handleScoreChange"
            ></el-rate>
          </div>
          <textarea
            placeholder="写个评价吧10-10000字"
            cols="30"
            rows="5"
            v-model="content"
          ></textarea>
          <button class="comment-btn" @click="handleToComment">评价</button>
        </div>
      </div>
      <ul class="comment-list">
        <comment-item
          v-for="comment in itemComments"
          :itemData="comment.comments"
          :userDocs="comment.user_docs"
          :key="comment.comments._id"
        >
        </comment-item>
      </ul>
    </desc-block-item>
  </div>
</template>
<script>
import DescBlockItem from '../desc-block-item'
import CommentItem from './comment-item'
export default {
  name: 'DescLeft',
  components: {
    DescBlockItem,
    CommentItem,
  },
  data() {
    return {
      activeIndex: 0,
      imgUrl: '/img/calendar01.png',
      rate: 0,
      content: '',
    }
  },
  props: {
    itemComments: {
      type: Array,
      defatul: [],
    },
  },
  methods: {
    handleTabShow(index) {
      this.activeIndex = index
    },
    handleScoreChange(score) {
      this.rate = score
    },
    async handleToComment() {
      const { content, rate } = this
      this.$emit('handleToComment', { rate, content }, (isCommented) => {
        if(isCommented) {
          this.rate = 0
          this.content = ''
        }
      })
    },
    async getComments() {
      // const ret = await this.$http.getComments({
      //   data: { id: this.$route.query.id || '' },
      // })
      // if (ret) {
      //   this.comments = ret.data[0].comments
      // }
      this.$emit('getComments')
    },
  },
}
</script>
<style lang="less" scoped>
@colorCCC: #cccccc;
@colorEEE: #eeeeee;
@colorFFF: #ffffff;
@border: 1px solid @colorCCC;
.desc-left {
  width: 874px;
  background: white;
  .content.information {
    margin-top: 20px;
    > table {
      margin-bottom: 20px;
      border-top: 2px solid @colorCCC;
      width: 760px;
      .row:first-child {
        border-top: @border;
      }
      .row {
        border: @border;
        border-left: 0px;
        border-top: 0px;
        background-color: @colorEEE;
        height: auto;

        .column {
          height: auto;
          border-left: @border;
          padding: 15px 0 15px 25px;
          width: 110px;
        }
        .column:nth-child(even) {
          width: 279px;
          background-color: @colorFFF;
          > p {
            margin-bottom: 6px;
          }
        }
      }
    }
  }
  .content.introduction {
    margin-top: 20px;
    margin-left: 86px;
    .normal {
      background: @colorEEE;
      padding: 10px 0;
      text-indent: 10px;
      width: 92%;
    }
    > p.english-link {
      margin: 20px 0;
    }
    > p {
      margin: 12px 0;
      padding-right: 40px;
    }
    > p.p-img {
      text-align: center;
    }
  }
  .content.write-comment {
    margin-left: 86px;
    width: 78%;
    .rate-content {
      display: flex;
      flex-direction: column;
      .rate-selection {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .rate {
          margin-left: 5px;
        }
      }
    }
    .comment-btn {
      margin-top: 15px;
      width: 150px;
      height: 40px;
      border-radius: 3px;
      outline: none;
      background: @HoverC;
      border: none;
      color: @colorFFF;
      cursor: pointer;
    }
  }
  .comment-list {
    margin-top: 30px;
  }
}
.tabs {
  height: 32px;
  > li {
    height: 100%;
    float: left;
    line-height: 32px;
    padding: 0 15px;
    color: #495060;
    box-sizing: border-box;
    border-top: 2px solid transparent;
    cursor: pointer;
    &:hover {
      color: @HoverC;
    }
    &.active {
      color: @HoverC;
      border-color: @HoverC;
    }
  }
}
</style>
