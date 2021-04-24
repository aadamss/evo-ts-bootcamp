import { BinaryTree, TraverseType } from '../src/BinaryTree';

describe('BinaryTree', () => {
  describe('left', () => {
    it('Null if no Left Branch', () => {
      const binaryTree = new BinaryTree({ value: 1 });
      expect(binaryTree.left).toBeUndefined();
    });
    it('Return Left Branch', () => {
      const binaryTree = new BinaryTree({ value: 1, left: { value: 2 } });
      expect(binaryTree.left).toBeDefined();
    });
  });
  describe('Right', () => {
    it('Null if no Left Branch', () => {
      const binaryTree = new BinaryTree({ value: 1 });
      expect(binaryTree.left).toBeUndefined();
    });
    it('Return Right Branch', () => {
      const binaryTree = new BinaryTree({ value: 1, right: { value: 3 } });
      expect(binaryTree.right).toBeDefined();
    });
  });
  describe('value', () => {
    it('Return root value of Tree', () => {
      const binaryTree = new BinaryTree({ value: 1 });
      expect(binaryTree.value).toEqual(1);
    });
  });
  describe('makeTree', () => {
    it('Replace inner Tree', () => {
      const binaryTree = new BinaryTree({ value: 10 });
      const newTree = { value: 42, left: { value: 1 }, right: { value: 2 } };
      binaryTree.makeTree(newTree);
      expect(binaryTree.value).toEqual(newTree.value);
      expect(binaryTree.left).toEqual(newTree.left);
      expect(binaryTree.right).toEqual(newTree.right);
    });
  });
  describe('traverseType', () => {
    let binaryTree: BinaryTree<number>;
    let oneElementTree: BinaryTree<number>;
    beforeEach(() => {
      binaryTree = new BinaryTree<number>({
        value: 1,
        left: {
          value: 2,
          left: { value: 4 },
          right: { value: 5 },
        },
        right: {
          value: 3,
        },
      });
      oneElementTree = new BinaryTree<number>({
        value: 1,
      });
    });
    describe('InOrder', () => {
      it('Assert 1 if Tree contains only 1 element', () => {
        const actual = oneElementTree.traverseType(TraverseType.InOrder);
        expect(actual).toEqual([1]);
      });
      it('Sort a Tree in InOrder order', () => {
        const actual = binaryTree.traverseType(TraverseType.InOrder);
        expect(actual).toEqual([4, 2, 5, 1, 3]);
      });
    });
    describe('PreOrder', () => {
      it('Assert 1 if Tree contains only 1 element', () => {
        const actual = oneElementTree.traverseType(TraverseType.PreOrder);
        expect(actual).toEqual([1]);
      });
      it('Sort a Tree in InOrder order', () => {
        const actual = binaryTree.traverseType(TraverseType.PreOrder);
        expect(actual).toEqual([1, 2, 4, 5, 3]);
      });
    });

    describe('PostOrder', () => {
      it('Assert 1 if tree contains only 1 element', () => {
        const actual = oneElementTree.traverseType(TraverseType.PostOrder);
        expect(actual).toEqual([1]);
      });
      it('Sort a Tree in InOrder order', () => {
        const actual = binaryTree.traverseType(TraverseType.PostOrder);
        expect(actual).toEqual([4, 5, 2, 3, 1]);
      });
    });
    describe('Breadth', () => {
      it('Assert 1 if Tree contains only 1 element', () => {
        const actual = oneElementTree.traverseType(TraverseType.Breadth);
        expect(actual).toEqual([1]);
      });
      it('Sort a Tree in InOrder order', () => {
        const actual = binaryTree.traverseType(TraverseType.Breadth);
        expect(actual).toEqual([1, 2, 3, 4, 5]);
      });
    });
  });
  describe('column', () => {
    let binaryTree: BinaryTree<number>;
    beforeEach(() => {
      binaryTree = new BinaryTree<number>({
        value: 1,
        left: {
          value: 2,
          left: { value: 4 },
          right: { value: 5 },
        },
        right: {
          value: 3,
          left: { value: 6 },
          right: { value: 7 },
        },
      });
    });

    it('Assert column(0) = root value for one value Tree', () => {
      const binaryTree = new BinaryTree({ value: 1 });
      expect(binaryTree.column(0)).toEqual([1]);
    });
    it('Assert column(0) = [1, 5, 6]', () => {
      expect(binaryTree.column(0)).toEqual([1, 5, 6]);
    });
    it('Assert column(1) = [3]', () => {
      expect(binaryTree.column(1)).toEqual([3]);
    });
    it('Assert column(-1) = [2]', () => {
      expect(binaryTree.column(-1)).toEqual([2]);
    });
    it('Assert column(2) = [7]', () => {
      expect(binaryTree.column(2)).toEqual([7]);
    });
    it('Assert column(-2) = [4]', () => {
      expect(binaryTree.column(-2)).toEqual([4]);
    });
  });
});
