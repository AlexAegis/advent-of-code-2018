import { task } from '@alexaegis/advent-of-code-lib';
import { pairs } from '@alexaegis/advent-of-code-lib/functions';
import { clamp } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import { Moon } from './model/moon.class.js';
import { parseLines } from './parse.js';

export const p1 =
	(target = 1000) =>
	(input: string): number => {
		const ms = parseLines(input).map((m) => new Moon(m));
		const ps = pairs(ms);
		for (let i = 0; i < target; i++) {
			for (const [a, b] of ps) {
				const x = clamp(b.pos.x - a.pos.x);
				a.vel.x += x;
				b.vel.x -= x;

				const y = clamp(b.pos.y - a.pos.y);
				a.vel.y += y;
				b.vel.y -= y;

				const z = clamp(b.pos.z - a.pos.z);
				a.vel.z += z;
				b.vel.z -= z;
			}
			for (const m of ms) m.step();
		}
		return ms.reduce((acc, m) => acc + m.totalEnergy(), 0);
	};

await task(p1(), packageJson.aoc); // 8625 ~3ms
