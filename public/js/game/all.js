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
  async flying_kick(enemy, chance = random(1, 100), damage1 = random(35, 40), damage2 = random(20, 25)){
    if(chance <= 75){
      this.attack(enemy, damage1);
    } else {
      print("Spiderman didn't do a good kick...") // for now
      await sleep(1);
      this.attack(enemy, damage2);
    }
    type = "chances";
    value1 = damage1;
    value2 = damage2;
    randint = chance;
  }
  think(enemy){
    this.energy += 0.15;
    print(this.name + " has increased energy.");
    if(this.energy >= 2){ // if energy gets too high
      delete this.moves["think"];
    }
  }
}

class Pikachu extends Character {
  constructor(){
    super("Pikachu");
    this.moves["thunder shock"] = this.thunder_shock;
    this.moves["tail slap"] = this.tail_slap;
    this.moves["pika block"] = this.pika_block;
    this.moves["evolve"] = this.evolve;
    this.specialmove = 2;
  }
  thunder_shock(enemy, chance = random(1, 100), damage1 = random(40, 50), damage2 = 10){
    this.attack(enemy, damage1);
    if(chance <= 50){
      this.attack(this, damage2);
    }
    type = "chances";
    value1 = damage1;
    value2 = damage2;
    randint = chance;
  }
  tail_slap(enemy){
    this.attack(enemy, 35);
  }
  async pika_block(enemy, damage = random(30, 45)){
    print("Pikachu will get 20 health to block some of the enemy's attack.");
    this.health += 20;
    await sleep(1);
    this.attack(enemy, damage);
  }
  async evolve(enemy){
    this.name = "Raichu"
    this.health = 100
    print("Pikachu evolving ...");
    await sleep(1);
    print("Pikachu evolved to Raichu!");
    delete this.moves["thunder shock"];
    delete this.moves["tail slap"];
    delete this.moves["pika block"];
    delete this.moves["evolve"];
    this.moves["thunder punch"] = this.thunder_punch;
    this.moves["wild charge"] = this.wild_charge;
    this.moves["raichu block"] = this.raichu_block;
    this.moves["unevolve"] = this.unevolve;
    this.specialmove1 = 2;
  }
  thunder_punch(enemy, damage = random(45, 50)){
    this.attack(enemy, damage);
  }
  wild_charge(enemy, damage = random(40, 50)){
    this.attack(enemy, damage);
  }
  async raichu_block(enemy, damage = random(30, 45)){
    print("Raichu will get 25 health to block some of the attacks.");
    this.health += 25;
    await sleep(1);
    this.attack(enemy, damage);
  }
  async unevolve(enemy){
    this.name = "Pikachu";
    this.health = 100;
    print("Raichu unevolved to Pikachu.");
    delete this.moves["thunder punch"];
    delete this.moves["wild charge"];
    delete this.moves["raichu block"];
    delete this.moves["unevolve"];
    this.moves["thunder shock"] = this.thunder_shock;
    this.moves["tail slap"] = this.tail_slap;
    this.moves["pika block"] = this.pika_block;
    this.moves["evolve"] = this.evolve;
  }
}

class Hercules extends Character {
  constructor(){
    super("Hercules");
  }
}

class Jedi extends Character {
  constructor(){
    super("Jedi");
  }
}

class Voldemort extends Character {
  constructor(){
    super("Voldemort");
  }
}

class Thanos extends Character {
  constructor(){
    super("Thanos");
  }
}

class Medusa extends Character {
  constructor(){
    super("Medusa");
  }
}

const s = new Spiderman();
const p = new Pikachu();