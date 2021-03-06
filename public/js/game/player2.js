socket.emit("joined", room, user, character);

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
  clear();
  focusMoves();
  print(`${otherchar.name} (${otheruser}): ${data.move}`);
  await otherchar.choosemove(data.move, char);
  updateStatus();
  if(char.health <= 0){
    showWinner(otherchar, otheruser, char, user);
    return;
  } 
  if(otherchar.health <= 0){
    showWinner(char, user, otherchar, otheruser);
    return;
  }
  showMoves();
});

socket.on("leave", username => {
  document.getElementById("sound").play();
  alertmodal("Left!", `${username} has left the game!`).then(() => location.href = "/join");
});

function updateStatus(){
  document.getElementById("names").innerHTML = `${char.name} (${user})`;
  document.getElementById("othernames").innerHTML = `${otherchar.name} (${otheruser})`;
  document.getElementById("player1-image").src = `/img/characters/${otherchar.name}.png`;
  document.getElementById("player2-image").src = `/img/characters/${char.name}.png`;
  document.getElementById("health").innerHTML = char.health;
  document.getElementById("progress").value = char.health;
  document.getElementById("otherhealth").innerHTML = otherchar.health;
  document.getElementById("otherprogress").value = otherchar.health;
}

function showMoves(){
  othertype = undefined;
  othervalue = undefined;
  othervalue1 = undefined;
  othervalue2 = undefined;
  otherrandint = undefined;
  otheroppovalue = undefined;
  document.getElementById("player2-message").innerHTML = "The other player has chosen their move. Your turn. Choose a move:";
  document.getElementById("player1-message").innerHTML = "";
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

function move(text){
  clear();
  print(`${char.name} (${user}): ${text}`);
  focusMoves();
  char.choosemove(text, otherchar).then(() => {
    let data = {};
    data.move = text;
    switch(type){
      case "attack":
        data.value = value;
        break;
      case "heal":
        data.value = value;
        break;
      case "chances":
        data.value1 = value1;
        data.value2 = value2;
        data.randint = randint;
        break;
      case "owndamage":
        data.value1 = value1;
        data.oppovalue = oppovalue;
        data.randint = randint;
        break;
    }
    data.type = type;
    socket.emit("move", room, data);
    if(char.health <= 0){
      showWinner(otherchar, otheruser, char, user);
      return;
    } 
    if(otherchar.health <= 0){
      showWinner(char, user, otherchar, otheruser);
      return;
    }
    document.getElementById("player2-message").innerHTML = "";
    document.getElementById("player2-moves").innerHTML = "";
    document.getElementById("player1-message").innerHTML = "Other player's turn to choose their move.";
    updateStatus();
  });
}