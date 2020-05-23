<template>
  <section class="hero is-fullheight-with-navbar">
    <game-grid
      class="home-grid"
      :cells-per-row="cellsPerRow"
      :cells-per-column="cellsPerColumn"
      :cell-resolution="cellResolution"
      :skip-dead-cell-render="true"
    ></game-grid>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1
          itemscope
          itemtype="http://schema.org/CreativeWork"
          class="title is-size-1-desktop is-size-2-tablet is-size-3-mobile is-spaced is-uppercase"
        >
          <span class="has-text-primary has-white-background">
            <fa-icon :icon="['fas', 'th']"></fa-icon>
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
              <fa-icon :icon="['fas', 'question']"></fa-icon>
            </span>
          </nuxt-link>
          <nuxt-link class="button is-link" :to="{ name: 'game' }">
            <span>Get Started </span>
            <span class="icon">
              <fa-icon :icon="['fas', 'play']"></fa-icon>
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
import FooterApp from '@/components/layouts/FooterApp'
import GameGrid from '@/components/game/GameGrid'

export default {
  name: 'HomePage',
  components: {
    FooterApp,
    GameGrid
  },
  data() {
    return {
      cellsPerRow: 0,
      cellsPerColumn: 0,
      cellResolution: 38,
      timerId: 0,
      timeoutSpeed: 600
    }
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    this.cellsPerRow = Math.floor(window.innerWidth / this.cellResolution)
    // eslint-disable-next-line nuxt/no-globals-in-created
    this.cellsPerColumn = Math.floor(
      // subtract the size of the header + one cellResolution from the total height
      (window.innerHeight - 90) / this.cellResolution
    )
    this.$store.dispatch('cells-grid/initGridState', {
      cellsPerRow: this.cellsPerRow,
      cellsPerColumn: this.cellsPerColumn
    })
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
