import Vue from 'vue'
import CellsGridGenerationService from '@/services/CellsGridGenerationService.js'
import gosperGliderGunPattern from '@/components/game/pattern/gosper_glider_gun.json'
import stablePattern from '@/components/game/pattern/stable.json'
import oscillatorsPattern from '@/components/game/pattern/oscillators.json'
import spaceshipsPattern from '@/components/game/pattern/spaceships.json'

export const state = () => ({
  cellsPerRow: 20,
  cellsPerColumn: 20,
  currentGridState: [[]],
  nbLivingCells: 0,
  nbCellBirth: 0,
  nbCellDeath: 0,
  tick: 0,
  editorMode: false,
  recommendedTimeoutSpeed: 400
})

export const mutations = {
  SET_CELLS_PER_ROW(state, nbCells) {
    state.cellsPerRow = nbCells
  },
  SET_CELLS_PER_COLUMN(state, nbCells) {
    state.cellsPerColumn = nbCells
  },
  SET_CURRENT_GRID_STATE(state, gridState) {
    state.currentGridState = gridState
  },
  SET_NB_LIVING_CELLS(state, nb) {
    state.nbLivingCells = nb
  },
  INCREMENT_NB_CELL_BIRTH(state, nb) {
    state.nbCellBirth = state.nbCellBirth + nb
  },
  INCREMENT_NB_CELL_DEATH(state, nb) {
    state.nbCellDeath = state.nbCellDeath + nb
  },
  INCREMENT_TICK(state) {
    state.tick++
  },
  INIT_COUNTER(state) {
    state.nbCellBirth = 0
    state.nbCellDeath = 0
    state.tick = 0
  },
  SET_EDITOR_MODE(state, value) {
    state.editorMode = value
  },
  TOGGLE_CELL_STATE(state, positions) {
    const xPosition = positions.x
    const yPosition = positions.y
    const newRow = state.currentGridState[xPosition].slice(0)
    if (state.currentGridState[xPosition][yPosition] === 1) {
      newRow[yPosition] = 0
      // https://vuejs.org/v2/guide/reactivity.html#For-Arrays
      Vue.set(state.currentGridState, xPosition, newRow)
      state.nbLivingCells--
    } else {
      newRow[yPosition] = 1
      Vue.set(state.currentGridState, xPosition, newRow)
      state.nbLivingCells++
    }
  },
  LOAD_GRID_PATTERN(state, pattern) {
    pattern.positions.forEach(function(positions) {
      if (
        state.currentGridState[positions[0]] !== undefined &&
        state.currentGridState[positions[0]][positions[1]] !== undefined
      ) {
        state.currentGridState[positions[0]][positions[1]] = 1
      }
    })
    state.recommendedTimeoutSpeed = pattern.recommendedTimeoutSpeed
  }
}

export const actions = {
  initGridState({ commit, dispatch }, gridData) {
    commit('SET_CELLS_PER_ROW', gridData.cellsPerRow)
    commit('SET_CELLS_PER_COLUMN', gridData.cellsPerColumn)
    dispatch('clearGridState')
  },
  randomizeGridState({ commit, state }) {
    const randomizeGrid = CellsGridGenerationService.getRandomizedGrid(
      state.cellsPerRow,
      state.cellsPerColumn
    )

    commit('SET_CURRENT_GRID_STATE', randomizeGrid.gridState)
    commit('SET_NB_LIVING_CELLS', randomizeGrid.counters.nbCellBirth)
    commit('INIT_COUNTER')
  },
  clearGridState({ commit, state }) {
    const emptyGrid = CellsGridGenerationService.getEmptyGrid(
      state.cellsPerRow,
      state.cellsPerColumn
    )

    commit('SET_CURRENT_GRID_STATE', emptyGrid)
    commit('SET_NB_LIVING_CELLS', 0)
    commit('INIT_COUNTER')
  },
  nextGridState({ commit, state }) {
    const nextGrid = CellsGridGenerationService.getNextGridGeneration(
      state.currentGridState
    )

    commit('SET_CURRENT_GRID_STATE', nextGrid.nextGridState)
    commit('SET_NB_LIVING_CELLS', nextGrid.counters.nbLivingCells)
    commit('INCREMENT_NB_CELL_BIRTH', nextGrid.counters.nbCellBirth)
    commit('INCREMENT_NB_CELL_DEATH', nextGrid.counters.nbCellDeath)
    commit('INCREMENT_TICK')
  },
  editorModeOn({ commit }) {
    commit('SET_EDITOR_MODE', true)
  },
  editorModeOff({ commit }) {
    commit('SET_EDITOR_MODE', false)
  },
  toggleCellState({ commit }, positions) {
    commit('TOGGLE_CELL_STATE', positions)
  },
  loadRandomGridPattern({ state, dispatch, commit }) {
    const patterns = ['random']
    if (state.cellsPerRow >= 48 && state.cellsPerColumn >= 22) {
      patterns.push(oscillatorsPattern)
    }
    if (state.cellsPerRow >= 36 && state.cellsPerColumn >= 14) {
      patterns.push(gosperGliderGunPattern)
    }
    if (state.cellsPerRow >= 25 && state.cellsPerColumn >= 12) {
      patterns.push(stablePattern)
      patterns.push(spaceshipsPattern)
    }

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)]
    if (randomPattern === 'random') {
      dispatch('randomizeGridState')
    } else {
      commit('LOAD_GRID_PATTERN', randomPattern)
    }
  }
}

export const getters = {
  getNbCells: (state) => {
    return state.cellsPerRow * state.cellsPerColumn
  },
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  getCellState: (state) => (x, y) => {
    return state.currentGridState[x] && state.currentGridState[x][y] === 1
  },
  getNbLivingCells: (state) => {
    return state.nbLivingCells
  },
  getNbCellBirth: (state) => {
    return state.nbCellBirth
  },
  getNbCellDeath: (state) => {
    return state.nbCellDeath
  },
  getTick: (state) => {
    return state.tick
  },
  getLivingCellPositions: (state) => {
    const toReturn = []
    for (let x = 0; x < state.cellsPerRow; x++) {
      for (let y = 0; y < state.cellsPerColumn; y++) {
        if (state.currentGridState[x][y] === 1) {
          toReturn.push([x, y])
        }
      }
    }
    return toReturn
  }
}
