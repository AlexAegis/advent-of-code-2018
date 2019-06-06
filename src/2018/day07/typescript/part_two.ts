import { Node } from './model/node.class';
import { Graph } from './model/graph.interface';
import { Vertice } from './model/vertice.class';
import { bench, reader, split } from '@root';
import { year, day, Args } from '.';

export interface Result {
	tick: number;
	seq: string;
}

export class Worker {
	public workingOn: Node;

	constructor(public id: number, private graph: Graph, private withBaseCost: boolean) {}

	public logic(tick: number): boolean {
		let finished = false;
		if (!this.workingOn) {
			for (let node of this.graph.nodes) {
				if (
					node.available() &&
					this.graph.vertices.filter(
						vertice =>
							vertice.to === node &&
							(!vertice.fulfilled(this.withBaseCost) || vertice.from.finishedOnTick === tick)
					).length === 0
				) {
					this.workingOn = node;
					break;
				}
			}
			// This means that this worker couldn't find any jobs. Time to retire.
			finished =
				finished ||
				this.graph.nodes.filter(node => node.available() || !node.processed(this.withBaseCost)).length === 0;
		}
		// if he's working, then do his work
		if (this.workingOn && !this.workingOn.processed(this.withBaseCost)) {
			this.workingOn.progress++;
			//console.log(`${id} - Doing my job! ${JSON.stringify(workingOn)}`);
		}
		// If just finished
		if (this.workingOn && this.workingOn.processed(this.withBaseCost)) {
			//console.log(`${id} - Finished.`);
			this.workingOn.finishedOnTick = tick;
			// done$.next(this.workingOn);
			this.workingOn = undefined;
		}

		return finished;
	}
}

const interpret = (input: string): Graph => {
	let graph: Graph = { nodes: [], vertices: [], workers: undefined };

	for (const line of split(input)) {
		let splitLine: Array<string> = line.split(/ /);
		let from: Node = graph.nodes.find(node => node.node === splitLine[1]);
		let to: Node = graph.nodes.find(node => node.node === splitLine[7]);
		if (!from) {
			from = new Node(splitLine[1]);
			graph.nodes.push(from);
		}
		if (!to) {
			to = new Node(splitLine[7]);
			graph.nodes.push(to);
		}
		graph.vertices.push(new Vertice(from, to));
	}

	graph.nodes = graph.nodes.sort((a, b) => {
		if (a.node === b.node) {
			return 0;
		} else {
			return a.node > b.node ? 1 : -1;
		}
	});
	graph.vertices = graph.vertices.sort((a, b) => {
		// TODO: Math this out
		if (a.from === b.from) {
			if (a.to === b.to) {
				return 0;
			} else {
				return a.to > b.to ? 1 : -1;
			}
		} else {
			return a.from > b.from ? 1 : -1;
		}
	});

	return graph;
};

export const runner = async (input: string, args: Args = { workers: 2 }): Promise<number> => {
	const graph: Graph = await interpret(input);

	const workers = [...Array(args.workers)].map(i => new Worker(i, graph, args.workers === 5));

	let done = false;
	let tick = 0;
	while (!done) {
		for (const worker of workers) {
			done = done || worker.logic(tick);
		}
		tick++;
	}
	return tick;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 1115 ~24ms
}
