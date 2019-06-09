import { bench, read } from '@root';
import { day, year } from '.';

export const runner = async (input: string) => {
	let a = 0;
	let i = 0;
	for (const char of [...input].filter(c => c === '(' || c === ')')) {
		a += char === '(' ? 1 : -1;
		i++;
		if (a < 0) break;
	}
	return i;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1795 ~0.4ms
}
