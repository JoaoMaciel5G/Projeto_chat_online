const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

const rota = app.post("/chat-verified", (request, response)=>{
    const name = request.body.nome
    if(!name){
        response.redirect("/index.html")
        throw "Usuário com nome vazio"
    }
    response.redirect("/chat.html")
})

module.exports = { rota }