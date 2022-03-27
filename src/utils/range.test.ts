import range from './range'

describe('range', () => {
  it('should return an array containing numbers with the given range, inclusive', () => {
    expect(range(0, 0)).toEqual([0])
    expect(range(0, 1)).toEqual([0, 1])
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5])
  })
})
