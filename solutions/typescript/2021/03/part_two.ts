import { bench, read } from '@lib';
import { day, year } from '.';

const getMostCommonBit = (lines: string[], bitIndex: number): '1' | '0' => {
	let c0 = 0;
	let c1 = 0;

	for (const line of lines) {
		const bit = [...line][bitIndex];
		if (bit === '1') {
			c1++;
		} else {
			c0++;
		}
	}
	return c1 >= c0 ? '1' : '0';
};

export const runner = (input: string): number => {
	const lines = input.lines();
	const bitCount = lines[0].length;

	let oxygenRatings = [...lines];
	for (let i = 0; i < bitCount && oxygenRatings.length > 1; i++) {
		const mostCommonBit = getMostCommonBit(oxygenRatings, i);
		oxygenRatings = oxygenRatings.filter((line) => [...line][i] === mostCommonBit);
	}

	let co2ScrubberRatings = [...lines];
	for (let i = 0; i < bitCount && co2ScrubberRatings.length > 1; i++) {
		const mostCommonBit = getMostCommonBit(co2ScrubberRatings, i);
		co2ScrubberRatings = co2ScrubberRatings.filter((line) => [...line][i] !== mostCommonBit);
	}

	const oxygenRating = parseInt(oxygenRatings[0], 2);
	const co2ScrubberRating = parseInt(co2ScrubberRatings[0], 2);
	return oxygenRating * co2ScrubberRating;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2845944 ~0.65ms
}