const textarea = document.querySelector("#textarea");
const socket = io()
const messageArea = document.querySelector(".message_area");

const name = prompt("Enter your name");

textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
       e.target.value = ""
    }
});

const sendMessage = (msg) => {
    let obj = {
        username: name,
        message: msg.trim()
    }

    //append message
    appendMessage(obj, "outgoing");
    scrollTop()
     // send to server

     socket.emit("mess", obj)

   
    
}

function appendMessage(obj, type) {
    let clasN = type;
    let creatDiv = document.createElement("div");
    creatDiv.classList.add(type, "message");
    let markup = `
    <h4>${obj.username}</h4>
    <p>${obj.message}</p>
    `
    creatDiv.innerHTML = markup;
    messageArea.appendChild(creatDiv);
}
//Recieving from server

socket.on("mess", (mes)=>{
appendMessage(mes, "incoming");
scrollTop()
});

function scrollTop(){
    messageArea.scrollTop = messageArea.scrollHeight;
}


