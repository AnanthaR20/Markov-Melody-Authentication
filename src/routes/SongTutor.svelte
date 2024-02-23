<script lang="ts">
	import { SONG_TO_PASS, SONG_TO_NOTES } from './song_dictionary';
	import { binaryToDUArray } from './utils';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// Component Properties
	export let song = 'happy_birthday';
	export let playingSong = false;
	export let tempo = 200; // milliseconds per step along the song

	let isActive = false;
	let song_pass = SONG_TO_PASS[song];
	let song_notes = SONG_TO_NOTES[song];
	let currentNoteIndex = -1;
	// let currentlyPlayingNote = false;

	// Button Paramters
	const BUTTON_COLOR = 'gold';
	// const BUTTON_COLOR_MOUSEDOWN = 'black';
	const BUTTON_WIDTH = 45;
	const BUTTON_HEIGHT = 45;
	// function forwardDU(v: number) {
	// 	dispatch('DU', {
	// 		value: v
	// 	});
	// }
	function forwardAction(v: string) {
		if (isActive) {
			return;
		}
		dispatch('replay_enter', {
			value: v
		});
		isActive = true;
	}

	// Audio
	function playSong(song: Array<string>, i: number) {
		if (song.length === 0) {
			currentNoteIndex = -1;
			isActive = false;
			return;
		} else {
			currentNoteIndex = i;
			console.log(currentNoteIndex); //////////////////////////////////////////
			if (song[0] !== '_') {
				const a = new Audio(song[0]);
				a.play();
			}
			setTimeout(() => {
				playSong(song.slice(1, song.length), i + 1);
			}, tempo);
		}
	}
	$: if (playingSong) {
		playSong(song_notes, 0);
		playingSong = false;
	}

	function get_seq_style(i: number): string {
		if (i === currentNoteIndex) {
			return 'color:red;font-weight:bold;text-decoration:underline';
		}
		return '';
	}
</script>

<section>
	{#key currentNoteIndex}
		{#each binaryToDUArray(song_pass) as note, i}
			{#if note !== '_'}
				<!-- {#if currentNoteIndex === i } -->
				<div style="display:inline;{get_seq_style(i)}">{note}</div>
				<!-- {/if} -->
				<!-- <div style="display:inline;">{note}</div><br> -->
			{:else}
				{(console.log('-'), '')}
			{/if}
		{/each}
	{/key}
	<br /><br />
	<div id="buttons">
		<button
			id="Down"
			class="roads"
			style="background-color:{BUTTON_COLOR};font-size: 2em;
            min-width: {BUTTON_WIDTH}vw;
            min-height: {BUTTON_HEIGHT}vh;"
			on:click={() => {
				console.log('D');
			}}
		>
			D
		</button>
		<button
			id="Up"
			class="roads"
			style="background-color:{BUTTON_COLOR};font-size: 2em;
            min-width:{BUTTON_WIDTH}vw;
            min-height: {BUTTON_HEIGHT}vh;"
			on:click={() => {
				console.log('U');
			}}
		>
			U
		</button>
	</div>

	<br />

	<div id="submit">
		<button class="clr_ent" on:click={() => forwardAction('clear')}>Play Audio</button>
		<button class="clr_ent" style="background-color:white; border: none">&#160;</button>
		<button class="clr_ent" on:click={() => forwardAction('enter')}>Enter</button>
	</div>
</section>

<style>
	#buttons {
		display: flex;
		flex-direction: row;
		gap: 0px;
		align-items: center;
	}
	#submit {
		display: flex;
		flex-direction: row;
		gap: 0px;
		align-items: center;
	}
	.clr_ent {
		min-width: 30vw;
		min-height: 10vh;
		font-size: 1em;
	}
</style>
