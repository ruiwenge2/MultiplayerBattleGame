socket.emit("joined", room, user, character);

const char = dict[character];
const otherchar = dict[othercharacter];

alertmodal("Joined!", `${otheruser} is already in this room and their character is ${othercharacter}! Have fun playing!`);

socket.on("move", async data => {
  switch(data.type){
    case "attack":
      othervalue = data.value;
      break
    case "heal":
      othervalue = data.value;
      break;
    case "chances":
      othervalue1 = data.value1;
      othervalue2 = data.value2;
      otherrandint = data.randint;
      break;
    case "owndamage":
      othervalue1 = data.value1;
      otheroppovalue = data.oppovalue;
      otherrandint = data.randint;
      break;
  }
  await otherchar.choosemove(data.move, char);
  showMoves();
});

function showMoves(){
  othertype = undefined;
  othervalue = undefined;
  othervalue1 = undefined;
  othervalue2 = undefined;
  otherrandint = undefined;
  otheroppovalue = undefined;
  document.getElementById("player2-message").innerHTML = "The other player has chosen their move. Your turn. Choose a move:";
  document.getElementById("player2-moves").innerHTML = "";
  let moves = char.moves;
  for(let i of Object.keys(moves)){
    let btn = document.createElement("button");
    btn.innerHTML = i;
    btn.onclick = () => {
      move(i);
    }
    document.getElementById("player2-moves").appendChild(btn);
  }
}