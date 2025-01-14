import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const calculate =
	(target: number) =>
	(input: string): number => {
		const numbers = input.split(',').map((a) => Number.parseInt(a, 10));

		const map = new Map<number, { turn: number; prevTurn: number | undefined }>();

		let lastNumber = 0;

		for (let i = 1; i <= target; i++) {
			if (i <= numbers.length) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				lastNumber = numbers[i - 1]!;
				map.set(lastNumber, { turn: i, prevTurn: undefined });

				continue;
			}
			const c = map.get(lastNumber);

			let result: number;
			if (c) {
				result = c.prevTurn ? c.turn - c.prevTurn : 0;
			} else {
				result = 0;
				map.set(lastNumber, { turn: i, prevTurn: undefined });
			}

			const r = map.get(result);
			if (r) {
				r.prevTurn = r.turn;
				r.turn = i;
			} else {
				map.set(result, { turn: i, prevTurn: undefined });
			}

			lastNumber = result;
		}
		return lastNumber;
	};

export const p1 = calculate(2020);

await task(p1, packageJson.aoc); // 1015 ~0.08ms
