<template>
  <div>
    <div class="css-grid">
      <div v-for="(xVal, x) in cellsPerRow" :key="x" class="css-grid-column">
        <grid-cell
          v-for="(yVal, y) in cellsPerColumn"
          :key="x + '_' + y"
          :x-position="x"
          :y-position="y"
          :alive-color="livingCellFillStyle"
          :is-alive="$store.getters['cells-grid/getCellState'](x, y)"
          @toggle-cell-state="toggleCellState"
        ></grid-cell>
      </div>
    </div>
    <p class="has-text-centered editor-info">
      <span class="icon">
        <fa-icon :icon="['fas', 'edit']"></fa-icon>
      </span>
      <span><b>Editor Mode :</b> Click on a cell to change his state.</span>
    </p>
    <!-- Uncomment the follwing line when testing pattern -->
    <!-- <div>{{ $store.getters['cells-grid/getLivingCellPositions'] }}</div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GridCell from '@/components/game/GridCell'

export default {
  name: 'EditorGrid',
  components: {
    GridCell
  },
  data() {
    return {
      livingCellFillStyle: '#82ded2'
    }
  },
  computed: {
    cellsPerRow() {
      return this.cellsGrid.cellsPerRow
    },
    cellsPerColumn() {
      return this.cellsGrid.cellsPerColumn
    },
    ...mapState({
      cellsGrid: (state) => state['cells-grid']
    })
  },
  methods: {
    toggleCellState(positions) {
      this.$store.dispatch('cells-grid/toggleCellState', positions)
    }
  }
}
</script>

<style scoped lang="scss">
.editor-info {
  font-size: 13px;
  .icon {
    display: inline-table;
  }
}
</style>
