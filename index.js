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
  if((await db.list()).includes(username) && (await db.get(username)) == password){
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
          db.set(newusername, newpassword).then(() => {
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

app.get("/join", (req, res) => {
  if(!f.loggedIn(req)){
    res.redirect("/login");
    return;
  }
  res.render("join.html", {loggedIn:true, user:f.getUser(req)});
});

app.get("/howtoplay", (req, res) => {
  res.render("howtoplay.html", {loggedIn:f.loggedIn(req), user:f.getUser(req)});
});

app.get("/play", (req, res) => {
  if(!f.loggedIn(req)){
    res.redirect("/login");
    return;
  }
  res.render("game/playagainstcomputer.html", {loggedIn:true, user:f.getUser(req)});
  console.log(f.getUser(req) + " is playing against the computer");
});

app.get("/game/:room", (req, res) => {
  if(!f.loggedIn(req)){
    res.redirect("/login");
    return;
  }
  let room = req.params.room;
  if(!Object.keys(users).includes(room)){
      users[room] = {};
    }
    length = Object.keys(users[room]).length;
    if(length < 2){
      if(length == 0){
        res.render("game/multiplayer/player1.html", {user:f.getUser(req), room:room, loggedIn:true});
      } else {
        res.render("game/multiplayer/player2.html", {user:f.getUser(req), room:room, otheruser:Object.values(users[room])[0], loggedIn:true});
      }
    } else {
      res.render("error.html", {title:"Connect 4", content:`<h1 style="margin-top:50px;">Sorry, this room already has 2 players. Go join another.</h1>`, loggedIn:true, user:f.getUser(req)});
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
  res.status(404).render("error.html", {loggedIn:f.loggedIn(req), user:f.getUser(req), title:"Page Not Found", content:`<h1>Error 404</h1><h2>Page Not Found</h2><img src="/img/robot.jpeg" width="400px" style="border:none"><br><br><a href="/" style="color:white; font-size:20px">Go to home</a>`});
});

io.on("connection", socket => {
  socket.on("joined", (room, user) => {
    if(!users[room]) users[room] = {};
    users[room][socket.id] = user;
    socket.join(room);
    socket.broadcast.to(room).emit("joined", user);
    console.log(`${user} joined the room ${room}`);
  });
  socket.on("movedown", room => {
    socket.broadcast.to(room).emit("movedown");
  });
  socket.on("moveup", room => {
    socket.broadcast.to(room).emit("moveup");
  });
  socket.on("endmovedown", room => {
    socket.broadcast.to(room).emit("endmovedown");
  });
  socket.on("endmoveup", room => {
    socket.broadcast.to(room).emit("endmoveup");
  });
  socket.on("disconnect", () => {
    for(i of Object.keys(users)){
      if(Object.keys(users[i]).includes(socket.id)){
        let left = users[i][socket.id];
        delete users[i][socket.id];
        io.to(i).emit("leave", left);
        console.log(`${left} left the room ${i}`);
        return;
      }
    }
  });
  socket.on("new invitation", invitation => {
    io.emit("new invitation", invitation);
    console.log(`${invitation.from} invited ${invitation.to} to the room ${invitation.room}`);
  });
});

server.listen(3000, () => {
  console.log("server started");
});