const Database = require("@replit/database");
const db = new Database();

function loggedIn(req){
  return (req.session.username ? true: false);
}

function getUser(req){
  return req.session.username;
}

async function is_human(captcha_response){
  let secret = process.env["captcha_secret"];
  let payload = {response:captcha_response, secret:secret};
  let result = await require('axios')({
    method:"POST",
    url: "https://www.google.com/recaptcha/api/siteverify",
    params:payload,
  });
  return result.data.success;
}

async function getCharacter(user){
  let info = await db.get(user);
  return info.c;
}

async function setCharacter(user, character){
  let info = await db.get(user);
  info.c = character;
  await db.set(user, info);
}

module.exports = {
  loggedIn:loggedIn,
  getUser:getUser,
  is_human:is_human,
  getCharacter:getCharacter,
  setCharacter:setCharacter
}