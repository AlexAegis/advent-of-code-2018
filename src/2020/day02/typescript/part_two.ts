import { bench, read, split } from '@lib';
import { day, year } from '.';
import { parseLine } from './part_one';

export const runner = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(({ low, high, letter, password }) => {
			const lowMatch = password[low - 1] === letter;
			const highMatch = password[high - 1] === letter;
			return lowMatch !== highMatch;
		}).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 593 ~2ms
}
