import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const isNice = (line: string): boolean => {
	let prevBef: string | undefined;
	let prev: string | undefined;
	let hasWrapping = false;
	let hasNonOverlapping = false;
	// holds the positions of the pairs
	const doubles: Record<string, number[]> = {};
	let i = 0;
	for (const n of line) {
		if (!hasWrapping && prevBef && prev && prevBef === n) {
			hasWrapping = true;
		}
		if (prev) {
			const pair = prev + n;
			let pairObj = doubles[pair];
			if (!pairObj) {
				pairObj = [];
				doubles[pair] = pairObj;
			}
			pairObj.push(i);
			if (!hasNonOverlapping) {
				hasNonOverlapping = pairObj.some((po) =>
					pairObj?.some((poi) => Math.abs(poi - po) > 1),
				);
			}
		}

		prevBef = prev;
		prev = n;
		i++;
	}
	return hasWrapping && hasNonOverlapping;
};

export const p2 = (input: string): number => {
	return input.split('\n').reduce((a, n) => a + (isNice(n) ? 1 : 0), 0);
};

await task(p2, packageJson.aoc); // 51 ~21ms
