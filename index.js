const express = require("express")
const app = express()
const http = require("http")
const session = require("express-session")
const server = http.createServer(app)
const io = require("socket.io")(server)
const nameUsers = []

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
        response.render("index")
    }
})
app.get("/", function(request, response){
    response.render("index")
})
app.get("/chat", function(request, response){
    if(!request.session.name){
        response.render("index")
    }else{
        response.render("chat")
    }
})

app.get("/styles/chat.css", function(request, response){
    response.sendFile(__dirname + "/views/styles/chat.css")
})
app.get("/styles/index.css", function(request, response){
    response.sendFile(__dirname + "/views/styles/index.css")
})

io.on("connection", function(socket){
    const name = nameUsers[nameUsers.length-1]

    socket.on("chat message", function(msg){
        io.emit("chat message", msg, name)
    })
})

server.listen(process.env.PORT || 3000)