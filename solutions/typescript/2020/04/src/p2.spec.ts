import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { passportChecks, runner } from './p2.js';

describe('2020 - Day 4 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(224);
	});

	it('should solve the first example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(2);
	});

	it('should solve the all valid example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.valid.txt')();
		expect(runner(input.input)).to.equal(4);
	});

	it('should solve the all invalid example', async () => {
		const input = await read(
			packageJson.aoc.year,
			packageJson.aoc.day,
			'example.invalid.txt'
		)();
		expect(runner(input.input)).to.equal(0);
	});

	it('should solve for the second input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'input.2.txt')();
		expect(runner(input.input)).to.equal(198);
	});

	it('should have a working byr check', async () => {
		expect(passportChecks.byr('2002')).to.be.true;
		expect(passportChecks.byr('2003')).to.be.false;
	});

	it('should have a working hgt check', async () => {
		expect(passportChecks.hgt('60in')).to.be.true;
		expect(passportChecks.hgt('190cm')).to.be.true;
		expect(passportChecks.hgt('190in')).to.be.false;
		expect(passportChecks.hgt('190')).to.be.false;
	});

	it('should have a working hcl check', async () => {
		expect(passportChecks.hcl('#123abc')).to.be.true;
		expect(passportChecks.hcl('#123abz')).to.be.false;
		expect(passportChecks.hcl('123abc')).to.be.false;
	});

	it('should have a working pid check', async () => {
		expect(passportChecks.pid('000000001')).to.be.true;
		expect(passportChecks.pid('0123456789')).to.be.false;
	});
});