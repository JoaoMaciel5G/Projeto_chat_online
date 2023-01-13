const express = require("express")
const app = express()
const http = require("http")
const session = require("express-session")
const server = http.createServer(app)
const io = require("socket.io")(server)
const nameUsers = []
const objectUser = []

app.use("/public", express.static(__dirname + "/public"))
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html")
app.set("views", __dirname + "/views")
app.use(session({secret: "appUserSession", resave: true, saveUninitialized: true}))
app.use(express.urlencoded({extended: true}))

app.post("/", function(request, response){
    const nome = request.body.nome

    request.session.name = nome
    if(nome){
        nameUsers.push(nome)
        response.render("chat")
    }else{
        response.render("login")
    }
})
app.get("/", function(request, response){
    response.render("index")
})
app.get("/chat", function(request, response){
    if(!request.session.name){
        response.render("login")
    }else{
        response.render("chat")
    }
})

io.on("connection", function(socket){
    const name = nameUsers[nameUsers.length-1]

    socket.on("chat message", function(msg){
        const obj = {
            user: name,
            msg: msg,
            id: socket.id
        }
        objectUser.push(obj)
        io.sockets.emit("chat message", objectUser)
    })
})

server.listen(process.env.PORT || 3000)