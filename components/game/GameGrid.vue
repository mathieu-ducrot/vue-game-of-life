<template>
  <canvas
    ref="game-grid"
    :width="gridWidth"
    :height="gridHeight"
    class="is-block"
  ></canvas>
</template>

<script>
import { mapState } from 'vuex'

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
      livingCellFillStyle: '#82ded2',
      deadCellFillStyle: '#fff',
      cellResolution: 40 // todo add a watch function and change the cellResolution based on the window resolution
    }
  },
  computed: {
    gridWidth() {
      return this.cellsPerRow * this.cellResolution
    },
    gridHeight() {
      return this.cellsPerColumn * this.cellResolution
    },
    ...mapState({
      cellsGrid: (state) => state['cells-grid']
    })
  },
  mounted() {
    this.$store.dispatch('cells-grid/initGridState', {
      cellsPerRow: this.cellsPerRow,
      cellsPerColumn: this.cellsPerColumn
    })
    this.randomizeGridState()
  },
  methods: {
    randomizeGridState() {
      this.$store.dispatch('cells-grid/randomizeGridState')

      this.drawCellsGrid()
    },
    drawCellsGrid(ctx) {
      window.console.log('drawing process')
      ctx = this.getCanvasContext()

      for (let x = 0; x < this.cellsPerRow; x++) {
        for (let y = 0; y < this.cellsPerColumn; y++) {
          ctx.strokeRect(
            x * this.cellResolution,
            y * this.cellResolution,
            this.cellResolution,
            this.cellResolution
          )

          // Draw a living cell base on the cells grid current state
          if (
            typeof this.cellsGrid.currentGridState[x] !== 'undefined' &&
            typeof this.cellsGrid.currentGridState[x][y] !== 'undefined' &&
            this.cellsGrid.currentGridState[x][y]
          ) {
            ctx.fillStyle = this.livingCellFillStyle
          } else {
            ctx.fillStyle = this.deadCellFillStyle
          }

          ctx.fillRect(
            x * this.cellResolution + 1,
            y * this.cellResolution + 1,
            this.cellResolution - 1,
            this.cellResolution - 1
          )
        }
      }
    },
    getCanvasContext() {
      const canvas = this.$refs['game-grid']
      if (canvas.getContext) {
        return canvas.getContext('2d')
      } else {
        // todo case when canvas is not supported
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
