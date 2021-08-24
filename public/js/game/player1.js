var otheruser, othercharacter, otherchar;
const char = dict[character];
socket.emit("joined", room, user, character);

socket.on("joined", (username, char2) => {
  document.getElementById("sound").play();
  document.getElementById("player2").style.display = "block";
  document.getElementById("chat").style.display = "block";
  document.getElementById("message").innerHTML = "";
  otheruser = username;
  othercharacter = char2;
  otherchar = dict[char2];
  updateStatus();
  alertmodal("Joined!", `${user} has joined the room and their character is ${char2}! Have fun playing!`).then(() => {
    document.getElementById("player1-message").innerHTML = "Your turn. Choose a move:";
    showMoves()
  });
});

socket.on("leave", username => {
  alertmodal("Left!", `${username} has left the game!`).then(() => location.href = "/join");
});

function updateStatus(){
  document.getElementById("names").innerHTML = `${char.name} (${user})`;
  document.getElementById("othernames").innerHTML = `${otherchar.name} (${otheruser})`;
  document.getElementById("player1-image").src = `/img/characters/${char.name}.png`;
  document.getElementById("player2-image").src = `/img/characters/${otherchar.name}.png`;
  document.getElementById("health").innerHTML = char.health;
  document.getElementById("progress").value = char.health;
  document.getElementById("otherhealth").innerHTML = char.health;
  document.getElementById("otherprogress").value = char.health;
}

function showMoves(){
  document.getElementById("player1-moves").innerHTML = "";
  let moves = char.moves;
  for(let i of Object.keys(moves)){
    let btn = document.createElement("button");
    btn.innerHTML = i;
    btn.onclick = () => {
      move(i);
    }
    document.getElementById("player1-moves").appendChild(btn);
  }
  // window.scrollTo(0, window.innerHeight);
}

function move(text){

}

window.open(location.href); // for testing