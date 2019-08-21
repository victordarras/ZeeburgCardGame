<template>
  <div id="app">
    <div class="Scores">
      <label for="">Score</label>
      <div class="Score" v-for="player in players" :key="player.name">
        {{ player.name }}<br>
        <strong>{{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong>
      </div>
    </div>
    <h1>Zeeburg</h1>
    <div class="Board">
      <button class="CardPile" @click="pickCard()">CARD ({{ cards.length }} remaining)</button>
      <button :disabled="currentMob" class="CardPile MobPile" @click="pickMob()">MOB ({{ mobs.length }} remaining)</button>

      <template v-if="currentMob">
        <div class="Mob">
          <div class="Card" style="text-align:center">
            {{ currentMob.level }}<br/>{{ currentMob.name }}
          </div>
        </div>
        <div class="Attacks">
          Damages: {{ currentMob.level - currentDamages }} / {{ currentMob.level }}
          <hr>
          <CardList :cards="currentCards" :stacked="true" />
        </div>

      </template>
    </div>
      <!-- <ul>
        <li v-for="card in cards">{{ card.level }} of {{ card.family }}</li>
      </ul>
      <ul>
        <li v-for="mob in mobs">{{ mob.name }}{{ mob.level }}</li>
      </ul> -->
      <div v-if="waitingForPlayer">
        <h1>Waiting for player <br>{{ currentPlayer.name }}</h1>
        <button class="CardPile" @click="waitingForPlayer = !waitingForPlayer">Deck de {{ currentPlayer.name }}</button>
      </div>
      <Players
        v-else
        :players="players"
        :currentPlayerId="currentPlayerId"
        @useCard="useCard"
      />
  </div>
</template>

<script>
import cards from './card.js'
import Players from './components/Players.vue'
import CardList from './components/CardList.vue'

export default {
  name: 'app',
  data() {
    return {
      cards: cards.DECK,
      mobs: cards.MOBS,
      currentMob: undefined,
      currentCards: [],
      waitingForPlayer: false,
      players: [
        { name: 'vic', cards: [], mobs: [] },
        { name: 'tom', cards: [], mobs: [] },
        { name: 'val', cards: [], mobs: [] },
        { name: 'yan', cards: [], mobs: [] }
      ],
      currentPlayerId: 0
    }
  },
  methods: {
    pickCard: function() {
      if (this.cards.length === 0) {
        return alert('La pioche est vide.')
      }
      const newCard = this.cards.shift()
      this.currentPlayer.cards.push(newCard);
      this.nextTurn();
    },
    pickMob: function() {
      if (this.mobs.length === 0) {
        return alert('Aucun monstre disponible.')
      }
      this.currentMob = this.mobs.shift();
    },
    distributeCards: function() {
      this.players.forEach(player => {
        for (var i = 0; i < 5; i++) {
          player.cards.push(this.cards.shift());
        }
      })
    },
    useCard: function(card) {
      if (this.currentMob === undefined) {
        return false;
      }
      switch (card.family) {
        case "K":
          return false;
        case "Q":
          return false;
        case "C":
          return false;
        case "J":
          return false;
        default:
          this.currentCards.push(card)
          break;
      }
      this.currentPlayer.cards.splice(this.currentPlayer.cards.indexOf(card), 1)
      // console.log(this.currentDamages , this.currentMob.level)
      if (this.currentDamages >= this.currentMob.level) {
        this.killMob();
      } else {
        this.nextTurn();
      }
    },
    nextTurn() {
      this.waitingForPlayer = true;
      this.nextPlayer()
    },
    nextPlayer() {
      this.currentPlayerId = this.nextPlayerId;
    },
    killMob() {
      alert(`Vous achevez ${this.currentMob.name} et récupérez ${this.currentMob.level}XP !`)
      this.currentPlayer.mobs.push(this.currentMob)
      this.currentCards = [];
      this.currentMob = undefined;
      this.nextTurn()
    }
  },
  computed: {
    currentPlayer() {
      return this.players[this.currentPlayerId]
    },
    currentDamages() {
      return this.currentCards.reduce((a,c) => a + parseInt(c.level), 0)
    },
    nextPlayerId() {
      return this.currentPlayerId >= 3 ? 0 : this.currentPlayerId + 1
    }
  },
  components: { Players, CardList },
  created() {
    this.distributeCards();
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #F5F5F5;
  overflow: hidden;
  min-height: 100vh;
}

.Board {
  margin-bottom: 2vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 5fr
}
button {
  cursor: pointer;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
legend {
  display: inline-block;
  font-size: 1.25em;
  font-weight: 600;
}

.Scores {
  float: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5em;
}
.Score {
  min-width: 3em;
  margin-left: 0.5em;
  padding: 0.5em 1em;
  border-radius: 1vh;
  border: 1px solid #ddd;
  background-color: #fff;
  text-align: center;
}
.CardPile {
  display: inline-block;
  vertical-align: top;
  height: calc(1.6 * 9vh);
  width: calc(1 * 9vh);;
  margin: 1vh;
  border: 1px solid #000;
  border-radius: 1vh;
  background: linear-gradient(
      45deg,
      transparent calc(50% - 1px),
      rgba(0,0,0,0.2) 0,
      rgba(0,0,0,0.2) calc(50% + 1px),
      transparent 0
    ) 0 0/ 0.5em 0.5em;
  box-shadow:
    0 1px 0 #fff,
    0 2px 0 #000,
    0 3px 0 #fff,
    0 4px 0 #000,
    0 5px 0 #fff,
    0 6px 0 #000,
    0 10px 5px rgba(0,0,0,0.1)
  ;
}
.Card {
  display: inline-block;
  vertical-align: top;
  height: calc(1.6 * 8vh);
  width: calc(1 * 8vh);;
  margin: 1vh;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 1vh;
  background-color: #fff;
  text-align: left;
  box-shadow:
    inset 0 0 0 5px #fff,
    inset 0 0 0 6px #777;
  transition: transform 0.1s;
}
.Card.stacked:not(:first-child) {
  margin-left: -5vh;
}
[family="♦"], [family="♥"] {
  color: softblue;
}

[level]:before {
  content: attr(family);
  display: block;
  font-size: 1.25em;
  line-height: 1;
}
[level]:after {
  content: attr(level);
}
@keyframes shake-horizontal {
  0%,
  100% {
    transform: translateY(0);
  }

  10%,
  30%,
  50%,
  70% {
    transform: translateY(-2px);
  }

  20%,
  40%,
  60% {
    transform: translateY(2px);
  }

  80% {
    transform: translateY(1px);
  }

  90% {
    transform: translateY(-1px);
  }
}
.MobPile:not(:disabled) {
  animation: shake-horizontal 1s ease-in-out infinite;
}
</style>
