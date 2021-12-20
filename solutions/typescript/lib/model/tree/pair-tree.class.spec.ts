import { expect } from 'chai';
import { PairTree } from './pair-tree.class';

describe('pair tree', () => {
	let tree!: PairTree<number>;
	beforeEach(() => {
		tree = PairTree.fromNestedPairs([
			[1, [2, [3, [4, 5]]]],
			[6, [7, [8, [9, 10]]]],
		]);
	});

	describe('join', () => {
		it('should be able to join [1,2] with [2,3] to create a new root', () => {
			const leftTree = PairTree.fromNestedPairs([1, 2]);
			const rightTree = PairTree.fromNestedPairs([3, 4]);
			const newRoot = leftTree.join(rightTree);
			expect(newRoot.toString()).to.equal('[[1,2],[3,4]]');
		});

		it('should be able to join subtrees and not create a new root [1,2] with [2,3] to create a new root', () => {
			const leftTree = PairTree.fromNestedPairs([1, [2, 3]]);
			const subTree = leftTree.findNode(2)!;
			console.log(subTree);
			const rightTree = PairTree.fromNestedPairs([4, 5]);
			const newNode = subTree.join(rightTree);
			expect(newNode.parent).to.not.be.undefined;
			console.log(leftTree.toString());
			expect(leftTree.toString()).to.equal('[1,[[2,3],[4,5]]]');
		});
	});

	describe('findNode', () => {
		it('should find with side preference', () => {
			const node = tree.findNode(5, 'right');
			expect(node?.right).to.equal(5);
		});

		it('should find without side preference', () => {
			const node = tree.findNode(9);
			expect(9).to.satisfy((value: number) => node?.left === value || node?.right === value);
		});

		it('should failt to find elemnt that exists with wrong side preference', () => {
			const node = tree.findNode(9, 'right');
			expect(node).to.be.undefined;
		});
	});

	describe('inOrderSuccessor', () => {
		it('should find the next node after the node with 5 in it', () => {
			const node = tree.findNode(5);
			const successor = node?.inOrderSuccessor();
			expect(successor?.left).to.equal(6);
		});

		it('should find the next node after the node with 7 in it', () => {
			const node = tree.findNode(7);
			const successor = node?.inOrderSuccessor();
			expect(successor?.left).to.equal(8);
		});

		it('should return undefined if there is no successor', () => {
			const node = tree.findNode(9);
			const successor = node?.inOrderSuccessor();
			expect(successor).to.be.undefined;
		});

		it('should have the same result from step by step inorder and generator', () => {
			const generatorBased = [...tree.leftToRight()].join(',');
			const inOrderNumbers: number[] = [];
			let leftMostTree = tree;
			while (leftMostTree.leftTree) {
				leftMostTree = leftMostTree.leftTree;
			}
			let next: PairTree<number> | undefined = leftMostTree;
			while (next) {
				console.log(next);
				if (next.leftValue) {
					inOrderNumbers.push(next.leftValue);
				}
				if (next.rightValue) {
					inOrderNumbers.push(next.rightValue);
				}
				next = next.inOrderSuccessor();
			}
			const inOrderBased = inOrderNumbers.join(',');

			expect(generatorBased).to.equal(inOrderBased);
		});
	});

	describe('inOrderPredecessor', () => {
		it('should find the previous node before the node with 6 in it', () => {
			const node = tree.findNode(6);
			const predecessor = node?.inOrderPredecessor();
			expect(predecessor?.right).to.equal(5);
		});

		it('should find the previous node before the node with 2 in it', () => {
			const node = tree.findNode(3);
			const predecessor = node?.inOrderPredecessor();
			expect(predecessor?.left).to.equal(2);
		});

		it('should return undefined if there is no predecessor', () => {
			const node = tree.findNode(1);
			const predecessor = node?.inOrderPredecessor();
			expect(predecessor).to.be.undefined;
		});
	});

	describe('leftToRightNodes', () => {
		it('should emit nodes in order', () => {
			const values: number[] = [];
			for (const node of tree.leftToRightNodes()) {
				console.log('inord left:', node.leftValue, 'right:', node.rightValue);
				if (node.leftValue) {
					values.push(node.leftValue);
				}
				if (node.rightValue) {
					values.push(node.rightValue);
				}
			}
			expect(values).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		});
	});

	describe('rightToLeftNodes', () => {
		it('should emit nodes in reverse order', () => {
			const values: number[] = [];
			for (const node of tree.rightToLeftNodes()) {
				if (node.rightValue) {
					values.push(node.rightValue);
				}
				if (node.leftValue) {
					values.push(node.leftValue);
				}
			}
			expect(values).to.deep.equal([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
		});
	});
});
