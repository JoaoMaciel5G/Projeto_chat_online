const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)

const io = require("socket.io")(server)

app.get("/", (request, response)=>{
    response.sendFile(__dirname+"/index.html")
})
io.on("connection", (socket)=>{
    socket.on("msgs", (data)=>{
        socket.broadcast.emit("sendMessage", data)
    })
})
server.listen(process.env.PORT || 3000)
