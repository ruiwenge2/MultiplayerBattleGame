class Spiderman extends Character {
  constructor(){
    super("Spiderman");
    this.moves["web shooter"] = this.web_shooter;
    this.moves["face punch"] = this.face_punch;
    this.moves["flying kick"] = this.flying_kick;
    this.moves["think"] = this.think;
  }
  web_shooter(enemy, damage = random(40, 50)){
    this.attack(enemy, damage);
  }
  face_punch(enemy, damage = random(30, 45)){
    this.attack(enemy, damage);
  }
  flying_kick(enemy, chance = random(1, 100), damage1 = random(35, 40), damage2 = random(20, 25)){
    if(chance <= 75){
      this.attack(enemy, damage1);
    } else {
      print("Spiderman didn't do a good kick...") // for now
      this.attack(enemy, damage2);
    }
    type = "chances";
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