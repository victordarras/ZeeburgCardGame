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
    >
      <!-- {{ card.level }} of {{ card.family }} -->
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
          return '🐑'
      }
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

.Card:hover {
  cursor: pointer;
  box-shadow:
    inset 0 0 0 5px #fff,
    inset 0 0 0 6px #777,
    5px 3px 15px rgba(0,0,0,0.2);
  transform: translateY(-3px) rotate(1deg);
}
</style>
