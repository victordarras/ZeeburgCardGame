<template>

  <section class="Player active">

    <legend>{{ player.name }}</legend>
    <CardList :cards="player.cards" @useCard="useCard" :stacked="true" />
    <hr>

    <ul>
      <CardList :cards="player.mobs" @useCard="useCard" :stacked="true" />
    </ul>
    <strong>Total: {{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong>
  </section>

</template>

<script>
import CardList from './CardList.vue'

export default {
  name: 'Player',
  props: {
    player:  {
      type: Object,
      required: true,
      default: () => {}
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
.Player:not(.active) {
  display: none;
  pointer-events: none;
}

</style>
