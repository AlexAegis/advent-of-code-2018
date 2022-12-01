import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { rotateArrayTimes } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 =
	(deckSize = 10007) =>
	(input: string): number => {
		const lines = parse(input);
		let deck = [...Array(deckSize).keys()];
		for (const line of lines) {
			const n = parseInt(line.split(' ').pop() as string, 10);
			if (line.startsWith('deal into new stack')) {
				deck = deck.reverse();
			} else if (line.startsWith('cut')) {
				rotateArrayTimes(deck, n);
			} else if (line.startsWith('deal with increment')) {
				const nextDeck = [];
				let i = 0;
				for (const c of deck) {
					nextDeck[i % deck.length] = c;
					i += n;
				}
				deck = nextDeck;
			}
		}
		return deck.indexOf(2019);
	};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1(), resources)}`); // 6831 ~164ms
}
