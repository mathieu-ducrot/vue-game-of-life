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
          <fa-icon class="fa-lg" :icon="faPlayCircle" />
        </span>
        <span>Launch evolution</span>
      </button>

      <button
        class="button is-danger is-outlined"
        :disabled="!runningEvolution"
        @click="stopGridEvolution()"
      >
        <span class="icon">
          <fa-icon class="fa-lg" :icon="faStopCircle" />
        </span>
        <span>Stop</span>
      </button>

      <button class="button is-info is-outlined" @click="nextGridEvolution()">
        <span class="icon">
          <fa-icon :icon="faStepForward" />
        </span>
        <span>Next</span>
      </button>

      <button
        class="button is-info is-outlined"
        @click="slownDownGridEvolution()"
      >
        <span class="icon">
          <fa-icon :icon="faAngleDoubleDown" />
        </span>
        <span>Slow down</span>
      </button>

      <button
        class="button is-info is-outlined"
        @click="speedUpGridEvolution()"
      >
        <span class="icon">
          <fa-icon :icon="faAngleDoubleUp" />
        </span>
        <span>Speed up</span>
      </button>
    </div>

    <div class="buttons is-centered has-addons">
      <button
        class="button is-link"
        :disabled="cellsGrid.editorMode"
        @click="editorMode()"
      >
        <span class="icon">
          <fa-icon :icon="faEdit" />
        </span>
        <span>Editor Mode</span>
      </button>

      <button class="button is-link is-outlined" @click="randomizeGridState()">
        <span class="icon">
          <fa-icon class="fa-lg" :icon="faDice" />
        </span>
        <span>Randomize state</span>
      </button>
      <button class="button is-danger" @click="clearGridState()">
        <span class="icon">
          <fa-icon :icon="faTrashAlt" />
        </span>
        <span>Clear the grid</span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  faStepForward,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faEdit,
  faDice,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faStopCircle } from '@fortawesome/free-regular-svg-icons'
import { mapState } from 'vuex'

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
          timeout: 75
        },
        {
          name: 'such speed!',
          timeout: 20
        }
      ]
    }
  },
  computed: {
    faPlayCircle() {
      return faPlayCircle
    },
    faStopCircle() {
      return faStopCircle
    },
    faStepForward() {
      return faStepForward
    },
    faAngleDoubleDown() {
      return faAngleDoubleDown
    },
    faAngleDoubleUp() {
      return faAngleDoubleUp
    },
    faEdit() {
      return faEdit
    },
    faDice() {
      return faDice
    },
    faTrashAlt() {
      return faTrashAlt
    },
    ...mapState({
      cellsGrid: (state) => state['cells-grid']
    })
  },
  beforeDestroy() {
    this.$store.dispatch('cells-grid/editorModeOff')
    // Prevent timeout to still be running on switch pages
    clearTimeout(this.timerId)
  },
  methods: {
    launchGridEvolution() {
      window.console.log('launch evolution')
      this.$store.dispatch('cells-grid/editorModeOff')
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
    editorMode() {
      window.console.log('editor mode')
      this.stopGridEvolution()
      this.$store.dispatch('cells-grid/editorModeOn')
    },
    randomizeGridState() {
      window.console.log('randomize state')
      this.$store.dispatch('cells-grid/randomizeGridState')
    },
    clearGridState() {
      window.console.log('clear grid state')
      this.$store.dispatch('cells-grid/clearGridState')
    }
  }
}
</script>

<style scoped>
.control-panel {
  padding: 0.5rem 0.5rem 0 0.5rem;
}
</style>
