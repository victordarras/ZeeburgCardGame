<template>
  <ul>
    <li
      class="Card"
      :class="{ stacked }"
      v-for="card in cards"
      @click="$emit('useCard', card)"
      :key="card.level + card.family"
      :level="card.level"
      :family="familyToEmoji(card.family)"
      :style="bgUrl(card)"
    >
      <!-- {{ card.family ? '' : card.name}} -->
    </li>
  </ul>
</template>

<script>
export default {
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
          return ''
      }
    },
    bgUrl(card) {
      let kind;
      if (card.family) {
        switch (card.family) {
          case "SPADE":
            kind = "s"
            break;
          case "DIAMOND":
            kind = "d"
            break;
          case "HEART":
            kind = "h"
            break;
          case "CLUB":
            kind = "c"
            break;
          default:
            kind = Array.from(card.family).shift();
            break;
        }
      } else {
        kind = "t"; // tarot
      }
      return `background-image: url('./cardgame/${kind}${card.level}.svg');`
    }
  },
  props: {
    cards: {
      required: true,
      type: Array
    },
    stacked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
