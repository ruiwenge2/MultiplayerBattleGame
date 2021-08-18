class Spiderman extends Character {
  constructor(){
    super("Spiderman");
    this.moves["web shooter"] = this.web_shooter;
    this.moves["face punch"] = this.face_punch;
    this.moves["flying kick"] = this.flying_kick;
    this.moves["think"] = this.think;
  }
  web_shooter(enemy){
    this.attack(enemy, random(40, 50));
  }
  face_punch(enemy){
    this.attack(enemy, random(30, 45));
  }
  flying_kick(enemy){
    if(random(1, 100) <= 75){
      this.attack(enemy, random(35, 40));
    } else {
      print("Spiderman didn't do a good kick...") // for now
      this.attack(enemy, random(20, 25));
    }
  }
  think(enemy){
    this.energy += 0.15;
    print(this.name + " has increased energy.");
    if(this.energy >= 2){ // if energy gets too high
      delete this.moves["think"];
    }
  }
}

const s = new Spiderman();
const t = new Spiderman();