<template>
  <div class="Players">
    <section class="Player" v-for="player in players" :class="{active: players.indexOf(player) === currentPlayerId}">

      <legend>{{ player.name }}</legend>
      <ul>
        <li
          v-for="card in player.cards"
          @click="$emit('useCard', card)"
          class="Card stacked"
          :level="card.level"
          :family="familyToEmoji(card.family)"
        >
          <!-- {{ card.level }} of {{ card.family }} -->
        </li>
      </ul>
      <hr>

      <ul>
        <li class="Card" v-for="mob in player.mobs">{{ mob.level }} • {{ mob.name }}</li>
      </ul>
      <strong>Total: {{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Players',
  methods: {
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
  props: {
    players:  {
      type: Array,
      required: true,
      default: []
    },
    currentPlayerId: {
      type: Number,
      required: true,
      default: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Players {
}
.Player {
  padding: 10px;
  text-align: center;
}
.Player.active {
  order: -1;
  grid-column: 1/4;
  background-color: #eee;
}
.Player:not(.active) {
  display: none;
  pointer-events: none;
}

.Card:hover {
  box-shadow:
    inset 0 0 0 5px #fff,
    inset 0 0 0 6px #777,
    5px 3px 15px rgba(0,0,0,0.2);
  transform: translateY(-3px) rotate(1deg);
}

</style>
