import { benchTask } from '@alexaegis/advent-of-code-lib';

function shift(window: string, last: number, length: number): string {
	if (window.length >= length) {
		return window.slice(window.length - length + 1, window.length) + last;
	} else return window + last;
}

export const p2 = (input: string): number => {
	const recipes: number[] = [3, 7];
	let a = 0;
	let b = 1;
	let window = '';
	for (;;) {
		const next = recipes[a] + recipes[b];
		if (next >= 10) {
			recipes.push(Math.floor(next / 10));
			window = shift(window, recipes[recipes.length - 1], input.length);
			if (window === input) break;
			recipes.push(next % 10);
			window = shift(window, recipes[recipes.length - 1], input.length);
			if (window === input) break;
		} else {
			recipes.push(next);
			window = shift(window, recipes[recipes.length - 1], input.length);
			if (window === input) break;
		}
		a = (a + recipes[a] + 1) % recipes.length;
		b = (b + recipes[b] + 1) % recipes.length;
	}
	return recipes.length - input.length;
};

if (process.env.RUN) {
	console.log(`Result: ${await benchTask(p2, { input: '327901' })}`); // 20229822 ~ 900ms
}
