function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      attackCnt: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterHealthRate() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthRate() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      else if(this.playerHealth > 100)
      {
        return {width: "100%"};
      }
      return { width: this.playerHealth + "%"};
    },
    isPossibleSpatialAttack() {
      return this.attackCnt % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      const damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.attackCnt++;
      this.setLog('player', 'attack', damage);
    },
    attackPlayer() {
      const damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
      this.setLog('monster', 'attack', damage);
    },
    spatialAttack() {
      const damage = getRandomValue(10, 20);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.attackCnt++;
      this.setLog('player', 'attack'. damage);
    },
    healPlayer() {
      this.attackCnt++;
      const heal = getRandomValue(15, 30);
      this.playerHealth += heal;
      this.attackPlayer();
      this.setLog('player', 'heal', heal);
    },
    startGame() {

        this.winner = null;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.attackCnt = 0;
    },
    surrender(){
        this.winner = 'monster';
    },
    setLog(who, what, value){
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value,
        });
    }
  },
});

app.mount("#game");
