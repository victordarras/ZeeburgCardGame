<template>
  <div class="Players">
    <section class="Player" v-for="player in players" :class="{active: players.indexOf(player) === currentPlayerId}" :key="player.name">

      <legend>{{ player.name }}</legend>
      <CardList :cards="player.cards" @useCard="useCard" :stacked="true" />
      <hr>

      <ul>
        <CardList :cards="player.mobs" @useCard="useCard" :stacked="true" />
      </ul>
      <strong>Total: {{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong>
    </section>
  </div>
</template>

<script>
import CardList from './CardList.vue'

export default {
  name: 'Players',
  props: {
    players:  {
      type: Array,
      required: true,
      default: () => []
    },
    currentPlayerId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    useCard: function(card) {
      this.$emit('useCard', card)
    }
  },
  components: { CardList }
}
</script>

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

</style>
