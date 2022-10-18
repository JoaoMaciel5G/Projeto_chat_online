const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

function checkNameMiddleware(request, response, next){
    const name = request.body.nome
    if(!name){
        response.redirect("/index.html")
        throw "Usuário nome vazio"
    }
    response.redirect("/chat.html")
    next()
}
app.post("/name-verified", checkNameMiddleware, (request, response)=>{
    const nome = request.body.nome
    io.on("connection", (socket)=>{
    socket.on("send", (data)=>{
        socket.emit("send", data, nome)
    })
})
})

server.listen(process.env.PORT || 3000)