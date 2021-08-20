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
  console.log(text); // for now
}