import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner())}`))(); // 81781678911487 ~1ms
}
