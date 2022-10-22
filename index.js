const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const arr = []
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.post("/name-verified", async function(request, response){
    var nome = await request.body.nome
    arr.push(nome)
    if(!nome){
        response.redirect("/index.html")
    }else{
        response.redirect("/chat.html")
    }
})
io.on("connection", function(socket){
    const name = arr[arr.length-1]
    socket.on("chat message", function(msg){
        io.emit("chat message", msg, name)
    })
})

server.listen(process.env.PORT || 3000)