<template>
  <!-- 聊天主窗口 -->
  <div class="container chat-wrapper">
    <!-- 用户列表 -->
    <!-- <div class="user-list">
      <div class="header">
        <div class="avatar">
          <img class="img avatar_url" src="./images/avatar2.jpg" alt="" />
        </div>
        <div class="info">
          <h3 class="username">清流</h3>
        </div>
      </div>
      <div class="title">
        <h3>用户列表</h3>
      </div>
      <ul></ul>
    </div> -->
    <!-- 聊天主窗口 -->
    <div class="box">
      <!-- 聊天窗口头部 -->
      <div class="user-list">
        <div class="header">
          <div class="avatar">
            <img class="img avatar_url" src="./images/avatar2.jpg" alt="" />
          </div>
          <div class="info">
            <!--  -->
            <h3 class="username">清流</h3>
          </div>
        </div>
        <div class="title">
          <h3>用户列表</h3>
        </div>
        <ul>
          <li
            v-for="(item, key, i) in users"
            :key="key"
            :class="[{ active: key === toId }]"
            @click="handleToChat(key, item.unread)"
          >
            <img :src="imgBaseUrl + item.avatarUrl" alt="头像" />
            <div class="username-txt">
              <span class="username">{{ item.email }}</span>
              <span class="txt">Hello</span>
            </div>
            <el-tag
              class="unread"
              type="warning"
              color="#F56C6C"
              effect="light"
              v-show="item.unread > 0"
              >{{ item.unread }}</el-tag
            >
          </li>
        </ul>
      </div>
      <div class="chat-window">
        <div class="is-chat" v-if="isChat">
          <div class="box-hd">
            <h3>{{ handleGetEmail }}<span id="userCount"></span></h3>
          </div>
          <!-- 聊天窗口主体区域 -->
          <div class="box-bd" ref="boxHd">
            <div class="system">
              <p class="message_system">
                <span class="content">"往事随风"邀请你和"Boy"加入了群聊</span>
              </p>
            </div>
            <div class="message-box" v-for="item in filterMsg">
              <div :class="['my', 'message']" v-if="item.from == userId">
                <img class="avatar" :src="imgBaseUrl + avatarUrl" alt="头像" />
                <div class="content">
                  <div class="bubble">
                    <div class="bubble_cont" v-html="item.content"></div>
                  </div>
                </div>
              </div>
              <!-- 对方发给我的 -->
              <div class="other message" v-if="item.from === toId">
                <img
                  class="avatar"
                  :src="imgBaseUrl + users[toId].avatarUrl"
                  alt=""
                />
                <div class="content">
                  <div class="nickname">{{ handleGetEmail }}</div>
                  <div class="bubble">
                    <div class="bubble_cont" v-html="item.content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 聊天窗口底部区域 -->
          <div class="box-ft">
            <!-- 工具栏 -->
            <div class="toolbar">
              <a href="javascript:;" title="表情" class="face"></a>
              <a href="javascript:;" title="截屏" class="screen-cut"> </a>
              <a href="javascript:;" title="图片" class="file">
                <label for="file"></label>
                <input type="file" id="file" style="display: none;" />
              </a>
            </div>
            <!-- 内容输入区域 -->
            <div class="content">
              <!-- div添加一个属性：contenteditable -->
              <div class="text" ref="content" contenteditable></div>
            </div>
            <!-- 发送按钮 -->
            <div class="action">
              <span class="desc">按下Ctrl+Enter发送</span>
              <a class="btn-send" @click="handleSend" href="javascript:;">
                发送</a
              >
            </div>
          </div>
        </div>
        <div class="no-chat" v-else>
          请选择客服
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG_BASE_URL } from '@/config'
import { mapState, mapMutations } from 'vuex'
import io from 'socket.io-client'

export default {
  data() {
    return {
      isChat: false,
      users: {},
      toId: '',
      imgBaseUrl: IMG_BASE_URL,
      socketId: '',
      chatMessages: [],
    }
  },
  methods: {
    ...mapMutations({
      getUserInfo: 'GET_USER_INFO',
    }),
    async handleToChat(key, unread) {
      // this.$nextTick(() => {
      //   const target = this.$refs.boxHd
      //   target.scrollTop = target.scrollHeight - target.clientHeight
      // })
      setTimeout(() => {
        this.handleToBottom()
      })
      this.toId = key
      this.isChat = true
      // 修改消息已读
      if (unread > 0) {
        // 修改已读
        const ret = await this.$http.updateReadMessage({ from: key })
        this.$set(this.users, key, { ...this.users[key], unread: 0 })
        // const chatRet = await this.$http.getUsersAndMessages({
        //   data: { users: 0 },
        // })
        // if (chatRet && chatRet.data) {
        //   this.chatMessages = chatRet.data.ret || []
        //   // 处理未读数量的显示
        //   for (let key in this.users) {
        //     // from 为 keys
        //     this.users[key].unread = this.handleUnread(key)
        //   }
        // }
      }
    },
    handleUnread(id) {
      return this.chatMessages.filter(item => !item.isRead && item.from === id)
        .length
    },
    async getUsersAndMessages() {
      const ret = await this.$http.getUsersAndMessages({ data: { users: 1 } })
      if (ret && ret.data) {
        this.chatMessages = ret.data.ret
        this.users = ret.data.users
        // 处理未读数量的显示
        for (let key in this.users) {
          // from 为 key
          this.users[key].unread = this.handleUnread(key)
        }
      }
    },
    async handleSend() {
      // 修改所有消息已读
      const from = this.userId
      const to = this.toId
      const content = this.$refs.content.innerHTML
      console.log('from', from)
      console.log('to', to)
      console.log('content', content)
      this.$socket.emit('sendMessage', {
        from,
        to,
        content,
        socketId: this.socketId,
      })
      // 清空内容
      this.$refs.content.innerHTML = ''
      // 处理排到第一
      this.handleChatFirst()

      setTimeout(() => {
        this.handleToBottom()
      }, 1500)
      // window.scrollTo(0, document.documentElement.scrollHeight-document.documentElement.clientHeight);
      // const ret = await this.$http.postMessage({
      //   from,
      //   to,
      //   content,
      // })
      // const ret = await io.socket.on('receiveMessage')
      // console.log('ret', ret)
      // await this.$socket.on('receiveMessage', ret => {
      //   console.log('执行了')
      //   console.log('receiveMessage', ret)
      // })
    },
    initIO() {
      if (!io.socket) {
        console.log('执行了')
        io.socket = io('ws://127.0.0.1:7001')
        io.socket.on('connect', () => {
          console.log('client connected')
        })
        io.socket.on('res1', id => {
          console.log('id', id)
          this.socketId = id
        })
        io.socket.on('disconnect', reason => {
          console.log('reason', reason)
          io.socket.close()
          if (reason === 'io server disconnect') {
            // the disconnection was initiated by the server, you need to reconnect manually
            io.socket.connect()
          } else if (reason === 'transport close') {
            io.socket = null
          }
          // else the socket will automatically try to reconnect
        })
      }
    },
    handleChatFirst(from) {
      // 已经在聊天了
      if (this.toId) {
        const toId = this.toId
        // delete this.users[this.toId]
        const target = this.users[this.toId]
        const obj = {
          [this.toId]: target,
        }
        this.users = { ...obj, ...this.users }
        console.log('this.users', this.users)
      } else {
        // 没有正在聊天  置顶来的消息
        const target = this.users[from]
        const obj = {
          [from]: target,
        }
        this.users = { ...obj, ...this.users }
        // // 处理未读数量的显示
        // for (let key in this.users) {
        //   // from 为 key
        //   this.users[key].unread = this.handleUnread(key)
        //   // 如果当前正在聊天
        // }
        console.log('this.users', this.users)
      }
    },
    scrollToEnd() {},
    handleToBottom() {
      const target = this.$refs.boxHd
      // 处理滚动
      if (!target) {
        return
      }
      const scrollHeight = target.scrollHeight
      const clientHeight = target.clientHeight
      const scrollTop = target.scrollTop
      const rect = target.getBoundingClientRect()
      console.log('rect', rect)
      console.log('scrollHeight', scrollHeight)
      console.log('clientHeight', clientHeight)
      console.log('scrollTop', scrollTop)
      target.scrollTop = target.scrollHeight - parseInt(clientHeight) + 30
    },
  },
  async mounted() {
    console.log('this.userId', this.userId)

    const ret = await this.$http.getUserData()
    this.getUserInfo(ret.data[0])
    await this.getUsersAndMessages()
    // this.initIO()
  },
  sockets: {
    receiveMessage: async function(val) {
      // 置顶
      this.handleChatFirst(val.from)
      // 与自己有关的
      if (val.to == this.userId || val.from == this.userId) {
        if (this.toId) {
          // 和这个人正在聊天
          // 修改已读
          const ret = await this.$http.updateReadMessage({ from: val.to })
          val.isRead = true
          this.chatMessages = [...this.chatMessages, val]
        } else {
          // 没有正在聊天
          // 置顶并将未读加一
          this.$set(this.users, val.from, {
            ...this.users[val.from],
            unread: this.users[val.from].unread + 1,
          })
          this.chatMessages = [...this.chatMessages, val]
        }
      }
      console.log('receiveMessage', val)
    },
  },
  computed: {
    handleGetEmail() {
      return this.users[this.toId].email
    },
    ...mapState({
      userId: state => state.user.userId,
      avatarUrl: state => state.user.avatarUrl,
    }),
    filterMsg() {
      const chat_id = [this.toId, this.userId].sort().join('_')
      return this.chatMessages.filter(item => item.chat_id === chat_id)
    },
  },
  watch: {
    chatMessages() {
      this.handleToBottom()
    },
  },
}
</script>

<style lang="less" scoped>
.user-list {
  width: 280px;
  height: 100%;
  background-color: #2e3238;
  > ul > li {
    display: flex;
    padding: 8px 20px;
    height: 66px;
    cursor: pointer;
    align-items: center;
    .unread {
      color: white;
      padding: 0 8px;
    }
    &:hover {
      background: #2e336b;
    }
    &.active {
      background: #2e336b;
    }
    .username-txt {
      display: flex;
      flex-direction: column;
      align-items: space-around;
      justify-content: center;
      height: 50px;
      flex: 1;
      > span {
        font-size: 14px;
        color: white;
        line-height: 25px;
        display: block;
        margin-left: 30px;
      }
      > span.txt {
        color: #666;
      }
    }

    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
.box {
  background-color: #eee;
  height: 600px;
  display: flex;
}
.chat-window {
  flex: 1;
  .is-chat {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .no-chat {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex: 1;
  }
}

.box-hd {
  text-align: center;
  width: 100%;
  line-height: 30px;
}

.box-hd h3 {
  font-size: 18px;
  font-weight: 400;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
  z-index: 999;
  box-sizing: border-box;
}

.message-box {
  overflow: hidden;
}

.box-bd {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.system {
  overflow: hidden;
}
.message_system {
  text-align: center;
  margin: 10px auto;
  max-width: 50%;
}

.message_system .content {
  display: inline-block;
  font-size: 12px;
  padding: 1px 18px;
  color: #b2b2b2;
  border-radius: 2px;
}

.other {
  margin-bottom: 16px;
  float: left;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}

.my {
  margin-bottom: 16px;
  float: right;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
}

.my.message .avatar {
  float: right;
}

.message .content {
  overflow: hidden;
}

.message .content .nickname {
  font-weight: 400;
  padding-left: 10px;
  font-size: 12px;
  height: 22px;
  line-height: 24px;
  color: #4f4f4f;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.message .avatar {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
}

.my.message .bubble {
  background-color: #b2e281;
}
.message .bubble {
  max-width: 500px;
  min-height: 1em;
  display: inline-block;
  vertical-align: top;
  position: relative;
  text-align: left;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 10px;
  background-color: #fff;
}

.message .bubble img {
  display: inline-block;
  cursor: pointer;
  max-width: 350px;
  max-height: 240px;
}

.other .bubble:before {
  position: absolute;
  top: 14px;
  left: -10px;
  border: 6px solid transparent;
  content: ' ';
  border-right-color: #fff;
  border-right-width: 4px;
}

.my .bubble:before {
  position: absolute;
  top: 14px;
  right: -10px;
  border: 6px solid transparent;
  content: ' ';
  border-left-color: #b2e281;
  border-left-width: 4px;
}

.bubble_cont {
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
  line-height: 25px;
  padding: 5px 13px;
}

.box-ft {
  border-top: 1px solid #ccc;
  height: 181px;
}

.box-ft .toolbar {
  height: 30px;
  padding: 5px 20px;
}

.box-ft .toolbar .face {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url('./images/wechat-sprit.png') no-repeat -404px -398px;
}

.box-ft .toolbar .screen-cut {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url('./images/wechat-sprit.png') no-repeat -30px -432px;
}

.box-ft .toolbar .file label {
  opacity: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  background: rgb(255, 255, 255);
}

.box-ft .toolbar .file {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url('./images/wechat-sprit.png') no-repeat -120px -432px;
}

.box-ft .content {
  height: 90px;
  overflow-x: hidden;
  padding: 0px 20px;
}

.box-ft .content .text {
  resize: none;
  border: none;
  outline: none;
  width: 100%;
  height: 84px;
  font-size: 16px;
  background-color: #eee;
}

.box-ft .action {
  text-align: right;
  margin-top: 5px;
  padding-right: 20px;
}

.box-ft .action .desc {
  color: #888;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 7px;
}

.btn-send {
  display: inline-block;
  border: 1px solid #c1c1c1;
  text-decoration: none;
  background-color: #fff;
  color: #222;
  border-radius: 4px;
  padding: 3px 30px;
  font-size: 14px;
}

.btn-send:hover {
  background-color: #d8d8d8;
}

.header {
  padding: 18px;
  position: relative;
}

.header .avatar {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  padding-right: 10.625px;
}

.header .avatar .img {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  display: block;
  cursor: pointer;
}

.header .info {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  width: 2000px;
}

.header .info h3 {
  display: inline-block;
  font-weight: 400;
  width: 156px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: #fff;
  font-size: 18px;
  vertical-align: top;
  line-height: 31px;
  text-decoration: none;
}

.title {
  padding: 13px 18px 11px;
  border-bottom: 1px solid #24272c;
  border-top: 1px solid #24272c;
  color: #fff;
}

.title h3 {
  font-weight: 400;
  font-size: 18px;
}

.user {
  overflow: hidden;
  padding: 12px 18px 11px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  position: relative;
}

.user .avatar {
  float: left;
  margin-right: 10px;
  position: relative;
}

.user .avatar img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 2px;
}

.user .name {
  color: #fff;
  overflow: hidden;
  line-height: 36px;
}
</style>
