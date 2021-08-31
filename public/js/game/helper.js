function random(number1, number2){
  return Math.round(Math.random() * (number2 - number1)) + number1;
}
function round(number){
  return Math.round(number);
}
function sleep(number){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve();
    }, number * 1000);
  });
}
function print(text){
  document.getElementById("allmoves").innerText += text;
  document.getElementById("allmoves").innerHTML += "<br><br>";
  focusMoves();
}
function clear(){
  document.getElementById("allmoves").innerText = "";
}
function showWinner(character, username, character2, username2){
  setTimeout(function(){alertmodal("Game Ended!", `Because ${character2.name} (${username2}) has no more health, ${character.name} (${username}) has won the game!`).then(() => location.href = "/join")}, 1500);
}
function focusMoves(){
  document.getElementById("allmoves").focus();
  window.scrollTo(0,document.body.scrollHeight);
}
function invite(){
  promptmodal("Invite someone", "Enter the user you want to invite to this room:")
  .then(username => {
    socket.emit("new invitation", {to:username, from:user, room:room});
    alertmodal("Invite someone", `You have invited ${username} to the room <span style="color:blue">${room}</span>!`)
    .then(() => console.log("invited"));
  });
}