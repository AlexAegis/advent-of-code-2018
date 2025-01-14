import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2019 - Day 3 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(91_518);
	});

	it('should be that that the first example resolves to 610', () => {
		expect(p2('R8,U5,L5,D3\nU7,R6,D4,L4')).toEqual(30);
	});

	it('should be that that the second example resolves to 610', () => {
		expect(p2('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')).toEqual(
			610,
		);
	});

	it('should be that that the third example resolves to 410', () => {
		expect(
			p2('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'),
		).toEqual(410);
	});
});
