import { describe, expect, it } from 'vitest';
import { p1 } from './p1.js';

describe(`2018 - Day 14 - Part One`, () => {
	it(`should resolve to 1115317115 when using the input`, async () => {
		expect(p1(327901)).to.equal('1115317115');
	});

	it('Should be 5158916779 after 9 recipe:', async () => {
		expect(p1(9)).to.equal('5158916779');
	});

	it('Should be 0124515891 after 5 recipe:', async () => {
		expect(p1(5)).to.equal('0124515891');
	});

	it('Should be 9251071085 after 18 recipe:', async () => {
		expect(p1(18)).to.equal('9251071085');
	});
	it('Should be 5941429882 after 2018 recipe:', async () => {
		expect(p1(2018)).to.equal('5941429882');
	});
});
