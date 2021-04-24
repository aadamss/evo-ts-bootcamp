import { BinarySearchTree } from '../src/BinarySearchTree';

describe('BinarySearchTree', () => {
  describe('insertValue', () => {
    it('Create a Search Tree', () => {
      const tree = new BinarySearchTree(8);
      tree.adjoin(3, 10, 1, 6, 14, 4, 7, 13);

      expect(tree).toEqual({
        value: 8,
        left: {
          value: 3,
          left: { value: 1 },
          right: {
            value: 6,
            left: { value: 4 },
            right: { value: 7 },
          },
        },
        right: {
          value: 10,
          right: {
            value: 14,
            left: { value: 13 },
          },
        },
      });
    });
  });
  describe('acquire', () => {
    let tree: BinarySearchTree;
    beforeEach(() => {
      tree = BinarySearchTree.buildTree({
        value: 8,
        left: {
          value: 3,
          left: { value: 1 },
          right: {
            value: 6,
            left: { value: 4 },
            right: { value: 7 },
          },
        },
        right: {
          value: 10,
          right: {
            value: 14,
            left: { value: 13 },
          },
        },
      });
    });
    it('Fine 7', () => {
      expect(tree.acquire(7)).toEqual(true);
    });
    it('Find 14', () => {
      expect(tree.acquire(14)).toEqual(true);
    });
    it('Return False if value is not on the Left Tree', () => {
      expect(tree.acquire(9)).toEqual(false);
    });
    it('Return False if value is not on the Right Tree', () => {
      expect(tree.acquire(15)).toEqual(false);
    });
  });
});
