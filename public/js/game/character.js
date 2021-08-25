var type, value, value1, value2, type, randint, oppovalue;

// types of moves: attack, heal, chances, owndamage, and none
class Character {
  constructor(name){
    this.name = name;
    this.health = 100;
    this.energy = 1;
    this.moves = {};

    this.moves["attack"] = this.attack;
    this.moves["heal"] = this.heal;
  }
  async attack(enemy, damage = -1){
    if(damage == -1){
      damage = random(20, 40);
    }
    damage *= this.energy;
    damage = round(damage);
    enemy.health -= damage;
    print(`${this.name} did  ${damage} damage to ${enemy.name}`);
    type = "attack";
    value = damage;
  }
  async heal(enemy, n = random(25, 40)){
    n *= this.energy;
    this.health += round(n);
    print(`${this.name} healed self ${n}`);
    type = "heal";
    value = n;
  }
}