import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { spawnFloor, spawnWall } from '../entity/index.js';
import { spawnCompass } from '../entity/prebuilt/compass.entity.js';
import { spawnPlayer } from '../entity/prebuilt/player.entity.js';

import { GridWorld } from '../world/grid-world.class.js';

// TODO: add z level
const world = new GridWorld({
	io: 'terminalKit',
	executorHaltCondition: 'none',
	executorSpeed: 60,
	rendererOptions: {
		renderColliders: false,
	},
	cameraOptions: {
		movable: true,
		followArea: { kind: 'responsive', marginRatio: 6 },
		followMode: 'jumpToCenter',
	},
});

const compassEntity = spawnCompass(world);
spawnFloor(world, new Vec2(3, 3), { x: 5, y: 5 });

spawnWall(world, new Vec2(6, 2), new Vec2(7, 2));
spawnWall(world, new Vec2(8, 2), new Vec2(9, 10));

spawnWall(world, new Vec2(0, 3), new Vec2(0, Infinity));
spawnWall(world, new Vec2(3, 0), new Vec2(Infinity, 0));

spawnWall(world, new Vec2(-3, 0), new Vec2(-Infinity, 0));
spawnWall(world, new Vec2(0, -3), new Vec2(0, -Infinity));

const playerEntity = spawnPlayer(world, new Vec2(1, 1));

world.centerCameraOnEntity(compassEntity);
world.followWithCamera(playerEntity);

await world.run();
