import CellsGridGenerationService from '@/services/CellsGridGenerationService.js'

describe('CellsGridGenerationService', () => {
  test('getNbNeighbors from a cellsGrid with all 8 neighbors available', () => {
    const testCellsGrid = [
      [0, 1, 1],
      [1, 0, 0],
      [0, 0, 0]
    ]

    /* Assert get 3 neighbors from the central position of the grid
       (Visual representation with correct grid render)
       0  1  0
       1 [0] 0
       1  0  0
     */
    expect(
      CellsGridGenerationService.getNbNeighbors(testCellsGrid, 1, 1)
    ).toEqual(3)
  })

  test('getNbNeighbors from a cellsGrid with an edge position', () => {
    const testCellsGrid = [
      [0, 1, 1],
      [1, 0, 0],
      [0, 0, 0]
    ]

    /* Assert nb neighbors on y edge
       0 [1] 0
       1  0  0
       1  0  0
     */
    expect(
      CellsGridGenerationService.getNbNeighbors(testCellsGrid, 1, 0)
    ).toEqual(1)

    /* Assert nb neighbors on x edge
       0  1  0
      [1] 0  0
       1  0  0
     */
    expect(
      CellsGridGenerationService.getNbNeighbors(testCellsGrid, 0, 1)
    ).toEqual(2)

    /* Assert nb neighbors on x and y edge (min position and max position)
      [0] 1  0
       1  0  0
       1  0  0
     */
    expect(
      CellsGridGenerationService.getNbNeighbors(testCellsGrid, 0, 0)
    ).toEqual(2)
    /*
       0  1  0
       1  0  0
       1  0 [0]
     */
    expect(
      CellsGridGenerationService.getNbNeighbors(testCellsGrid, 2, 2)
    ).toEqual(0)
  })

  test('getNextGridGeneration from cellsGrid', () => {
    const testCellsGrid = [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 1]
    ]
    /* cellsGrid with correct render :
       1  1  0
       1  1  0
       1  0  1
     */

    const nextGridGeneration = CellsGridGenerationService.getNextGridGeneration(
      testCellsGrid
    )
    /* Assert nextGridGeneration with the evolution rules being applied (render version)
       1  1  0
       0  0  1
       1  0  0
       Cell position 0,0 match rule 1 (stable)
       Cell position 2,1 match rule 2 (birth)
       Cell position 1,1 match rule 3 (cas overpopulation)
       Cell position 2,2 match rule 3 (cas underpopulation)
     */
    expect(nextGridGeneration).toEqual([
      [1, 0, 1],
      [1, 0, 0],
      [0, 1, 0]
    ])
  })
})
