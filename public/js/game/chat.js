var input = document.querySelector("input");
var messages = document.getElementById("messages");
var focus = true;

window.onblur = function(){
  focus = false;
}
window.onfocus = function(){
  focus = true;
}

input.addEventListener("keydown", e => {
  if(e.key == "Enter" && validMessage(input.value)){
    socket.emit("chat message", room, user, input.value);
    messages.innerHTML += `<p>${user}: ${encodeHTML(input.value)}</p>`;
    input.value = "";
    messages.scrollTo(0, messages.scrollHeight);
  }
});

socket.on("chat message", (username, message) => {
  messages.innerHTML += `<p>${username}: ${encodeHTML(message)}</p>`;
    messages.scrollTo(0, messages.scrollHeight);
})

function encodeHTML(text){
  var div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

function validMessage(message){
  if(!message) return false;
  for(var i of message){
    if(i != " ") return true;
  }
  return false;
}