const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const bodyParser = require('body-parser');
const Database = require("@replit/database");
const session = require('express-session');
const db = new Database();
const f = require("./functions");
const users = {};
const characters = {};
const characterslist = ["Spiderman", "Pikachu", "Hercules", "Jedi", "Voldemort", "Thanos", "Medusa"];

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: process.env["secret"]}));

app.get("/", (req, res) => {
  res.render("index.html", {loggedIn:f.loggedIn(req), user:f.getUser(req)});
});

app.get("/login", (req, res) => {
  if(f.loggedIn(req)){
    res.redirect("/");
    return;
  }
  res.render("login.html", {loggedIn:false, error:false});
});

app.post("/login", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if((await db.list()).includes(username) && (await db.get(username)).p == password){
    req.session.username = username;
    res.redirect("/");
  } else {
    res.render("login.html", {error: "Invalid username and/or password.", loggedIn:false});
  }
});

app.get("/signup", (req, res) => {
  if(f.loggedIn(req)){
    res.redirect("/");
    return;
  }
  res.render("signup.html", {error:false, loggedIn:false})
});

app.post("/signup", (req, res) => {
  var newusername = req.body.newusername;
  var newpassword = req.body.newpassword;
  var captcha_response = req.body["g-recaptcha-response"];
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  cap_letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  allchars = letters.concat(cap_letters, numbers, ['_']);
  goodusername = true;
  for(let i of newusername){
    if(!allchars.includes(i)){
      goodusername = false;
    }
  }
  if(goodusername){
    db.list().then(keys => {
      if(keys.includes(newusername)){
        res.render("signup.html", {error:"Username taken.", loggedIn:false});
      } else if(newusername == "" || newpassword == ""){
        res.render("signup.html", {error:"All fields are required.", loggedIn:false});
      } else{
        console.log(newusername);
        f.is_human(captcha_response).then(resp => {
          if(!resp){
            console.log("not verified")
            res.render("signup.html", {error:"No bots allowed!", loggedIn:false});
            return;
          }
          db.set(newusername, {p:newpassword, c:"Spiderman"}).then(() => {
            console.log("new account created");
            req.session.username = newusername;
            res.redirect("/");
          });
        });
      }
    });
  } else{
    res.render("signup.html", {error:"Username can only contain alphanumeric characters and underscores.", loggedIn:false});
  }
});

app.get("/join", async (req, res) => {
  if(!f.loggedIn(req)){
    res.redirect("/login");
    return;
  }
  let user = f.getUser(req);
  let all = [...characterslist];
  for(let i = 0; i < all.length; i++){
    if(all[i] == (await f.getCharacter(user))){
      let c = all[i];
      all.splice(i, 1);
      all = [c].concat(all);
      break;
    }
  }
  res.render("join.html", {loggedIn:true, user:user, characters:all});
});

app.get("/changecharacter", async (req, res) => {
  let character = req.query.character;
  if(!character){
    res.send("No character provided.");
    return;
  }
  if(!characterslist.includes(character)){
    res.send("Invalid character provided.");
    return;
  }
  await f.setCharacter(f.getUser(req), character);
  res.send("Success");
});

app.get("/howtoplay", (req, res) => {
  res.render("howtoplay.html", {loggedIn:f.loggedIn(req), user:f.getUser(req)});
});

app.get("/play", async (req, res) => {
  if(!f.loggedIn(req)){
    res.redirect("/login");
    return;
  }
  res.render("playagainstcomputer.html", {user:f.getUser(req), loggedIn:true, character: (await f.getCharacter(f.getUser(req)))});
  console.log(f.getUser(req) + " is playing against the computer");
});

app.get("/game/:room", async (req, res) => {
  if(!f.loggedIn(req)){
    res.redirect("/login");
    return;
  }
  let room = req.params.room;
  if(!Object.keys(users).includes(room)){
    users[room] = {};
  }
  if(!Object.keys(characters).includes(room)){
    characters[room] = {};
  }
  length = Object.keys(users[room]).length;
  if(length < 2){
    if(length == 0){
      res.render("player1.html", {user:f.getUser(req), room:room, loggedIn:true, character: (await f.getCharacter(f.getUser(req)))});
    } else {
      let otheruser = Object.values(users[room])[0];
      let othercharacter = Object.values(characters[room])[0];
      res.render("player2.html", {user:f.getUser(req), room:room, otheruser:otheruser, othercharacter: othercharacter, character: (await f.getCharacter(f.getUser(req))),  loggedIn:true});
    }
  } else {
    res.render("error.html", {title:"Multiplayer Battle Game", content:`<h1 style="margin-top:50px;">Sorry, this room already has 2 players. Go join another.</h1>`, loggedIn:true, user:f.getUser(req)});
  };
});

app.get("/game", (req, res) => {
  res.redirect("/join");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/*", (req, res) => {
  res.status(404).render("error.html", {loggedIn:f.loggedIn(req), user:f.getUser(req), title:"Page Not Found", content:`<h1>Error 404</h1><h2>Page Not Found</h2><img src="/img/robot.jpeg" style="width:400px" style="border:none"><br><br><a href="/" style="color:white; font-size:20px">Go to home</a>`});
});

io.on("connection", socket => {
  socket.on("joined", (room, user, character) => {
    if(!users[room]) users[room] = {};
    users[room][socket.id] = user;
    if(!characters[room]) characters[room] = {};
    characters[room][socket.id] = character;
    socket.join(room);
    socket.broadcast.to(room).emit("joined", user, character);
    console.log(`${user} joined the room ${room} with character ${character}`);
  });
  socket.on("disconnect", () => {
    for(i of Object.keys(users)){
      if(Object.keys(users[i]).includes(socket.id)){
        let left = users[i][socket.id];
        delete users[i][socket.id];
        delete characters[i][socket.id];
        io.to(i).emit("leave", left);
        console.log(`${left} left the room ${i}`);
        return;
      }
    }
  });
  socket.on("move", (room, data) => {
    socket.broadcast.to(room).emit("move", data);
  });
  socket.on("chat message", (room, user, message) => {
    socket.broadcast.to(room).emit("chat message", user, message);
  });
  socket.on("new invitation", invitation => {
    io.emit("new invitation", invitation);
    console.log(`${invitation.from} invited ${invitation.to} to the room ${invitation.room}`);
  });
});

server.listen(3000, () => {
  console.log("server started");
});