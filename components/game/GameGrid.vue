<template>
  <canvas
    ref="canvas-grid"
    :width="gridWidth"
    :height="showFps === true ? gridHeight + cellResolution : gridHeight"
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
    },
    livingCellFillStyle: {
      type: String,
      default: '#82ded2'
    },
    showFps: {
      type: Boolean,
      default: false
    },
    skipDeadCellRender: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeLastDraw: 0,
      timeLastDrawFps: 0,
      rafId: 0, // requestAnimationFrameId
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
      const canvas = this.$refs['canvas-grid']
      if (canvas.getContext) {
        return canvas.getContext('2d')
      } else {
        // todo case when canvas is not supported
        return false
      }
    }
  },
  mounted() {
    this.$store.dispatch('cells-grid/initGridState', {
      cellsPerRow: this.cellsPerRow,
      cellsPerColumn: this.cellsPerColumn
    })
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
      if (this.skipDeadCellRender === false) {
        this.canvasContext.fillStyle = 'grey'
        this.canvasContext.fillRect(0, 0, this.gridWidth, this.gridHeight)
      }
    },
    drawCellsGrid() {
      if (this.skipDeadCellRender) {
        // since dead cell arn't render we clear the canvas instead by filling with the default background color
        this.canvasContext.fillStyle = '#e7e2e8'
        this.canvasContext.fillRect(0, 0, this.gridWidth, this.gridHeight)
      }

      // window.console.log('drawing process')
      for (let x = 0; x < this.cellsPerRow; x++) {
        for (let y = 0; y < this.cellsPerColumn; y++) {
          // Draw a living cell base on the cells grid current state
          const cellState = this.$store.getters['cells-grid/getCellState'](x, y)
          if (cellState) {
            this.canvasContext.fillStyle = this.livingCellFillStyle
          } else {
            this.canvasContext.fillStyle = this.deadCellFillStyle
          }

          if (
            this.skipDeadCellRender === false ||
            (this.skipDeadCellRender && cellState)
          ) {
            this.canvasContext.fillRect(
              x * this.cellResolution + this.cellBorderSize,
              y * this.cellResolution + this.cellBorderSize,
              this.cellResolution - this.cellBorderSize,
              this.cellResolution - this.cellBorderSize
            )
          }
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
        this.canvasContext.font = '13px IBM Plex Sans, Arial'
        this.canvasContext.fillText(
          (1000 / deltaTimeToDraw).toFixed(1) + ' average fps',
          0,
          this.gridHeight + 13
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
}
</style>
