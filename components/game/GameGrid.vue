<template>
  <canvas
    ref="game-grid"
    :width="gridWidth"
    :height="gridHeight + cellResolution"
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
      timeLastDraw: 0,
      timeLastDrawFps: 0,
      rafId: 0, // requestAnimationFrameId
      livingCellFillStyle: '#82ded2',
      deadCellFillStyle: '#fff',
      cellResolution: 22,
      cellBorderSize: 2
    }
  },
  computed: {
    gridWidth() {
      return this.cellsPerRow * this.cellResolution + this.cellBorderSize
    },
    gridHeight() {
      return this.cellsPerColumn * this.cellResolution + this.cellBorderSize
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
    this.$store.dispatch('cells-grid/randomizeGridState')
    this.timeLastDraw = performance.now()
    this.timeLastDrawFps = performance.now()
    this.initDrawing()
    this.drawCellsGrid()
  },
  beforeDestroy() {
    // Prevent timeout to still be running on switch pages
    window.cancelAnimationFrame(this.rafId)
  },
  methods: {
    initDrawing() {
      this.canvasContext.fillStyle = 'grey'
      this.canvasContext.fillRect(0, 0, this.gridWidth, this.gridHeight)
    },
    drawCellsGrid() {
      // window.console.log('drawing process')
      for (let x = 0; x < this.cellsPerRow; x++) {
        for (let y = 0; y < this.cellsPerColumn; y++) {
          // Draw a living cell base on the cells grid current state
          if (this.cellsGrid.currentGridState[x][y]) {
            this.canvasContext.fillStyle = this.livingCellFillStyle
          } else {
            this.canvasContext.fillStyle = this.deadCellFillStyle
          }

          this.canvasContext.fillRect(
            x * this.cellResolution + this.cellBorderSize,
            y * this.cellResolution + this.cellBorderSize,
            this.cellResolution - this.cellBorderSize,
            this.cellResolution - this.cellBorderSize
          )
        }
      }

      this.calculateFps()
      this.rafId = window.requestAnimationFrame(this.drawCellsGrid)
    },
    calculateFps() {
      // Calculate FPS then print it every second
      const timeCurrentDraw = performance.now()
      const deltaTimeToDraw = timeCurrentDraw - this.timeLastDraw
      this.timeLastDraw = timeCurrentDraw

      if (this.timeLastDraw - this.timeLastDrawFps > 1000) {
        this.timeLastDrawFps = this.timeLastDraw
        this.canvasContext.fillStyle = 'white'
        this.canvasContext.fillRect(
          0,
          this.gridHeight + 1,
          this.gridWidth,
          this.cellResolution
        )
        this.canvasContext.fillStyle = 'black'
        this.canvasContext.font = '13px Helvetica'
        this.canvasContext.fillText(
          (1000 / deltaTimeToDraw).toFixed(1) + ' average fps per second',
          0,
          this.gridHeight + 13
        )
      }
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
}
</style>
