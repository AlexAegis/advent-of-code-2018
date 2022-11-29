import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const runner =
	(deckSize = 119315717514047n, repeat = 101741582076661n, target = 2020n) =>
	(input: string): number => {
		const lines = parse(input);
		let increment = 1n;
		let offset = 0n;
		for (const line of lines) {
			const nn = parseInt(line.split(' ').pop() as string, 10);
			const bn = isNaN(nn) ? 0n : BigInt(nn);
			if (line.startsWith('deal into new stack')) {
				increment = increment * -1n;
				increment = increment.posMod(deckSize);
				offset = offset + increment;
				offset = offset.posMod(deckSize);
			} else if (line.startsWith('cut')) {
				offset = offset + increment * bn;
				offset = offset.posMod(deckSize);
			} else if (line.startsWith('deal with increment')) {
				increment = increment * bn.invMod(deckSize);
				increment = increment.posMod(deckSize);
			}
		}

		const i = increment.modExp(repeat, deckSize);

		offset = offset * (1n - i) * (1n - increment).posMod(deckSize).invMod(deckSize);
		offset = offset.posMod(deckSize);

		return Number((offset + i * target).posMod(deckSize));
	};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner())}`); // 81781678911487 ~1ms
}