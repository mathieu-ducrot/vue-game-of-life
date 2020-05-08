<template>
  <div>
    <div ref="css-grid" class="css-grid"></div>
    <p class="has-text-centered editor-info">
      <span class="icon">
        <i class="fas fa-edit"></i>
      </span>
      <span><b>Editor Mode :</b> Click on a cell to change his state.</span>
    </p>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Cell from '@/components/game/Cell'
const ComponentClass = Vue.extend(Cell)

export default {
  name: 'EditorGrid',
  // functional: true,
  props: {
    livingCellFillStyle: {
      type: String,
      default: '#82ded2'
    }
  },
  computed: {
    cellsPerRow() {
      return this.cellsGrid.cellsPerRow
    },
    cellsPerColumn() {
      return this.cellsGrid.cellsPerColumn
    },
    cellsGridState() {
      return this.cellsGrid.currentGridState
    },
    ...mapState({
      cellsGrid: (state) => state['cells-grid']
    })
  },
  watch: {
    cellsGridState(val) {
      this.draw()
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      this.$refs['css-grid'].innerHTML = ''
      for (let x = 0; x < this.cellsPerRow; x++) {
        const row = document.createElement('div')
        // row.className = 'css-grid-column' css class not working
        row.style.cssText = 'display: flex;flex-direction: column;flex-grow: 1;'
        for (let y = 0; y < this.cellsPerColumn; y++) {
          // https://css-tricks.com/creating-vue-js-component-instances-programmatically/
          const instance = new ComponentClass({
            propsData: {
              xPosition: x,
              yPosition: y,
              aliveColor: this.livingCellFillStyle,
              isAlive: this.cellsGrid.currentGridState[x][y]
            }
          })
          instance.$mount() // pass nothing
          row.appendChild(instance.$el)
        }
        this.$refs['css-grid'].appendChild(row)
      }
    }
  }
  // render(createElement, context) {
  //   // cant access computed in functional rendering
  //   return createElement(Cell, {
  //     props: {
  //       xPosition: 0,
  //       yPosition: 0,
  //       aliveColor: context.props.livingCellFillStyle,
  //       aa: context.props.aa,
  //       isAlive: true
  //     }
  //   })
  // }
}
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
}
.css-grid {
  display: flex;
  border-top: 2px dashed #959595;
  border-left: 2px dashed #959595;
  .css-grid-column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
.editor-info {
  font-size: 13px;
  .icon {
    display: inline-table;
  }
}
</style>
