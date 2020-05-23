<template>
  <section class="section is-paddingless">
    <div class="container">
      <game-data-panel
        v-if="showCanvasErrorMessage === false"
      ></game-data-panel>
      <div class="box is-radiusless">
        <game-grid
          v-show="!editorMode && showCanvasErrorMessage === false"
          :cells-per-row="cellsPerRow"
          :cells-per-column="cellsPerColumn"
          :show-fps="true"
          @cant-use-canvas="toggleShowCanvasErrorMessage"
        ></game-grid>
        <editor-grid
          v-if="editorMode && showCanvasErrorMessage === false"
        ></editor-grid>
        <div v-show="showCanvasErrorMessage" class="message is-danger">
          <div class="message-body">
            <p>
              Sorry but it seems that
              <b>your browser doesn't support canvas</b> and this HTML element
              is required for this project to work properly.
            </p>
            <br />
            <p>
              Use the last version of
              <a
                href="https://www.google.fr/chrome/?brand=CHBD&gclid=EAIaIQobChMI9Ljes_PJ6QIVSvlRCh0nOQtyEAAYASAAEgIWp_D_BwE&gclsrc=aw.ds"
                target="_blank"
                rel="noopener"
                >Chrome</a
              >
              and come back here!
            </p>
          </div>
        </div>
      </div>
      <game-control-panel
        v-if="showCanvasErrorMessage === false"
      ></game-control-panel>
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
      /* To easaly test generated patterns on the home page with the editor, switch values to 50 and 22
         if you have a 1920 resolution screen */
      cellsPerRow: 60,
      cellsPerColumn: 25,
      showCanvasErrorMessage: false
    }
  },
  computed: {
    editorMode() {
      return this.$store.state['cells-grid'].editorMode
    }
  },
  mounted() {
    this.$store.dispatch('cells-grid/initGridState', {
      cellsPerRow: this.cellsPerRow,
      cellsPerColumn: this.cellsPerColumn
    })
    this.$store.dispatch('cells-grid/randomizeGridState')
  },
  methods: {
    toggleShowCanvasErrorMessage() {
      this.showCanvasErrorMessage = true
    }
  },
  head() {
    return {
      title: 'The Game',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Experiment on how the cells will evolves by defining the initial state of the grid. Set it randomly or manually via the Editor Mode.'
        }
      ]
    }
  }
}
</script>
