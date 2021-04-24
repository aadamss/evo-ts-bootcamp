export enum CompareResult {
  equal = 0,
  greater = 1,
  lesser = -1,
}

export type Comparison<T> = (a: T, b: T) => CompareResult;

export function sortValues<T>(cn: T[], comparison: Comparison<T>): T[] {
  const recreate = cn.concat();
  if (recreate.length <= 1) {
    return recreate;
  }
  reCreate(recreate, comparison, 0, cn.length - 1);
  return recreate;
}

function reCreate<V>(
  cn: V[],
  comparison: Comparison<V>,
  left: number,
  right: number
) {
  if (left >= right) {
    return;
  }
  const centre = ((right + left) / 2) | 0;
  reCreate(cn, comparison, left, centre);
  reCreate(cn, comparison, centre + 1, right);
  merge(cn, comparison, left, centre, right);
}

function merge<V>(
  cn: V[],
  comparison: Comparison<V>,
  left: number,
  centre: number,
  right: number
) {
  const leftSide = [];
  for (let i = left; i <= centre; i++) {
    leftSide.push(cn[i]);
  }
  const rightSide = [];
  for (let i = centre + 1; i <= right; i++) {
    rightSide.push(cn[i]);
  }
  let closest = 0,
    r = 0,
    i = left;
  while (leftSide.length > 0 && rightSide.length > 0) {
    if (comparison(leftSide[closest], rightSide[r]) === CompareResult.greater) {
      cn[i] = rightSide.shift()!;
    } else {
      cn[i] = leftSide.shift()!;
    }
    i++;
  }
  while (leftSide.length > 0) {
    cn[i++] = leftSide.shift()!;
  }
  while (rightSide.length > 0) {
    cn[i++] = rightSide.shift()!;
  }
}
