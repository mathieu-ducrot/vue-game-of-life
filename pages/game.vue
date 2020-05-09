<template>
  <section class="section is-paddingless">
    <div class="container">
      <game-data-panel></game-data-panel>
      <div class="box is-radiusless">
        <game-grid
          v-show="!editorMode"
          :cells-per-row="cellsPerRow"
          :cells-per-column="cellsPerColumn"
          :show-fps="true"
        ></game-grid>
        <editor-grid v-if="editorMode"></editor-grid>
      </div>
      <game-control-panel></game-control-panel>
    </div>
  </section>
</template>

<script>
import GameGrid from '@/components/game/GameGrid'
import EditorGrid from '@/components/game/EditorGrid'
import GameControlPanel from '@/components/game/GameControlPanel'
import GameDataPanel from '@/components/game/GameDataPanel'

export default {
  name: 'GamePage',
  components: {
    GameGrid,
    EditorGrid,
    GameControlPanel,
    GameDataPanel
  },
  data() {
    return {
      cellsPerRow: 60,
      cellsPerColumn: 25
    }
  },
  computed: {
    editorMode() {
      return this.$store.state['cells-grid'].editorMode
    }
  },
  mounted() {
    this.$store.dispatch('cells-grid/randomizeGridState')
  }
}
</script>
