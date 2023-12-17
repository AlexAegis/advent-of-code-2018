import { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';

import type { Edge } from './edge.type.js';
import type { CurrentPathWeighter, Heuristic, Weighter } from './heuristic.type.js';
import { GraphNode } from './node.class.js';

export interface GraphTraversalOptions<N, Dir = Direction> {
	/**
	 * When traversing an edge that doesn't have a node at it's end, how to
	 * generate it? By default it always generates an `undefined` meaning
	 * by default no new nodes will be created and the graph is treated as
	 * complete
	 */
	// generateNode?: (graph: Graph<N>, path: Map<N, N>) => N | undefined;
	edgeGenerator?: (nodeMap: Map<string, N>, from: N, path: N[]) => Edge<N, Dir>[];
	heuristic?: Heuristic<N>;
	currentPathWeighter?: CurrentPathWeighter<N, Dir>;
}

// TODO take out DIR, it doesnt make sense here
export class Graph<
	T extends ToString = string,
	Dir extends ToString = Direction,
	N extends GraphNode<T, Dir> = GraphNode<T, Dir>,
> implements Iterable<N>
{
	public nodes = new Map<string, N>();
	public edges = new Set<Edge<N, Dir>>();

	public static fromUniqueValueEdges<T extends ToString>(
		edges: { from: T; to: T; bidirection?: boolean }[],
		keyer?: (t: T) => string,
		forcedBidirection?: boolean,
	): Graph<T, number> {
		const graph = new Graph<T, number>();
		for (const edge of edges) {
			const [, from] = graph.tryAddNode(edge.from, keyer?.(edge.from));
			const [, to] = graph.tryAddNode(edge.to, keyer?.(edge.to));
			const fromToEdge = { from, to, direction: 1 };
			graph.edges.add(fromToEdge);
			from.neighbours.set(from.neighbours.size + 1, fromToEdge);
			if (forcedBidirection ?? (edge.bidirection && forcedBidirection)) {
				const reverseEdge = { from: to, to: from, direction: -1 };
				graph.edges.add(reverseEdge);
				to.neighbours.set(to.neighbours.size + 1, reverseEdge);
			}
		}
		return graph;
	}

	public get nodeValues(): N[] {
		return [...this.nodes.values()];
	}

	/**
	 * Every node where the node and all its neighbours return true for the
	 * matcher is considered an intersection.
	 *
	 * @param matcher
	 */
	public getIntersections(matcher: (node?: N) => boolean): N[] {
		return this.nodeValues.filter(
			(node) => matcher(node) && node.neighbourNodes.every((node) => matcher(node)),
		);
	}

	/**
	 * TODO: Fix
	 * Swap 2 nodes with all their neighbours, but keep the value
	 */
	public swap(a: N, b: N): void {
		const an = a.neighbours.entryArray();
		const bn = b.neighbours.entryArray();
		const ak = this.nodes.findKey(a);
		const bk = this.nodes.findKey(b);

		if (ak === undefined || bk === undefined) {
			throw new Error('trying to swap nodes without keys');
		}

		a.neighbours.clear();
		b.neighbours.clear();

		this.nodes.set(ak, b);
		this.nodes.set(bk, a);
		for (const [d, n] of bn) {
			this.edges.delete(n);
			const edge = {
				...n,
				from: a,
				to: n.to === a ? b : n.to,
			};
			a.neighbours.set(d, edge);
			this.edges.add(edge);
		}

		for (const [d, n] of an) {
			this.edges.delete(n);
			const edge = {
				...n,
				from: b,
				to: n.to === b ? a : n.to,
			};
			a.neighbours.set(d, edge);
			this.edges.add(edge);
		}

		a;
	}

	private tryAddNode(value: T, key?: string): [string, N] {
		let existing: [string, N] | undefined;
		if (key) {
			const node = this.getNode(key);
			existing = node ? [key, node] : undefined;
		} else {
			existing = [...this.nodes.entries()].find((existing) => existing[1].value === value);
		}

		if (existing) {
			return existing;
		} else {
			if (!key) {
				key = (this.nodes.size + 1).toString();
			}
			const node = new GraphNode(key, value) as N;
			this.nodes.set(key, node);
			return [key, node];
		}
	}

	private static generatePath<
		T extends ToString,
		Dir extends ToString,
		N extends GraphNode<T, Dir>,
	>(cameFrom: Map<N, N>, start: N, goal?: N): N[] {
		const s: N[] = [];
		if (goal) {
			let u: N | undefined = goal;
			if (start === u || cameFrom.get(u)) {
				while (u) {
					s.unshift(u);
					u = cameFrom.get(u);
				}
			}
		}
		return s;
	}

	public getNode(key: string): N | undefined {
		return this.nodes.get(key);
	}

	public get size(): number {
		return this.nodes.size;
	}

	public forEach(callbackFn: (node: N) => void): void {
		for (const node of this.nodes.values()) {
			callbackFn(node);
		}
	}

	*[Symbol.iterator](): IterableIterator<N> {
		for (const node of this.nodes.values()) {
			yield node;
		}
	}

	static defaultWeighter: Weighter<unknown, unknown> = (_a, _b, _direction) => 1;

	public dijkstra(start: N | undefined, target: N | undefined): N[] {
		if (!start || !target) {
			return [];
		}
		const q = new Set<N>(this.nodes.values());

		const dist = new Map<N, number>();
		const prev = new Map<N, N>();
		dist.set(start, 0);

		while (q.size > 0) {
			// refactor this to a prio queue
			const umin = [...q.values()].reduce(
				(acc, b) => {
					const u = dist.get(b) ?? Number.POSITIVE_INFINITY;
					if (!acc.node || u < acc.dist) {
						acc.node = b;
						acc.dist = dist.get(b) ?? Number.POSITIVE_INFINITY;
					}
					return acc;
				},
				{ node: undefined as N | undefined, dist: Number.POSITIVE_INFINITY },
			);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const u = umin.node!;
			if (u === target) {
				break;
			}
			q.delete(u);

			for (const neighbour of u) {
				const alt = umin.dist + (neighbour.weight ?? 1);
				if (alt < (dist.get(neighbour.to) ?? Number.POSITIVE_INFINITY)) {
					dist.set(neighbour.to, alt);
					prev.set(neighbour.to, u);
				}
			}
		}

		const s: N[] = [];
		let u: N | undefined = target;
		if (start === u || prev.get(u)) {
			while (u) {
				s.unshift(u);
				u = prev.get(u);
			}
		}

		return s;
	}

	/**
	 *
	 */
	public floodDiskstra(start: N | undefined): Map<N, number> {
		if (!start) {
			return new Map();
		}
		const q = new Set<N>(this.nodes.values());

		const dist = new Map<N, number>();
		const prev = new Map<N, N>();
		dist.set(start, 0);

		while (q.size > 0) {
			// refactor this to a prio queue
			const umin = [...q.values()].reduce(
				(acc, b) => {
					const u = dist.get(b) ?? Number.POSITIVE_INFINITY;
					if (!acc.node || u < acc.dist) {
						acc.node = b;
						acc.dist = dist.get(b) ?? Number.POSITIVE_INFINITY;
					}
					return acc;
				},
				{ node: undefined as N | undefined, dist: Number.POSITIVE_INFINITY },
			);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const u = umin.node!;

			q.delete(u);

			for (const neighbour of u) {
				const alt = umin.dist + (neighbour.weight ?? 1);
				if (alt < (dist.get(neighbour.to) ?? Number.POSITIVE_INFINITY)) {
					dist.set(neighbour.to, alt);
					prev.set(neighbour.to, u);
				}
			}
		}

		return dist;
	}

	/**
	 * A gutted out aStar, not trying to find a path, but calculating a distanceMap
	 * to all reachable node.
	 */
	public flood(start: N | undefined, options?: GraphTraversalOptions<N, Dir>): Map<N, number> {
		if (!start) {
			return new Map();
		}
		const openSet = new Set<N>([start]); // q?
		const cameFrom = new Map<N, N>(); // prev!
		const gScore = new Map<N, number>(); // weightMap! Infinity
		const dMap = new Map<N, number>(); // distanceMap Infinity

		const h = options?.heuristic ?? (() => 1);

		gScore.set(start, 0);
		dMap.set(start, 0);

		const fScore = new Map<N, number>(); // Infinity
		fScore.set(start, h(start, []));

		while (openSet.size > 0) {
			const umin = [...openSet.values()].reduce(
				(acc, b) => {
					const u = fScore.get(b) ?? Number.POSITIVE_INFINITY;
					if (!acc.node || u < acc.dist) {
						acc.node = b;
						acc.dist = fScore.get(b) ?? Number.POSITIVE_INFINITY;
					}
					return acc;
				},
				{ node: undefined as N | undefined, dist: Number.POSITIVE_INFINITY },
			);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const current = umin.node!;

			openSet.delete(current);

			for (const neighbour of options?.edgeGenerator?.(this.nodes, current, []) ?? current) {
				const tentativegScore =
					(gScore.get(current) ?? Number.POSITIVE_INFINITY) +
					(options?.currentPathWeighter
						? options.currentPathWeighter(
								neighbour.from,
								neighbour.to,
								neighbour.direction,
								[],
							)
						: neighbour.weight ?? 1);
				const tentativeDistance = (dMap.get(current) ?? 0) + 1;
				if (tentativegScore < (gScore.get(neighbour.to) ?? Number.POSITIVE_INFINITY)) {
					cameFrom.set(neighbour.to, current);
					gScore.set(neighbour.to, tentativegScore);
					fScore.set(neighbour.to, tentativegScore);
					dMap.set(neighbour.to, tentativeDistance);
					if (!openSet.has(neighbour.to)) {
						openSet.add(neighbour.to);
					}
				}
			}
		}

		return dMap;
	}

	/**
	 *
	 * @param start
	 * @param end
	 * @param h global heuristic function. Should return a monotone value for
	 * better nodes
	 */
	public aStar(
		start: N | undefined,
		end: N | ((n: N, path: N[]) => boolean) | undefined,
		options?: GraphTraversalOptions<N, Dir>,
	): { path: N[]; gScore: Map<N, number> } {
		if (!start || !end) {
			return { path: [], gScore: new Map() };
		}

		const openSet = new Set<N>([start]); // q?
		const cameFrom = new Map<N, N>(); // prev!
		const gScore = new Map<N, number>(); // dist! Infinity

		const h = options?.heuristic ?? (() => 1);

		const isFinished = typeof end === 'function' ? end : (n: N, _path: N[]) => n === end;
		// const generateNode = options?.generateNode ?? (() => undefined);

		gScore.set(start, 0);

		const fScore = new Map<N, number>(); // Infinity
		fScore.set(start, h(start, []));

		let goal: N | undefined;

		while (openSet.size > 0) {
			const umin = [...openSet.values()].reduce(
				(acc, b) => {
					const u = fScore.get(b) ?? Number.POSITIVE_INFINITY;
					if (!acc.node || u < acc.dist) {
						acc.node = b;
						acc.dist = fScore.get(b) ?? Number.POSITIVE_INFINITY;
					}
					return acc;
				},
				{ node: undefined as N | undefined, dist: Number.POSITIVE_INFINITY },
			);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const current = umin.node!;

			const currentPath = Graph.generatePath<T, Dir, N>(cameFrom, start, current);

			if (isFinished(current, currentPath)) {
				goal = current;
				break;
			}
			openSet.delete(current);

			for (const neighbour of options?.edgeGenerator?.(this.nodes, current, currentPath) ??
				current) {
				const tentativegScore =
					(gScore.get(current) ?? Number.POSITIVE_INFINITY) +
					(options?.currentPathWeighter
						? options.currentPathWeighter(
								current,
								neighbour.to,
								neighbour.direction,
								currentPath,
							)
						: neighbour.currentPathWeighter
							? neighbour.currentPathWeighter(
									current,
									neighbour.to,
									neighbour.direction,
									currentPath,
								)
							: neighbour.weight ?? 1);
				if (tentativegScore < (gScore.get(neighbour.to) ?? Number.POSITIVE_INFINITY)) {
					cameFrom.set(neighbour.to, current);
					gScore.set(neighbour.to, tentativegScore);
					fScore.set(neighbour.to, tentativegScore + h(neighbour.to, currentPath));
					if (!openSet.has(neighbour.to)) {
						openSet.add(neighbour.to);
					}
				}
			}
		}

		return { path: Graph.generatePath<T, Dir, N>(cameFrom, start, goal), gScore };
	}
}
