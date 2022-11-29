import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2019 - Day 9 - Part One', () => {
	it(`should resolve to 3507134798 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal('3507134798');
	});

	it('should be that that both the first examples resolves to itself', async () => {
		expect(await runner('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99')).to.equal(
			'109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
		);
	});

	it('should be that that both the second examples resolves to 0', async () => {
		expect(await runner('1102,34915192,34915192,7,4,7,99,0')).to.equal('1219070632396864');
	});

	it('should be that that both the second examples resolves to 0', async () => {
		expect(await runner('104,1125899906842624,99')).to.equal('1125899906842624');
	});
});