import { bench, read } from '@lib';
import { BoundingBox, is } from '@lib/functions';
import { Vec2, Vec2String } from '@lib/model';
import { day, year } from '.';
import { parse, SeatState } from './parse.function';

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

export const nextState = (
	v: Vec2,
	map: Map<Vec2String, SeatState>,
	limit: BoundingBox
): SeatState => {
	const nextVisible = dirs.map((dir) => {
		for (let next = v.add(dir); next.isWithin(limit); next.addMut(dir)) {
			if (map.has(next.toString())) {
				return map.get(next.toString());
			}
		}
		return undefined;
	});

	const occCount = nextVisible.count((d) => d === SeatState.OCCUPIED);
	const me = map.get(v.toString()) ?? SeatState.FLOOR;
	if (me === SeatState.OCCUPIED && occCount >= 5) {
		return SeatState.EMPTY;
	} else if (me !== SeatState.OCCUPIED && occCount === 0) {
		return SeatState.OCCUPIED;
	} else {
		return me;
	}
};

export const tick = (
	map: Map<Vec2String, SeatState>,
	limit: BoundingBox
): Map<Vec2String, SeatState> => {
	const nextMap = new Map<Vec2String, SeatState>();
	[...map.keys()].forEach((key) => {
		nextMap.set(key, nextState(new Vec2(key), map, limit));
	});
	return nextMap;
};

export const runner = (input: string): number => {
	const { seats, height, width } = parse(input);
	const limit: BoundingBox = { topLeft: Vec2.ORIGIN, bottomRight: new Vec2(width, height) };

	let map = seats;

	for (;;) {
		const nextMap = tick(map, limit);
		if (map.isTheSameAs(nextMap)) {
			break;
		}
		map = nextMap;
	}

	return [...map.values()].count(is(SeatState.OCCUPIED));
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2149 ~1300ms
}
