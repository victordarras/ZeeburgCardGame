<template>
  <div id="app">
    <h1 class="Title">Zeeburg</h1>
    <div class="Scores">
      <div class="Score" v-for="player in players" :key="player.name">
        <strong>{{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong><br>
        {{ player.name }}
      </div>
    </div>

    <div class="Board">
      <button
        @click="pickCard(true)"
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
        <CardList :cards="[currentMob]" />

        <CardList :cards="currentCards" :stacked="true" />

        <div class="Attacks">

          Damages: {{ currentMob.level - currentDamages }} / {{ currentMob.level }}
        </div>

      </template>
    </div>

    <div class="Players">
      <div v-if="waitingForPlayer">
        <h1>Waiting for player {{ currentPlayer.name }}</h1>
        <button class="CardPile" @click="waitingForPlayer = !waitingForPlayer">Deck de {{ currentPlayer.name }}</button>
      </div>
      <Player
         v-else
        :player="currentPlayer"
        @useCard="useCard"
      />
    </div>
  </div>
</template>

<script>
import cards from './card.js'
import Player from './components/Player.vue'
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
    pickCard: function(turn) {
      if (this.cards.length === 0) {
        return alert('La pioche est vide.')
      }
      const newCard = this.cards.shift()
      this.currentPlayer.cards.push(newCard);
      if (turn) {
        this.nextTurn();
      }
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
      this.currentCards.push(card);
      this.currentPlayer.cards.splice(this.currentPlayer.cards.indexOf(card), 1);

      if (this.currentDamages >= this.currentMob.level) {
        this.killMob();
      } else {
        this.nextTurn();
      }
      this.pickCard();
    },
    nextPlayer() {
      this.currentPlayerId = this.currentPlayerId >= 3 ? 0 : this.currentPlayerId + 1;
    },
    killMob() {
      alert(`Vous achevez ${this.currentMob.name} et récupérez ${this.currentMob.level}XP !`)
      this.currentPlayer.mobs.push(this.currentMob)
      this.currentMob = undefined;
      this.currentCards = [];
      this.nextTurn()
    },
    nextTurn() {
      this.waitingForPlayer = true;
      this.nextPlayer()
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
  components: { Player, CardList },
  created() {
    this.distributeCards();
  }
}
</script>
