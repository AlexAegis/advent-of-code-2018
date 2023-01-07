import {
	arrayContains,
	nonNullish,
	partition,
	Vec2,
	Vec2Like,
} from '@alexaegis/advent-of-code-lib';
import { Component } from '../component.class.js';
import { SpatialComponent } from '../spatial-component.class.js';
import { ColliderComponent } from './collider.component.js';

export abstract class AnyPositionComponent extends Component {
	constructor(protected _position: Vec2, public readonly z = 0) {
		super();
	}

	override onSpawn(): void {
		this.indexEntityMove(undefined, this.position);
	}

	get position(): Vec2 {
		return this._position;
	}

	protected indexEntityMove(from: Vec2 | undefined, to: Vec2): void {
		for (const entity of this.belongsTo) {
			for (const component of entity.components.values()) {
				if (SpatialComponent.isSpatialComponent(component)) {
					const cache = component.getSpatialCache();
					const lastPositions = from ? component.getLastPositions(from) : [];
					const toArea = component.area(to);
					const [finiteArea, infiniteArea] = partition(toArea, (area) => area.isFinite());
					const nextPositions = finiteArea.flatMap((area) => area.renderIntoVectors());
					const nextPositionsString = nextPositions.map((p) => p.toString());
					component.lastPositions = nextPositions;

					cache.move(
						entity,
						lastPositions.map((p) => p.toString()),
						nextPositionsString
					);

					if (infiniteArea.length) {
						cache.infiniteBoxes;
					}
				}
			}
		}
	}
}

export class PositionComponent extends AnyPositionComponent {
	private onMoveCallbacks: ((position: Readonly<Vec2>) => void)[] = [];

	moveTo(to: Vec2): boolean {
		return this.move(to.sub(this.position));
	}

	move(offset: Vec2Like): boolean {
		// Collision Check
		if (this.canMove(offset)) {
			const oldPosition = this.position.clone();
			this._position.addMut(offset);
			this.indexEntityMove(oldPosition, this.position);
			this.onMoveCallbacks.forEach((callback) => callback(this.position));
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Can only move if all the colliders ofattached entities are free to move.
	 * ? Self collider
	 */
	canMove(offset: Vec2Like): boolean {
		return this.belongsTo
			.map((entity) => entity.getComponent(ColliderComponent))
			.filter(nonNullish)
			.flatMap((collider) =>
				collider.getLastPositions(this.position).map((p) => p.add(offset))
			)
			.every(
				(p) =>
					this.world
						.entitiesCollidingAt(p)
						.filter(
							(collidingEntity) => !arrayContains(this.belongsTo, collidingEntity)
						).length === 0
			);
	}

	onMove(callback: (position: Readonly<Vec2>) => void) {
		this.onMoveCallbacks.push(callback);
	}
}

/**
 * Signals that the entity it's attached to is immutable.
 * Components with this are always rendered first
 */
export class StaticPositionComponent extends AnyPositionComponent {}
