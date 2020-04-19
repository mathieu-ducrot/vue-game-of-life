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
  }
}
