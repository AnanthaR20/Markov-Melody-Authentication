// export enum GameState {
// 	START,
// 	PROGRESS,
// 	FINISH
// }

// export class Item {
// 	digit: number;
// 	color: string;

// 	constructor(digit: number, color: string) {
// 		this.digit = digit;
// 		this.color = color;
// 	}
// }

// export enum Mode {
// 	DISPLAY,
// 	POSITION_ENTRY,
// 	COLOR_ENTRY
// }

export type GetPointsResponse = {
	uid: number | null;
	points: number | null;
	actual_pin: string;
};

export type CreateInstanceResponse = {
	iid: number;
};

export type UpdateInstanceResponse = {
	iid: number;
};

// function rand_digit(): number {
// 	for (;;) {
// 		const array = new Uint8Array(1);
// 		self.crypto.getRandomValues(array);
// 		if (array[0] < 250) {
// 			return array[0] % 10;
// 		}
// 	}
// }

// function rand_digit_min_i(i: number): number {
// 	for (;;) {
// 		const j = rand_digit();
// 		if (j >= i) {
// 			return j;
// 		}
// 	}
// }

// function rand_perm(): Uint8Array {
// 	const array = new Uint8Array(10);
// 	for (let i = 0; i < 10; ++i) {
// 		array[i] = i;
// 	}
// 	for (let i = 0; i < 9; ++i) {
// 		const j = rand_digit_min_i(i);
// 		const temp = array[i];
// 		array[i] = array[j];
// 		array[j] = temp;
// 	}
// 	return array;
// }

// const COLORS: Array<string> = ['red', 'blue', 'green', '#8B8000', 'black'];
// export const NCOLORS = COLORS.length;

// export function get_ith_color(i: number): string {
// 	if (i < COLORS.length) {
// 		return COLORS[i];
// 	}
// 	return 'white';
// }

// export function make_random_puzzles(): Array<Array<Item>> {
// 	const ret = new Array<Array<Item>>();

// 	const perms: Record<string, Uint8Array> = {};
// 	for (const color of COLORS) {
// 		perms[color] = rand_perm();
// 	}

// 	for (let i = 0; i < 10; ++i) {
// 		ret.push(new Array<Item>());
// 		for (const color of COLORS) {
// 			ret[i].push(new Item(perms[color][i], color));
// 		}
// 	}
// 	return ret;
// }
