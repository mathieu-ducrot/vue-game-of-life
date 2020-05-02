<template>
  <section class="section is-paddingless">
    <div class="container">
      <game-data-panel></game-data-panel>
      <div class="box is-radiusless">
        <game-grid
          :cells-per-row="cellsPerRow"
          :cells-per-column="cellsPerColumn"
        ></game-grid>
      </div>
      <game-control-panel></game-control-panel>
    </div>
  </section>
</template>

<script>
import GameGrid from '@/components/game/GameGrid'
import GameControlPanel from '@/components/game/GameControlPanel'
import GameDataPanel from '@/components/game/GameDataPanel'

export default {
  name: 'GamePage',
  components: {
    GameGrid,
    GameControlPanel,
    GameDataPanel
  },
  data() {
    return {
      cellsPerRow: 60,
      cellsPerColumn: 25
    }
  }
}
</script>
