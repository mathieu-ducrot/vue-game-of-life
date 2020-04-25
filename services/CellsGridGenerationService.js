export default {
  // todo add unit test
  getRandomizedGrid(cellsPerRow, cellsPerColumn) {
    const toReturn = []
    for (let x = 0; x < cellsPerRow; x++) {
      const row = []
      for (let y = 0; y < cellsPerColumn; y++) {
        row.push(Math.round(Math.random()))
      }
      toReturn.push(row)
    }

    return toReturn
  },
  getNextGridGeneration(cellsGrid) {
    const toReturn = [[]]

    for (const [x, column] of cellsGrid.entries()) {
      toReturn[x] = []
      // eslint-disable-next-line no-unused-vars
      for (const [y, value] of column.entries()) {
        const nbNeighbors = this.getNbNeighbors(cellsGrid, x, y)
        const currentCellState = cellsGrid[x][y]
        /*  THE EVOLUTION RULES
          Rule 1 : Any live cell with two or three neighbors survives (stable)
              if (currentCellState == 1 && (nbNeighbors == 2 || nbNeighbors == 3)) toReturn[x][y] = 1
          Rule 2 : Any dead cell with three live neighbors becomes a live cell (birth)
              if (currentCellState == 0 && nbNeighbors == 3) toReturn[x][y] = 1
          Rule 3 : All other live cells die in the next generation. Similarly, all other dead cells stay dead (underpopulation and overpopulation)
              if (currentCellState == 0 || nbNeighbors < 2 || nbNeighbors > 3) toReturn[x][y] = 0
          Which can be summarized like follow :
         */
        toReturn[x][y] = 0
        if (
          nbNeighbors === 3 ||
          (currentCellState === 1 && nbNeighbors === 2)
        ) {
          toReturn[x][y] = 1
        }
      }
    }

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
