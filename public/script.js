const darkMode = document.getElementById("modo-escuro")
const button = document.getElementById("btn")
const lightMode = document.getElementById("modo-claro")
const chat = document.getElementById("chat")
const message = document.getElementById('message')
const client = io.connect()

function changeMode(){
    document.body.classList.toggle("dark")
}
darkMode.addEventListener("click", changeMode)
lightMode.addEventListener("click", changeMode)

function showMessages(object){
    const item = document.createElement("p")
    if(object[object.length-1].id == client.id){
        item.classList.add("otherUser")
        item.textContent = `${object[object.length-1].user}: ${object[object.length-1].msg}`
        chat.appendChild(item)
    }
    item.classList.add("you")
    item.textContent = `${object[object.length-1].user}: ${object[object.length-1].msg}`
    chat.appendChild(item)
}

button.addEventListener("click", function(){
    if(message.value == ""){
        return
    }
    client.emit("chat message", message.value)
    message.value = ""
})

message.addEventListener("keypress", function(event){
    if(message.value == ""){
        return
    }
    else if(event.key == "Enter"){
        client.emit("chat message", message.value)
        message.value = ""
    }
})

client.on("chat message", function(obj){
    showMessages(obj)
})
        
