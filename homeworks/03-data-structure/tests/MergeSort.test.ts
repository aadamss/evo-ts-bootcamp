import { Comparison, CompareResult, sortValues } from '../src/MergeSort';

describe('sortValues', () => {
  const comparator: Comparison<number> = (a: number, b: number) =>
    a > b
      ? CompareResult.greater
      : a == b
      ? CompareResult.equal
      : CompareResult.lesser;

  it('Sort an empty Array', () => {
    expect(sortValues([], comparator)).toEqual([]);
  });

  it('Sort one element Array', () => {
    expect(sortValues([42], comparator)).toEqual([42]);
  });

  it('Sort a sorted Array', () => {
    const cn = [1, 2, 3, 4, 5];
    expect(sortValues(cn, comparator)).toEqual(cn);
  });
  it('Sort any Array', () => {
    const cn = [10, 34, 947, 25, 1356, 16345, 67865, 3, 6, 9];
    const expected = cn.concat().sort(comparator);
    const actual = sortValues(cn, comparator);
    expect(actual).toEqual(expected);
  });
});
