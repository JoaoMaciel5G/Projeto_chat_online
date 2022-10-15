const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const bodyParser = require("body-parser")
const { rota } = require("./check-name")

app.use(express.static("public"))
app.use(rota)

io.on("connection", (socket)=>{
    socket.on("msgs", (data)=>{
        socket.broadcast.emit("sendMessage", data)
    })
})
server.listen(process.env.PORT || 3000)