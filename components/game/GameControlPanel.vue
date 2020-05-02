<template>
  <div class="control-panel has-background-white">
    <b>State generation speed level</b> : {{ speedOptions[currentSpeed].name }}
    <div class="buttons is-centered has-addons is-marginless">
      <button
        class="button is-primary"
        :disabled="runningEvolution"
        @click="launchGridEvolution()"
      >
        <span class="icon">
          <i class="far fa-play-circle fa-lg"></i>
        </span>
        <span>Launch evolution</span>
      </button>

      <button
        class="button is-danger is-outlined"
        :disabled="!runningEvolution"
        @click="stopGridEvolution()"
      >
        <span class="icon">
          <i class="far fa-stop-circle fa-lg"></i>
        </span>
        <span>Stop</span>
      </button>

      <button class="button is-info is-outlined" @click="nextGridEvolution()">
        <span class="icon">
          <i class="fas fa-step-forward"></i>
        </span>
        <span>Next</span>
      </button>

      <button
        class="button is-info is-outlined"
        @click="slownDownGridEvolution()"
      >
        <span class="icon">
          <i class="fas fa-angle-double-down"></i>
        </span>
        <span>Slow down</span>
      </button>

      <button
        class="button is-info is-outlined"
        @click="speedUpGridEvolution()"
      >
        <span class="icon">
          <i class="fas fa-angle-double-up"></i>
        </span>
        <span>Speed up</span>
      </button>
    </div>

    <div class="buttons is-centered has-addons">
      <button class="button is-warning" @click="randomizeGridState()">
        <span class="icon">
          <i class="fas fa-dice fa-lg"></i>
        </span>
        <span>Randomize state</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameControlPanel',
  data() {
    return {
      runningEvolution: false,
      timerId: 0,
      currentSpeed: 3, // aim default speed
      speedOptions: [
        {
          name: 'very slow',
          timeout: 2500
        },
        {
          name: 'slow',
          timeout: 1500
        },
        {
          name: '1 seconde',
          timeout: 1000
        },
        {
          name: 'default',
          timeout: 500
        },
        {
          name: '300 ms',
          timeout: 300
        },
        {
          name: 'fast',
          timeout: 150
        },
        {
          name: 'very fast',
          timeout: 50
        },
        {
          name: 'such speed!',
          timeout: 20
        }
      ]
    }
  },
  beforeDestroy() {
    // Prevent timeout to still be running on switch pages
    clearTimeout(this.timerId)
  },
  methods: {
    launchGridEvolution() {
      window.console.log('launch evolution')
      this.runningEvolution = true
      // Used recursive setTimeout to avoid multiple calls queued back to back with setInterval
      this.timerId = setTimeout(
        function tick() {
          this.nextGridState()
          this.timerId = setTimeout(
            tick.bind(this),
            this.speedOptions[this.currentSpeed].timeout
          )
        }.bind(this),
        this.speedOptions[this.currentSpeed].timeout
      )
    },
    slownDownGridEvolution() {
      if (this.currentSpeed !== 0) {
        this.currentSpeed--
      }
    },
    speedUpGridEvolution() {
      if (this.currentSpeed !== this.speedOptions.length - 1) {
        this.currentSpeed++
      }
    },
    stopGridEvolution() {
      window.console.log('stop evolution')
      this.runningEvolution = false
      clearTimeout(this.timerId)
    },
    nextGridEvolution() {
      this.stopGridEvolution()
      this.nextGridState()
    },
    nextGridState() {
      // window.console.log('next grid state')
      this.$store.dispatch('cells-grid/nextGridState')
    },
    randomizeGridState() {
      window.console.log('randomize state')
      this.$store.dispatch('cells-grid/randomizeGridState')
    }
  }
}
</script>

<style scoped>
.control-panel {
  padding: 0.5rem 0.5rem 0 0.5rem;
}
</style>
