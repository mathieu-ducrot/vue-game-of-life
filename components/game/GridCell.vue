<template>
  <div
    class="cell"
    :style="isAlive ? 'background-color: ' + aliveColor + ';' : ''"
    @mousedown="toggleCellState()"
  >
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'GridCell',
  props: {
    xPosition: {
      type: Number,
      required: true
    },
    yPosition: {
      type: Number,
      required: true
    },
    aliveColor: {
      type: String,
      required: true
    },
    isAlive: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleCellState() {
      this.$emit('toggle-cell-state', { x: this.xPosition, y: this.yPosition })
    }
  }
}
</script>
