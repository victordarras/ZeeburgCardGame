<template>
  <div id="app">
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
          <ul>
          <li
            v-for="card in currentCards"
            :key="card"
            class="Card stacked"
            :level="card.level"
            :family="familyToEmoji(card.family)"
          >
          </li>
          </ul>
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
        <button @click="waitingForPlayer = !waitingForPlayer">GO</button>
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
import Players from './components/Players.vue'
import cards from './card.js'

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
        return alert('No card left.')
      }
      const newCard = this.cards.shift()
      this.currentPlayer.cards.push(newCard);
      this.nextPlayer();
    },
    pickMob: function() {
      if (this.mobs.length === 0) {
        return alert('No mob left.')
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
        // case "K":
        // case "Q":
        // case "C":
        // case "J":
        default:
          this.currentCards.push(card)
          break;
      }
      this.currentPlayer.cards.splice(this.currentPlayer.cards.indexOf(card), 1)
      // console.log(this.currentDamages , this.currentMob.level)
      if (this.currentDamages >= this.currentMob.level) {
        this.killMob();
      } else {
        this.nextPlayer();
      }
    },
    nextPlayer() {
      // this.waitingForPlayer = true;
      this.currentPlayerId = this.currentPlayerId >= 3 ? 0 : this.currentPlayerId + 1;
    },
    killMob() {
      alert(`You killed the ${this.currentMob.name}(${this.currentMob.level}) !`)
      this.currentPlayer.mobs.push(this.currentMob)
      this.currentCards = [];
      this.currentMob = undefined;
      this.nextPlayer()
    },
    familyToEmoji(family) {
      switch (family) {
        case "SPADE":
          return '♠'
        case "DIAMOND":
          return '♦'
        case "HEART":
          return '♥'
        case "CLUB":
          return '♣'
        default:
          return '🐑'
      }
    }
  },
  computed: {
    currentPlayer() {
      return this.players[this.currentPlayerId]
    },
    currentDamages() {
      return this.currentCards.reduce((a,c) => a + parseInt(c.level), 0)
    }
  },
  components: { Players },
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

.CardPile {
  display: inline-block;
  vertical-align: top;
  height: calc(1.6 * 15vh);
  width: calc(1 * 15vh);;
  margin: 1vh;
  border: 1px solid #000;
  border-radius: 1vh;
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
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70% {
    transform: translateX(-2px);
  }

  20%,
  40%,
  60% {
    transform: translateX(2px);
  }

  80% {
    transform: translateX(1px);
  }

  90% {
    transform: translateX(-1px);
  }
}
.MobPile:not(:disabled) {
  animation: shake-horizontal 1s ease-in-out infinite;
}
</style>
