<template>
  <div id="app">
    <div class="Board">
      <Rules />

      <div class="Scores">
        <div
          class="Score"
          :class="p.id === currentPlayerId ? 'active' : '' "
          v-for="p in players"
          :key="p.name"
        >
          <h3 class="title">{{ p.name }}</h3>
          <p class="value">{{ playerScore(p)}} point{{ playerScore(p) > 1 ? 's' : ''}} </p>
        </div>
      </div>

      <div class="Center">
        <button @click="pickCard(true)" class="CardPile" >
          <span>{{ cards.length }} CARD{{ cards.length ? 'S' : ''}}</span>
        </button>

        <button @click="pickMob()" :disabled="currentMob" class="CardPile shake">
          <span>{{ mobs.length }} MOB{{ mobs.length ? 'S' : ''}}</span>
        </button>

        <template v-if="currentMob">
          <CardList :cards="[currentMob]" />
          <CardList :cards="currentCards" :stacked="true" />
        </template>
      </div>


      <div class="Players">
        <div v-if="waitingForPlayer">
          <h1>Waiting for player {{ currentPlayer.name }}</h1>
          <button class="CardPile shake" @click="waitingForPlayer = !waitingForPlayer">
            <span>{{ currentPlayer.name }}'s deck</span>
          </button>
        </div>
        <template v-else>
          <Player
            :player="currentPlayer"
            @useCard="useCard"
          />
          <!-- <p v-if="currentMob">{{ currentMob.level - currentDamages }} / {{ currentMob.level }}</p> -->
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import cards from './card.js'
import Rules from './components/Rules.vue'
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
        { id: 0, name: 'Victor', cards: [], mobs: [] },
        { id: 1, name: 'Tom', cards: [], mobs: [] },
        { id: 2, name: 'Valentin', cards: [], mobs: [] },
        { id: 3, name: 'Yann', cards: [], mobs: [] }
      ],
      currentPlayerId: 0,
      currentDamages: 0
    }
  },
  methods: {
    playerScore(player) {
      return player.mobs.reduce((a, c) => a + c.level,0)
    },
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
      this.currentDamages += card.level;
      this.currentPlayer.cards.splice(this.currentPlayer.cards.indexOf(card), 1);

      this.pickCard();

      setTimeout(() => {
        if (this.currentDamages >= this.currentMob.level) {
          this.killMob();
        } else {
          this.nextTurn();
        }
      }, 5000)
    },
    nextPlayer() {
      this.currentPlayerId = this.currentPlayerId >= 3 ? 0 : this.currentPlayerId + 1;
    },
    killMob() {
      alert(`Vous achevez ${this.currentMob.name} et récupérez ${this.currentMob.level}XP !`)
      this.currentPlayer.mobs.push(this.currentMob)
      this.currentMob = undefined;
      this.currentCards = [];
      this.currentDamages = 0;
      this.nextTurn()
    },
    nextTurn() {
      this.waitingForPlayer = true;
      this.nextPlayer()
    }
  },
  computed: {
    currentPlayer() {
      return this.players[this.currentPlayerId];
    },
    // currentDamages() {
    //   return this.currentCards.reduce((a,c) => a + parseInt(c.level), 0);
    // }
  },
  components: { Player, CardList, Rules },
  created() {
    this.distributeCards();
  }
}
</script>


<style lang="stylus" src="./assets/style.styl"></style>
