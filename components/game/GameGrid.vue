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
      default: 30
    }
  },
  data() {
    return {
      livingCellFillStyle: '#82ded2',
      deadCellFillStyle: '#fff',
      cellResolution: 30 // todo add a watch function and change the cellResolution based on the window resolution
    }
  },
  computed: {
    gridWidth() {
      return this.cellsPerRow * this.cellResolution
    },
    gridHeight() {
      return this.cellsPerColumn * this.cellResolution
    },
    canvasContext() {
      const canvas = this.$refs['game-grid']
      if (canvas.getContext) {
        return canvas.getContext('2d')
      } else {
        // todo case when canvas is not supported
        return false
      }
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
    this.drawCellsGrid()
  },
  methods: {
    launchGridEvolution() {
      window.console.log('launch evolution')
      const timerId = setInterval(() => this.nextGridState(), 300)
      window.console.log(timerId)
    },
    nextGridState() {
      window.console.log('next grid state')
      this.$store.dispatch('cells-grid/nextGridState')
    },
    randomizeGridState() {
      window.console.log('randomize state')
      this.$store.dispatch('cells-grid/randomizeGridState')
    },
    drawCellsGrid() {
      window.console.log('drawing process')
      this.canvasContext.clearRect(0, 0, this.gridWidth, this.gridHeight)

      for (let x = 0; x < this.cellsPerRow; x++) {
        for (let y = 0; y < this.cellsPerColumn; y++) {
          this.canvasContext.strokeRect(
            x * this.cellResolution,
            y * this.cellResolution,
            this.cellResolution,
            this.cellResolution
          )

          // Draw a living cell base on the cells grid current state
          if (this.cellsGrid.currentGridState[x][y]) {
            this.canvasContext.fillStyle = this.livingCellFillStyle
          } else {
            this.canvasContext.fillStyle = this.deadCellFillStyle
          }

          this.canvasContext.fillRect(
            x * this.cellResolution + 1,
            y * this.cellResolution + 1,
            this.cellResolution - 1,
            this.cellResolution - 1
          )
        }
      }

      window.requestAnimationFrame(this.drawCellsGrid)
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
