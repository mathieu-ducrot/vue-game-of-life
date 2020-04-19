import CellsGridGenerationService from '@/services/CellsGridGenerationService.js'

export const state = () => ({
  cellsPerRow: 20,
  cellsPerColumn: 20,
  currentGridState: [[]]
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
  }
}

export const actions = {
  initGridState({ commit }, gridData) {
    commit('SET_CELLS_PER_ROW', gridData.cellsPerRow)
    commit('SET_CELLS_PER_COLUMN', gridData.cellsPerColumn)
  },
  randomizeGridState({ commit, state }) {
    commit(
      'SET_CURRENT_GRID_STATE',
      CellsGridGenerationService.getRandomizedGrid(
        state.cellsPerRow,
        state.cellsPerColumn
      )
    )
  }
}
