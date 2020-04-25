<template>
  <section class="section">
    <div class="container">
      <div class="box is-radiusless">
        <game-grid ref="gameGrid" :cells-per-row="cellsPerRow"></game-grid>
      </div>
      <div class="buttons is-centered has-background-white">
        <button class="button is-primary" @click="launchEvolution()">
          <span class="icon">
            <i class="far fa-play-circle"></i>
          </span>
          <span>Launch evolution</span>
        </button>
        <button class="button is-primary" @click="randomizeState()">
          <span class="icon">
            <i class="fas fa-dice"></i>
          </span>
          <span>Randomize state</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import GameGrid from '@/components/game/GameGrid'

export default {
  name: 'GamePage',
  components: {
    GameGrid
  },
  data() {
    return {
      cellsPerRow: 60
    }
  },
  methods: {
    launchEvolution() {
      this.$refs.gameGrid.launchGridEvolution()
    },
    randomizeState() {
      this.$refs.gameGrid.randomizeGridState()
    }
  }
}
</script>

<style scoped>
.buttons {
  padding-top: 0.5rem;
}
.section {
  padding: 1.5rem 0 0 0;
}
</style>
