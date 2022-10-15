const socket = io.connect()
const name = document.getElementById("name-user")
const message = document.getElementById("message")
const chat = document.getElementById("chat")

function enviarMensagem(){
    const obj = {
        author: name.value,
        msg: message.value
    }
    message.value = ""
    showMessage(obj)
    socket.emit("msgs", obj)
}

socket.on("sendMessage", (messages)=>{
    showMessage(messages)
})

function showMessage(mensagem){
    const html = `<p><span><b>${mensagem.author}:</b></span> ${mensagem.msg}</p>`
    chat.insertAdjacentHTML("beforeend", html)
}