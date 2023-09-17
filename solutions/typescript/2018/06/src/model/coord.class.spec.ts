import { describe, expect, it } from 'vitest';
import { Coord } from './coord.class.js';

describe('2018 - Day 6 - Coord', () => {
	const a: Coord = new Coord(1, 1);
	const b: Coord = new Coord(3, 3);
	const c: Coord = new Coord(7, 2);

	it('should the manhattan distance between (1, 1) and (3, 3) be 4', () => {
		expect(a.manhattanCoord(b)).toEqual(4);
	});

	it('should the manhattan distance between (3, 3) and (7, 2) be 4', () => {
		expect(b.manhattanCoord(c)).toEqual(5);
	});

	it('should the that the manhattan distance is commutative', () => {
		expect(a.manhattanCoord(b)).toEqual(b.manhattanCoord(a));
		expect(a.manhattanCoord(c)).toEqual(c.manhattanCoord(a));
	});
});
