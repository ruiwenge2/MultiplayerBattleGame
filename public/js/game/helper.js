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
  document.getElementById("allmoves").innerHTML += text + "<br><br>";
}
function clear(){
  document.getElementById("allmoves").innerHTML = "";
}
function showWinner(character, username, character2, username2){
  setTimeout(function(){alertmodal("Game Ended!", `Because ${character2.name} (${username2}) has no more health, ${character.name} (${username}) has won the game!`).then(() => location.href = "/join")}, 1500);
}