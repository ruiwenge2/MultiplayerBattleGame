var otherchar, othermove;
const otheruser = "Computer";
const characterslist = ["Spiderman", "Pikachu", "Hercules", "Jedi", "Voldemort", "Thanos", "Medusa"];
const othercharacter = characterslist[random(0, characterslist.length - 1)];
switch(othercharacter){
  case "Spiderman":
    otherchar = new Spiderman();
    break;
  case "Pikachu":
    otherchar = new Pikachu();
    break;
  case "Hercules":
    otherchar = new Hercules();
    break;
  case "Jedi":
    otherchar = new Jedi();
    break;
  case "Voldemort":
    otherchar = new Voldemort();
    break;
  case "Thanos":
    otherchar = new Thanos();
    break;
  case "Medusa":
    otherchar = new Medusa();
    break;
}
document.getElementById("player2").style.display = "block";
document.getElementById("allmoves-h1").style.display = "block";
updateStatus();
showMoves();

async function computerMove(){
  othermove = true;
  await sleep(random(1, 5));
  clear();
  focusMoves();
  let allmoves = Object.keys(otherchar.moves);
  let move = allmoves[random(0, allmoves.length - 1)];
  print(`${otherchar.name} (${otheruser}): ${move}`);
  await otherchar.choosemove(move, char);
  updateStatus();
  if(char.health <= 0){
    showWinner2(otherchar, otheruser, char, user);
    return;
  } 
  if(otherchar.health <= 0){
    showWinner2(char, user, otherchar, otheruser);
    return;
  }
  showMoves();
}

function updateStatus(){
  document.getElementById("names").innerHTML = `${char.name} (${user})`;
  document.getElementById("othernames").innerHTML = `${otherchar.name} (${otheruser})`;
  document.getElementById("player1-image").src = `/img/characters/${char.name}.png`;
  document.getElementById("player2-image").src = `/img/characters/${otherchar.name}.png`;
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
  document.getElementById("player1-message").innerHTML = "Your turn. Choose a move:";
  if(othermove){
    document.getElementById("player1-message").innerHTML = "The computer has chosen their move. Your turn. Choose a move:"
  }
  document.getElementById("player2-message").innerHTML = "";
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
}

function move(text){
  clear();
  focusMoves();
  print(`${char.name} (${user}): ${text}`);
  char.choosemove(text, otherchar).then(() => {
    updateStatus();
    if(char.health <= 0){
      showWinner2(otherchar, otheruser, char, user);
      return;
    }
    if(otherchar.health <= 0){
      showWinner2(char, user, otherchar, otheruser);
      return;
    }
    document.getElementById("player1-message").innerHTML = "";
    document.getElementById("player1-moves").innerHTML = "";
    document.getElementById("player2-message").innerHTML = "Computer's turn to choose their move.";
    computerMove().then(() => {});
  });
}