import { BinaryTreeI } from './BinaryTree';

interface BinarySearchTreeI<T extends number | string> extends BinaryTreeI<T> {
  acquire(value: T): boolean;
}

export class BinarySearchTree implements BinarySearchTreeI<number> {
  left?: BinarySearchTree;
  right?: BinarySearchTree;

  constructor(public value: number) {}

  static buildTree(tree: BinaryTreeI<number>): BinarySearchTree {
    const result = new BinarySearchTree(tree.value);
    if (tree.left) {
      result.left = BinarySearchTree.buildTree(tree.left);
    }
    if (tree.right) {
      result.right = BinarySearchTree.buildTree(tree.right);
    }
    return result;
  }

  insertValue(value: number) {
    if (value < this.value) {
      if (this.left) {
        this.left.insertValue(value);
      } else {
        this.left = new BinarySearchTree(value);
      }
    } else {
      if (this.right) {
        this.right.insertValue(value);
      } else {
        this.right = new BinarySearchTree(value);
      }
    }
    return this;
  }

  adjoin(...values: number[]): BinarySearchTree {
    values.forEach((v) => this.insertValue(v));
    return this;
  }

  acquire(value: number): boolean {
    if (value === this.value) {
      return true;
    }
    if (value < this.value) {
      return this.left ? this.left.acquire(value) : false;
    }
    return this.right ? this.right.acquire(value) : false;
  }
}
