const darkMode = document.getElementById("modo-escuro")
const lightMode = document.getElementById("modo-claro")
const button = document.getElementById("btn")
const chat = document.getElementById("chat")
const socket = io()

button.addEventListener("click", function(){
    const message = document.getElementById("message")
    socket.emit("send", message.value)
    socket.on("send", (data, name)=>{
        const object = {
            data: data,
            name: name
        }
        showMessage(object)
    })
    message.value = ""
})

function showMessage(mensagem){
    const msg = `<p><strong>${mensagem.name}: </strong>${mensagem.data}</p>`
    chat.insertAdjacentHTML("beforeend", msg)
}
function changeMode(){
    document.body.classList.toggle("dark")
}
darkMode.addEventListener("click", changeMode)
lightMode.addEventListener("click", changeMode)
