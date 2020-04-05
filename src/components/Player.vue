<template>

  <section class="Player active">
    <CardList :cards="player.cards" @useCard="useCard" :stacked="true" :handed="true" />
    <br>
    <CardList :cards="player.mobs" @useCard="useCard" :stacked="true" />
    <legend>{{ player.name }}</legend><br>
    <strong>Score: {{ player.mobs.reduce((a, c) => a + c.level,0)}}</strong>
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
  data: function () {
    return {
      currentStack: {
        type: Array,
        default: () => []
      }
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
