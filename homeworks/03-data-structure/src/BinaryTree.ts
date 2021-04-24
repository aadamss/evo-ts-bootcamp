export enum TraverseType {
  InOrder,
  PreOrder,
  PostOrder,
  Breadth,
}

export interface BinaryTreeI<T> {
  value: T;
  left?: BinaryTreeI<T>;
  right?: BinaryTreeI<T>;
}

export class BinaryTree<T> implements BinaryTreeI<T> {
  get left(): BinaryTreeI<T> | null {
    return this.binaryTree.left;
  }

  get right(): BinaryTreeI<T> | null {
    return this.binaryTree.right;
  }

  get value(): T {
    return this.binaryTree.value;
  }

  constructor(private binaryTree: BinaryTreeI<T>) {}

  column(sortColumn: number): T[] {
    const ratio: [tree: BinaryTreeI<T>, order: number][] = [
      [this.binaryTree, 0],
    ];
    const result: T[] = [];
    while (ratio.length) {
      const [adjoining, order] = ratio.shift()!;
      if (order === sortColumn) {
        result.push(adjoining.value);
      }
      if (adjoining.left) {
        ratio.push([adjoining.left, order - 1]);
      }
      if (adjoining.right) {
        ratio.push([adjoining.right, order + 1]);
      }
    }
    return result;
  }

  makeTree(binaryTree: BinaryTreeI<T>) {
    this.binaryTree = binaryTree;
  }

  traverseInOrder(binaryTree: BinaryTreeI<T>): T[] {
    const numbersLeft = binaryTree.left
      ? this.traverseInOrder(binaryTree.left)
      : [];
    const numbersRight = binaryTree.right
      ? this.traverseInOrder(binaryTree.right)
      : [];
    return numbersLeft.concat([binaryTree.value], numbersRight);
  }

  traversePreOrder(binaryTree: BinaryTreeI<T>): T[] {
    const numbersLeft = binaryTree.left
      ? this.traversePreOrder(binaryTree.left)
      : [];
    const numbersRight = binaryTree.right
      ? this.traversePreOrder(binaryTree.right)
      : [];
    return [binaryTree.value].concat(numbersLeft, numbersRight);
  }

  travesePostOrder(binaryTree: BinaryTreeI<T>): T[] {
    const numbersLeft = binaryTree.left
      ? this.travesePostOrder(binaryTree.left)
      : [];
    const numbersRight = binaryTree.right
      ? this.travesePostOrder(binaryTree.right)
      : [];
    return numbersLeft.concat(numbersRight, [binaryTree.value]);
  }

  traverseBreadth(binaryTree: BinaryTreeI<T>) {
    const ratio: BinaryTreeI<T>[] = [binaryTree];
    const result: T[] = [];
    while (ratio.length) {
      const adjoining = ratio.shift()!;
      result.push(adjoining.value);
      if (adjoining.left) {
        ratio.push(adjoining.left);
      }
      if (adjoining.right) {
        ratio.push(adjoining.right);
      }
    }
    return result;
  }

  traverseType<V>(traverseType: TraverseType): T[] {
    switch (traverseType) {
      case TraverseType.InOrder:
        return this.traverseInOrder(this.binaryTree);
      case TraverseType.PreOrder:
        return this.traversePreOrder(this.binaryTree);
      case TraverseType.PostOrder:
        return this.travesePostOrder(this.binaryTree);
      case TraverseType.Breadth:
        return this.traverseBreadth(this.binaryTree);
    }
  }
}
