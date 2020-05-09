<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="title is-1 is-spaced is-uppercase">
          <span class="has-text-primary">
            <i class="fas fa-th"></i>
          </span>
          <span>Conway's Game of Life</span>
        </div>
        <p class="subtitle">
          A <strong class="has-text-primary">VueJS</strong> implementation of
          the Game of Life cellular automaton
        </p>
        <nuxt-link class="button is-medium is-link" :to="{ name: 'game' }">
          <span>Get Started </span>
          <span class="icon">
            <i class="fas fa-play"></i>
          </span>
        </nuxt-link>
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

export default {
  components: {
    FooterApp
  }
}
</script>

<style lang="scss">
html {
  /* Hide the useless scrollbar */
  overflow-y: auto;
}

.title {
  font-family: 'IBM Plex Serif', 'Helvetica', serif;
  font-weight: inherit;
  span:last-child {
    border-top: 2px solid;
    border-bottom: 2px solid;
  }
}
</style>
