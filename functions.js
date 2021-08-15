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

module.exports = {
  loggedIn:loggedIn,
  getUser:getUser,
  is_human:is_human
}