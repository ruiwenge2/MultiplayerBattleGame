var otheruser, othercharacter, otherchar;
const char = dict[character];
socket.emit("joined", room, user, character);

socket.on("joined", (username, char2) => {
  document.getElementById("sound").play();
  document.getElementById("player2").style.display = "block";
  document.getElementById("message").style.display = "none";
  alertmodal("Joined!", `${user} has joined the room and their character is ${char2}! Have fun playing!`);
  otheruser = username;
  othercharacter = char2;
  console.log(char2)
  otherchar = dict[char2];
  updateStatus();
  document.getElementById("player1-message") = "Your turn. Choose a move:";
  showMoves();
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
  let moves = char.moves;

}