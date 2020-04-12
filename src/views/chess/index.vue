<template>
    <div>
      <h1>Welcome</h1>
      {{ msg }}
      <br/>
      账号：<input v-model="username" type="text"/>
      对方：<input v-model="destination" type="text"/>

      <button @click="initWebSocket">登录</button>
      <button @click="websock.close()">退出</button>
      <br/>
      消息：<input v-model="message" type="text"/>
      <button @click="send()">发送消息</button>

    </div>
</template>

<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'
  import { globalConst } from '@/utils/config'

  export default {
    name: 'index',
    data() {
      return {
        count: 0,
        msg: 'Hello, Websocket!',
        shopId: '',
        websock: null,
        username: '',
        destination: '',
        message: ''
      }
    },
    created () { // 页面创建生命周期函数
      // this.initWebSocket()
    },
    destroyed () { // 离开页面生命周期函数
      this.websocketclose()
    },

    methods: {
      initWebSocket () {
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        this.websock = new WebSocket(globalConst().wsAddress + '/websocket/'+this.username)
        this.websock.onopen = this.websocketonopen
        this.websock.onerror = this.websocketonerror
        this.websock.onmessage = this.websocketonmessage
        this.websock.onclose = this.websocketclose
      },
      websocketonopen () {
        console.log('WebSocket连接成功')
      },
      websocketonerror (e) {
        console.log('WebSocket连接发生错误')
      },
      websocketonmessage (e) {
        var da = JSON.parse(e.data)

        console.log(da['username'] + ":" + da['message'])
        // this.count += parseInt(da)
        this.msg = da['username'] + ":" + da['message']
      },
      websocketclose () {
        console.log('connection closed')
      },
      // 发送消息
      send () {
        var msgObj = {}
        msgObj['username'] = this.username
        msgObj['destination'] = this.destination
        msgObj['message'] = this.message

        let message = JSON.stringify(msgObj)
        this.websock.send(message)
        this.setMessageInnerHTML(msgObj['message'])
      },
      // 将消息显示在网页上
      setMessageInnerHTML (innerHTML) {
        this.msg = innerHTML
      }
    }

  }
</script>

<style scoped>


  span.td {
    display: inline-block;
  }

  div.label {
    font-size: 14px;
    padding:2px;
  }

  select {
    font-size: 14px;
    width: 108px;
    padding:2px;
  }

  option {
    font-size: 14px;
  }

  input.button {
    font-size: 14px;
    width: 108px;
  }

  label {
    font-size: 14px;
  }

  #container {
    width: 100%
  }
</style>
