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
import { mapState } from 'vuex'

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
    }
  },
  computed: {
    isAlive() {
      return (
        this.cellsGrid.currentGridState[this.xPosition] &&
        this.cellsGrid.currentGridState[this.xPosition][this.yPosition]
      )
    },
    ...mapState({
      cellsGrid: (state) => state['cells-grid']
    })
  },
  methods: {
    toggleCellState() {
      this.$store.dispatch('cells-grid/toggleCellState', {
        x: this.xPosition,
        y: this.yPosition
      })
    }
  }
}
</script>

<style scoped>
.cell {
  display: block;
  padding-bottom: calc(100% - 2px);
  border-right: 2px dashed #959595;
  border-bottom: 2px dashed #959595;
  cursor: pointer;
  position: relative;
}
.cell:hover > .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  z-index: 100;
  display: block;
}
</style>
