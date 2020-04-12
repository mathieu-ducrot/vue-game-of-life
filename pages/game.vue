<template>
  <section class="section">
    <div class="container">
      <div class="box is-radiusless">
        <game-grid :cells-per-row="cellsPerRow"></game-grid>
      </div>
    </div>
  </section>
</template>

<script>
import GameGrid from '@/components/game/GameGrid'

export default {
  components: {
    GameGrid
  },
  data() {
    return {
      cellsPerRow: 40
    }
  }
}
</script>
