var focus = true;

window.onblur = function(){
  focus = false;
}
window.onfocus = function(){
  focus = true;
}

document.querySelector("input").addEventListener("keydown", e => {
  
});

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