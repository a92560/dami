import io from 'socket.io-client'

const socket = io("http://127.0.0.1:7001")

socket.on("connect", () => {
  console.log("client connected")
  socket.emit("chat", 'hello world')
})

socket.on("res1", msg => {
  console.log("res from server: %s !", msg)
})

socket.on("res2", msg => {
  console.log("res from server: %s !", msg)
})