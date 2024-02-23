// The full list of songs
import C3 from '$lib/audio/C3.mp3';
import C4 from '$lib/audio/C4.mp3';
import Db3 from '$lib/audio/Db3.mp3';
import Db4 from '$lib/audio/Db4.mp3';
import D3 from '$lib/audio/D3.mp3';
import D4 from '$lib/audio/D4.mp3';
import Eb3 from '$lib/audio/Eb3.mp3';
import Eb4 from '$lib/audio/Eb4.mp3';
import E3 from '$lib/audio/E3.mp3';
import E4 from '$lib/audio/E4.mp3';
import F3 from '$lib/audio/F3.mp3';
import F4 from '$lib/audio/F4.mp3';
import Gb3 from '$lib/audio/Gb3.mp3';
import Gb4 from '$lib/audio/Gb4.mp3';
import G3 from '$lib/audio/G3.mp3';
import G4 from '$lib/audio/G4.mp3';
import Ab3 from '$lib/audio/Ab3.mp3';
import Ab4 from '$lib/audio/Ab4.mp3';
import A3 from '$lib/audio/A3.mp3';
import A4 from '$lib/audio/A4.mp3';
import Bb3 from '$lib/audio/Bb3.mp3';
import Bb4 from '$lib/audio/Bb4.mp3';
import B3 from '$lib/audio/B3.mp3';
import B4 from '$lib/audio/B4.mp3';

export const SONG_TO_ACTUAL_SEQ: Record<string, string> = {
	happy_birthday: '0010100010100010000110010',
	twinkle: '001111000000001100000110000000111100000000'
};

// Song - Password conversions
export const SONG_TO_PASS: Record<string, string> = {
	happy_birthday: '001_0_1_0___001_0_1_0___001_0_0_0_0_110_0_1_0',
	twinkle: '0011110_0000000_1100000_1100000_0011110_0000000'
};
// Songname to Notes conversions
export const SONG_TO_NOTES: Record<string, Array<string>> = {
	happy_birthday: [
		A3,
		A3,
		B3,
		'_',
		A3,
		'_',
		D4,
		'_',
		Db4,
		'_',
		'_',
		'_',
		A3,
		A3,
		B3,
		'_',
		A3,
		'_',
		E4,
		'_',
		D4,
		'_',
		'_',
		'_',
		A3,
		A3,
		A4,
		'_',
		Gb4,
		'_',
		D4,
		'_',
		Db4,
		'_',
		B3,
		'_',
		G4,
		G4,
		Gb4,
		'_',
		D4,
		'_',
		E4,
		'_',
		D4
	],
	twinkle: [
		A3,
		A3,
		E4,
		E4,
		Gb4,
		Gb4,
		E4,
		'_',
		D4,
		D4,
		Db4,
		Db4,
		B3,
		B3,
		A3,
		'_',
		E4,
		E4,
		D4,
		D4,
		Db4,
		Db4,
		B3,
		'_',
		E4,
		E4,
		D4,
		D4,
		Db4,
		Db4,
		B3,
		'_',
		A3,
		A3,
		E4,
		E4,
		Gb4,
		Gb4,
		E4,
		'_',
		D4,
		D4,
		Db4,
		Db4,
		B3,
		B3,
		A3
	]
};
