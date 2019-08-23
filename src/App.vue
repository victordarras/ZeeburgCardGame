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
      <button
        @click="pickCard()"
        :disabled="currentPlayer.cards.length >= 5"
        class="CardPile"
      >
        CARD<br />({{ cards.length }} remaining)
      </button>
      <button
        @click="pickMob()"
        :disabled="currentMob"
        class="CardPile MobPile"
      >
        MOB<br />({{ mobs.length }} remaining)
      </button>

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
      this.pickCard();
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
