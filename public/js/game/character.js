class Character {
  constructor(name){
    this.name = name;
    this.health = 100;
    this.energy = 1;
    this.moves = {};

    this.moves["attack"] = this.attack;
    this.moves["heal"] = this.heal;
  }
  attack(enemy, damage = -1){
    if(damage == -1){
      damage = random(20, 40);
    }
  }
}