import { task } from '@alexaegis/advent-of-code-lib';
import { is } from '@alexaegis/advent-of-code-lib/functions';
import { Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { SeatState, parse } from './parse.function.js';

const dirs = [
	new Vec2(0, 1),
	new Vec2(1, 1),
	new Vec2(1, 0),
	new Vec2(1, -1),
	new Vec2(0, -1),
	new Vec2(-1, -1),
	new Vec2(-1, 0),
	new Vec2(-1, 1),
];

export const nextState = (v: Vec2, map: Map<string, SeatState>): SeatState => {
	const occCount = dirs.count((d) => map.get(v.add(d).toString()) === SeatState.OCCUPIED);
	const me = map.get(v.toString()) ?? SeatState.FLOOR;
	if (me === SeatState.OCCUPIED && occCount >= 4) {
		return SeatState.EMPTY;
	} else if (me !== SeatState.OCCUPIED && occCount === 0) {
		return SeatState.OCCUPIED;
	} else {
		return me;
	}
};

export const tick = (map: Map<Vec2String, SeatState>): Map<Vec2String, SeatState> => {
	const nextMap = new Map<Vec2String, SeatState>();
	for (const key of map.keys()) {
		nextMap.set(key, nextState(new Vec2(key), map));
	}
	return nextMap;
};

export const p1 = (input: string): number => {
	const { seats } = parse(input);

	let map = seats;

	for (;;) {
		const nextMap = tick(map);
		if (map.isTheSameAs(nextMap)) {
			break;
		}
		map = nextMap;
	}

	return [...map.values()].count(is(SeatState.OCCUPIED));
};

await task(p1, packageJson.aoc); // 2406 ~900ms
