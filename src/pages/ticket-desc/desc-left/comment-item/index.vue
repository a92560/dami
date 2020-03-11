<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-02 15:33:38
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-02 16:05:33
 -->
<template>
  <li class="comment">
    <div class="img-box">
      <img :src="imgBaseUrl + itemData.imgUrl" alt="图片" />
      <p>{{ email }}</p>
    </div>
    <div class="comment-content">
      <div class="comment-text">
        {{ itemData.content }}
      </div>
      <div class="rate-time">
        <div class="rate">
          <el-rate v-model="score" disabled show-score></el-rate>
        </div>
        <div class="time">{{ formatTime(itemData.createdTime) }}</div>
      </div>
    </div>
  </li>
</template>
<script>
import { IMG_BASE_URL } from '@/config'
import { formatTime } from '@/utils'
export default {
  name: 'CommentItem',
  props: {
    itemData: {
      type: Object,
      required: true,
    },
    userDocs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      imgBaseUrl: IMG_BASE_URL,
    }
  },
  methods: {
    formatTime: formatTime,
  },
  computed: {
    score: {
      get() {
        let score = Number(this.itemData.score)
        return score
      },
      set() {},
    },
    email() {
      return this.userDocs.length ? this.userDocs[0].email : ""
    }
  },
}
</script>
<style lang="less" scoped>
.comment {
  display: flex;
  margin-bottom: 18px;
  align-items: center;
  .img-box {
    width: 45px;
    height: 65px;
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 45px;
    }
    > p {
      margin-top: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 60px;
    }
  }
  .comment-content {
    height: 75px;
    background: #cccccc;
    flex: 1;
    margin-right: 100px;
    .rate-time {
      display: flex;
      align-items: center;
      .rate {
        margin-left: 20px;
      }
      .time {
        margin-top: -3px;
        margin-left: 20px;
      }
    }
    .comment-text {
      padding: 20px 0 20px 25px;
    }
  }
}
</style>
