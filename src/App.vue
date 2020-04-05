<template>
  <div id="app">
    <div class="Board">
      <div class="rules">
        <ul>
          <li><b>Les cartes</b> de 1 à 10 sont des dégâts direct.</li>
          <li><b>Les figures</b> créent différents effets (à utiliser avec une carte 1-10):</li>
          <li><b>Les valets</b> Multiplie x2 la carte dégât jouée</li>
          <li><b>Les cavaliers</b> Augmente le niveau du monstre</li>
          <li><b>Les dames</b> Divise la puissance du monstre par deux </li>
          <li><b>Les rois</b> Offre une carte supplémentaire de la pioche</li>
          <li><b>L'Excuse</b> (joker): Permet de prendre n'importe qu'elle figure posé devant n'importe qu'elle joueur (vu plus bas, il n'y a pas de carte devant les joueurs à prior)</li>
        </ul>

        <p>Si les dégâts sont supérieurs au niveau du monstres, le dernier attaquant gagne l'expérience et garde la carte monstre. </p>
        <p>Si les dégâts sont inférieurs, c'est au joueur suivant.</p>
      </div>

      <div class="Scores">
        <div
          class="Score"
          :class="player.id === currentPlayerId ? 'active' : '' "
          v-for="player in players"
          :key="player.name"
        >
          <h5>{{ player.name }}</h5>
          <p><strong>{{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong></p>
        </div>
      </div>

      <div class="Center">
        <button
          @click="pickCard(true)"
          class="CardPile"
        >
          <span>CARD<br />({{ cards.length }} remaining)</span>
        </button>

        <button
          @click="pickMob()"
          :disabled="currentMob"
          class="CardPile MobPile"
        >
          <span>MOB<br />({{ mobs.length }} remaining)</span>
        </button>

        <template v-if="currentMob">
          <CardList :cards="[currentMob]" />

          <CardList :cards="currentCards" :stacked="true" />

          <div class="Damages">
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
        { id: 0, name: 'vic', cards: [], mobs: [] },
        { id: 1, name: 'tom', cards: [], mobs: [] },
        { id: 2, name: 'val', cards: [], mobs: [] },
        { id: 3, name: 'yan', cards: [], mobs: [] }
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

      this.pickCard();
      if (this.currentDamages >= this.currentMob.level) {
        this.killMob();
      } else {
        this.nextTurn();
      }
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
      return this.players[this.currentPlayerId];
    },
    currentDamages() {
      return this.currentCards.reduce((a,c) => a + parseInt(c.level), 0);
    }
  },
  components: { Player, CardList },
  created() {
    this.distributeCards();
  }
}
</script>
