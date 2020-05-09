export default {
  getEmptyGrid(cellsPerRow, cellsPerColumn) {
    const toReturn = []

    for (let x = 0; x < cellsPerRow; x++) {
      const row = []
      for (let y = 0; y < cellsPerColumn; y++) {
        row.push(0)
      }
      toReturn.push(row)
    }

    return toReturn
  },
  // todo add unit test
  getRandomizedGrid(cellsPerRow, cellsPerColumn) {
    const gridState = []
    let nbCellBirth = 0

    for (let x = 0; x < cellsPerRow; x++) {
      const row = []
      for (let y = 0; y < cellsPerColumn; y++) {
        const cellState = Math.round(Math.random())
        if (cellState === 1) {
          nbCellBirth++
        }
        row.push(cellState)
      }
      gridState.push(row)
    }
    const toReturn = {}
    toReturn.gridState = gridState
    toReturn.counters = {}
    toReturn.counters.nbCellBirth = nbCellBirth

    return toReturn
  },
  getNextGridGeneration(cellsGrid) {
    const nextGridState = [[]]
    let nbLivingCells = 0
    let nbCellBirth = 0
    let nbCellDeath = 0

    for (const [x, column] of cellsGrid.entries()) {
      nextGridState[x] = []
      // eslint-disable-next-line no-unused-vars
      for (const [y, value] of column.entries()) {
        const nbNeighbors = this.getNbNeighbors(cellsGrid, x, y)
        const crtCellState = cellsGrid[x][y]
        /*  THE EVOLUTION RULES */
        if (crtCellState === 1 && (nbNeighbors === 2 || nbNeighbors === 3)) {
          // Rule 1 : Any live cell with two or three neighbors survives (stable alive)
          nextGridState[x][y] = 1
          nbLivingCells++
        } else if (crtCellState === 0 && nbNeighbors === 3) {
          // Rule 2 : Any dead cell with three live neighbors becomes a live cell (birth)
          nextGridState[x][y] = 1
          nbLivingCells++
          nbCellBirth++
        } else if (crtCellState === 1 && (nbNeighbors < 2 || nbNeighbors > 3)) {
          // Rule 3 : All other live cells die in the next generation. (death by subpopulation or overcrowding)
          nextGridState[x][y] = 0
          nbCellDeath++
        } else {
          // Similarly, all other dead cells stay dead (stable death)
          nextGridState[x][y] = 0
        }
      }
    }

    const toReturn = {}
    toReturn.nextGridState = nextGridState
    toReturn.counters = {}
    toReturn.counters.nbLivingCells = nbLivingCells
    toReturn.counters.nbCellBirth = nbCellBirth
    toReturn.counters.nbCellDeath = nbCellDeath

    return toReturn
  },
  getNbNeighbors(cellsGrid, x, y) {
    let toReturn = 0

    if (cellsGrid[x - 1]) {
      if (cellsGrid[x - 1][y - 1]) toReturn++
      if (cellsGrid[x - 1][y]) toReturn++
      if (cellsGrid[x - 1][y + 1]) toReturn++
    }
    if (cellsGrid[x][y - 1]) toReturn++
    if (cellsGrid[x][y + 1]) toReturn++
    if (cellsGrid[x + 1]) {
      if (cellsGrid[x + 1][y - 1]) toReturn++
      if (cellsGrid[x + 1][y]) toReturn++
      if (cellsGrid[x + 1][y + 1]) toReturn++
    }

    return toReturn
  }
}
