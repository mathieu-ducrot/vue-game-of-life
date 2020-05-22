<template>
  <section class="hero is-fullheight-with-navbar">
    <game-grid
      class="grid"
      :cells-per-row="cellsPerRow"
      :cells-per-column="cellsPerColumn"
      :skip-dead-cell-render="true"
    ></game-grid>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1
          itemscope
          itemtype="http://schema.org/CreativeWork"
          class="title is-1 is-spaced is-uppercase"
        >
          <span class="has-text-primary has-white-background">
            <i class="fas fa-th"></i>
          </span>
          <span>
            <span
              itemprop="creator"
              itemscope
              itemtype="https://schema.org/Person"
            >
              <span itemprop="familyName">Conway</span> </span
            >'s
            <span itemprop="name">Game of Life</span>
          </span>
        </h1>
        <h2 class="subtitle">
          A
          <strong class="has-text-primary">VueJS</strong>
          implementation of the Game of Life cellular automaton
        </h2>
        <div class="buttons">
          <nuxt-link class="button is-link" :to="{ name: 'rules' }">
            <span>What is it</span>
            <span class="icon">
              <i class="fas fa-question"></i>
            </span>
          </nuxt-link>
          <nuxt-link class="button is-link" :to="{ name: 'game' }">
            <span>Get Started </span>
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <footer-app />
    </div>
  </section>
</template>

<script>
// todo check to put the FooterApp on the default layout and still being fixed at the bottom
import FooterApp from '@/components/layouts/FooterApp'
import GameGrid from '@/components/game/GameGrid'

export default {
  components: {
    FooterApp,
    GameGrid
  },
  data() {
    return {
      cellsPerRow: 50, // todo dynamic calculate the number of cells based on the viewport resolution
      cellsPerColumn: 22,
      timerId: 0,
      timeoutSpeed: 600
    }
  },
  mounted() {
    this.$store.dispatch('cells-grid/randomizeGridState')
    this.timerId = setTimeout(
      function tick() {
        this.$store.dispatch('cells-grid/nextGridState')
        this.timerId = setTimeout(tick.bind(this), this.timeoutSpeed)
      }.bind(this),
      this.timeoutSpeed
    )
  },
  beforeDestroy() {
    // Prevent timeout to still be running on switch pages
    clearTimeout(this.timerId)
  },
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Hi, i'm Mathieu Ducrot and you are watching my project on coding the Conway's Game of Life with Vue.js."
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  font-family: 'IBM Plex Serif', 'Helvetica', serif;
  font-weight: inherit;
  span:last-child {
    border-top: 2px solid;
    border-bottom: 2px solid;
  }
}
.buttons {
  justify-content: center;
}
.grid {
  position: absolute;
}
.hero-foot {
  z-index: 100;
}
</style>
