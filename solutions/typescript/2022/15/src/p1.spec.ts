import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1, type Args } from './p1.js';

describe('2022 15 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input, args } = await loadTaskResources<Args>(packageJson.aoc);
			expect(p1(input, args)).toEqual(5_127_797);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const { input, args } = await loadTaskResources<Args>(packageJson.aoc, 'example.1.txt');
			expect(p1(input, args)).toEqual(26);
		});
	});
});
