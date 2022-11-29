import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export enum RelevantField {
	byr = 'byr',
	iyr = 'iyr',
	eyr = 'eyr',
	hgt = 'hgt',
	hcl = 'hcl',
	ecl = 'ecl',
	pid = 'pid',
}

export type Passport = Record<RelevantField, string>;

export const parsePassport = (passport: string): Partial<Passport> =>
	passport.split(' ').reduce((acc, e) => {
		const [key, val] = e.split(':');
		acc[key as RelevantField] = val;
		return acc;
	}, {} as Partial<Passport>);

export const parsePassports = (input: string): Partial<Passport>[] =>
	input
		.split(/\r?\n\r?\n/)
		.map((raw) => raw.replace(/\r?\n/g, ' '))
		.map(parsePassport);

export const isPassport = (passport: Partial<Passport>): passport is Passport =>
	Object.values(RelevantField).every((pf) => Object.keys(passport).find((k) => k === pf));

export const runner = (input: string): number => parsePassports(input).count(isPassport);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 264 ~5.6ms
}