import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 - Day 16 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(10_185_143_721_112);
	});

	describe('D2FE28', () => {
		it('should resolve to 2021', () => {
			expect(p2('D2FE28')).toEqual(2021);
		});
	});

	describe('38006F45291200', () => {
		it('should resolve to 1', () => {
			expect(p2('38006F45291200')).toEqual(1);
		});
	});

	describe('EE00D40C823060', () => {
		it('should resolve to 3', () => {
			expect(p2('EE00D40C823060')).toEqual(3);
		});
	});

	describe('8A004A801A8002F478', () => {
		it('should resolve to 15', () => {
			expect(p2('8A004A801A8002F478')).toEqual(15);
		});
	});

	describe('620080001611562C8802118E34', () => {
		it('should resolve to 46', () => {
			expect(p2('620080001611562C8802118E34')).toEqual(46);
		});
	});

	describe('C0015000016115A2E0802F182340', () => {
		it('should resolve to 46', () => {
			expect(p2('C0015000016115A2E0802F182340')).toEqual(46);
		});
	});

	describe('A0016C880162017C3686B18A3D4780', () => {
		it('should resolve to 54', () => {
			expect(p2('A0016C880162017C3686B18A3D4780')).toEqual(54);
		});
	});

	describe('C200B40A82', () => {
		it('should resolve to 3', () => {
			expect(p2('C200B40A82')).toEqual(3);
		});
	});

	describe('04005AC33890', () => {
		it('should resolve to 54', () => {
			expect(p2('04005AC33890')).toEqual(54);
		});
	});

	describe('880086C3E88112', () => {
		it('should resolve to 7', () => {
			expect(p2('880086C3E88112')).toEqual(7);
		});
	});

	describe('CE00C43D881120', () => {
		it('should resolve to 9', () => {
			expect(p2('CE00C43D881120')).toEqual(9);
		});
	});

	describe('D8005AC2A8F0', () => {
		it('should resolve to 1', () => {
			expect(p2('D8005AC2A8F0')).toEqual(1);
		});
	});

	describe('F600BC2D8F', () => {
		it('should resolve to 0', () => {
			expect(p2('F600BC2D8F')).toEqual(0);
		});
	});

	describe('9C005AC2F8F0', () => {
		it('should resolve to 0', () => {
			expect(p2('9C005AC2F8F0')).toEqual(0);
		});
	});

	describe('9C0141080250320F1802104A08', () => {
		it('should resolve to 1', () => {
			expect(p2('9C0141080250320F1802104A08')).toEqual(1);
		});
	});
});
