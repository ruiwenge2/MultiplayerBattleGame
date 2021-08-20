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
      print("Spiderman didn't do a good kick...");
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
    this.specialmove -= 1;
    if(this.specialmove > 0){
      print(this.specialmove + " time left to use this move.");
    } else {
      await sleep(1);
      print("You cannot use this move anymore.");
      delete this.moves["pika block"];
    }
  }
  async evolve(enemy){
    this.name = "Raichu";
    this.health = 100;
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
    this.specialmove = 2;
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
    this.specialmove -= 1;
    if(this.specialmove > 0){
      print(this.specialmove + " time left to use this move.");
    } else {
      await sleep(1);
      print("You cannot use this move anymore.");
      delete this.moves["pika block"];
    }
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
    this.specialmove = 2;
  }
}

class Hercules extends Character {
  constructor(){
    super("Hercules");
    this.moves["arrow shots"] = this.arrow_shots;
    this.moves["club strike"] = this.club_strike;
    this.moves["equalize healths"] = this.equalize_healths;
  }
  arrow_shots(enemy, chance = random(1, 100), damage1 = random(40, 45), damage2 = 0){
    if(chance <= 75){
      this.attack(enemy, damage1);
    } else {
      print("Hercules missed!");
    }
    type = "chances";
    value1 = damage1;
    value2 = damage2;
    randint = chance;
  }
  club_strike(enemy){
    this.attack(enemy, 35);
  }
  equalize_healths(enemy){
    if(this.health < enemy.health){
      print("This move will make Hercules's health equal to the enemy's.");
      let difference = enemy.health - this.health;
      this.health += difference;
    }
  }
}

class Jedi extends Character {
  constructor(){
    super("Jedi");
    delete this.moves["attack"];
    this.moves["lightsaber slash"] = this.attack;
    this.moves["force whirlwind"] = this.force_attack;
    this.moves["battlemind"] = this.force_mind;
    this.specialmove = 2
  }
  force_mind(enemy){
    this.energy += 0.2;
    print("Meditation increases the concentration and willpower of " + this.name);
    print(this.name + " has increased energy.");
    if(this.energy >= 1.8){
      delete this.moves["battlemind"];
    }
  }
  async force_attack(enemy){
    this.attack(enemy, 60);
    this.specialmove -= 1;
    if(this.specialmove > 0){
      print(this.specialmove + " time left to use this move.")
    } else {
      await sleep(1);
      print("You cannot use this move anymore.");
      delete this.moves["force whirlwind"];
    }
  }
}

class Voldemort extends Character {
  constructor(){
    super("Voldemort");
    delete this.moves["attack"];
    this.moves["crucio"] = this.attack;
    this.moves["killing curse"] = this.avadakedavra;
    this.moves["regeneration"] = this.heal;
    this.moves["create Horcrux"] = this.create_Horcrux;
  }
  avadakedavra(enemy, chance = random(1, 100), damage1 = 50, owndamage = 50){
    print("AVADA KEDAVRA!");
    if(chance <= 75){
      this.attack(enemy, value1);
    } else {
      print("Voldemort's curse rebounded!");
      this.attack(this, owndamage);
    }
    type = "owndamage";
    value1 = damage1;
    oppovalue = owndamage;
    randint = chance;
  }
  create_Horcrux(enemy){
    if(this.health <= 50){
      let difference = 100 - this.health;
      this.health += difference;
      print("Voldemort got {} more health.".format(difference));
    } else {
      this.health += 50;
      print("Voldemort got 50 more health.");
    }
  }
}
class Thanos extends Character {
  constructor(){
    super("Thanos");
    this.moves["smash"] = this.smash;
    this.moves["Thanos Snap"] = this.finger_snap;
  }
  finger_snap(enemy, damage = random(50, 70)){
    this.attack(enemy, damage);
  }
  smash(enemy, chance = random(1, 100), damage1 = random(25), owndamage = random(5, 15)){
    damage = random(25, 35);
    this.attack(enemy, damage);
    if(chance < 50){
      this.attack(this, owndamage);
    }
    type = "owndamage";
    value1 = damage1;
    oppovalue = owndamage;
    randint = chance;
  }
}

class Medusa extends Character {
  constructor(){
    super("Medusa");
    this.moves["claw slice"] = this.claw_slice;
    this.moves["stone attack"] = this.stone_attack;
    this.moves["snake bite"] = this.snake_bite;
  }
  async stone_attack(enemy, chance = random(1, 100), damage1 = 50, damage2 = 0){
    print("DUCK!");
    await sleep(1);
    if(chance <= 50){
      this.attack(enemy, 50);
    } else {
      print("The attack did nothing!");
    }
  }
  claw_slice(enemy){
    this.attack(enemy, 35);
  }
  async snake_bite(enemy, chance = random(1, 100), damage1 = random(40, 45), damage2 = random(15, 25)){
    if(chance <= 60){
      this.attack(enemy, damage1);
    } else {
      await sleep(1);
        print("The bite wasn't that bad!");
        self.attack(enemy, damage2);
    }
  }
}

const s = new Spiderman();
const p = new Pikachu();
const h = new Hercules();
const j = new Jedi();
const v = new Voldemort();
const t = new Thanos();
const m = new Medusa();