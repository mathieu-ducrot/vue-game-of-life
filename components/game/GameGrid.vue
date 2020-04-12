<template>
  <canvas
    ref="game-grid"
    :width="gridWidth"
    :height="gridHeight"
    class="is-block"
  ></canvas>
</template>

<script>
export default {
  name: 'GameGrid',
  props: {
    cellsPerRow: {
      type: Number,
      default: 20
    },
    cellsPerColumn: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      cellResolution: 40 // todo add a watch function and change the cellResolution based on the window resolution
    }
  },
  computed: {
    gridWidth() {
      return this.cellsPerRow * this.cellResolution
    },
    gridHeight() {
      return this.cellsPerColumn * this.cellResolution
    }
  },
  mounted() {
    const canvas = this.$refs['game-grid']

    if (canvas.getContext) {
      this.drawEmptyGrid(canvas.getContext('2d'))
    } else {
      // todo case when canvas is not supported
    }
  },
  methods: {
    drawEmptyGrid(ctx) {
      window.console.log('drawing process')
      ctx.fillStyle = '#82ded2'

      for (let x = 0; x < this.cellsPerRow; x++) {
        for (let y = 0; y < this.cellsPerColumn; y++) {
          ctx.strokeRect(
            x * this.cellResolution,
            y * this.cellResolution,
            this.cellResolution,
            this.cellResolution
          )
          // Temp test to fill the grid
          if ((x % 3 === 0 && y % 2 === 1) || (x % 2 === 1 && y % 4 === 0)) {
            ctx.fillRect(
              x * this.cellResolution + 1,
              y * this.cellResolution + 1,
              this.cellResolution - 1,
              this.cellResolution - 1
            )
          }
        }
      }
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  border: 1px solid black;
}
</style>
