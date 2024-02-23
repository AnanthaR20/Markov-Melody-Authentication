<script lang="ts">
	import { SONG_TO_PASS, SONG_TO_NOTES } from './song_dictionary';
	// import { binaryToDUArray } from './utils';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// Component Properties
	export let song = 'happy_birthday';
	let user_entered_password = '';
	// export let playingSong = false;
	// export let tempo = 200; // milliseconds per step along the song

	// let isActive = false;
	// let song_pass = SONG_TO_PASS[song];
	// let song_notes = SONG_TO_NOTES[song];
	// let currentNoteIndex = -1;
	let show_input_confirmation = false;
	let show_clear_confirmation = false;
	// let currentlyPlayingNote = false;

	// Button Paramters
	const BUTTON_COLOR = 'gold';
	// const BUTTON_COLOR_MOUSEDOWN = 'black';
	const BUTTON_WIDTH = 45;
	const BUTTON_HEIGHT = 45;
	function handleDU(v: string) {
		user_entered_password = user_entered_password.concat(v);
		show_input_confirmation = true;
		setTimeout(() => {
			show_input_confirmation = false;
		}, 200);
		console.log(user_entered_password);
	}
	function handleAction(b: string, pass: string) {
		if (b === 'clear') {
			user_entered_password = '';
			show_clear_confirmation = true;
			setTimeout(() => {
				show_clear_confirmation = false;
			}, 1200);
		} else {
			dispatch('clr_ent', {
				button: b,
				password: pass
			});
		}
	}
	// function forwardDU(v:number){
	//     dispatch('DU',{
	//         value:v
	//     })
	// }
	// function forwardAction(v:string){
	//     if(isActive){
	//         return
	//     }
	//     dispatch('clr_ent',{
	//         value:v
	//     })
	//     isActive = true;
	// }

	// // Audio
	// function playSong(song:Array<string>,i:number){
	//     if(song.length === 0){
	//         currentNoteIndex = -1;
	//         isActive = false;
	//         return
	//     } else {
	//         currentNoteIndex = i
	//         console.log(currentNoteIndex); //////////////////////////////////////////
	//         if(song[0] !== "_"){
	//             const a = new Audio(song[0]);
	//             a.play()
	//         }
	//         setTimeout(()=>{
	//             playSong(song.slice(1,song.length),i+1)
	//         },tempo);
	//     }
	// }
	// $: if(playingSong){
	//     playSong(song_notes,0);
	//     playingSong = false;
	//     }

	// function get_seq_style(i: number) : string {
	//     if(i === currentNoteIndex) {
	//         return 'color:red;font-weight:bold;text-decoration:underline';
	//     }
	//     return '';
	// }
</script>

<section>
	<div id="buttons">
		<button
			id="Down"
			class="roads"
			style="background-color:{BUTTON_COLOR}; font-size: 2em;
            min-width: {BUTTON_WIDTH}vw;
            min-height: {BUTTON_HEIGHT}vh;"
			on:click={() => handleDU('0')}
		>
			D
		</button>
		<button
			id="Up"
			class="roads"
			style="background-color:{BUTTON_COLOR}; font-size: 2em;
            min-width:{BUTTON_WIDTH}vw;
            min-height: {BUTTON_HEIGHT}vh;"
			on:click={() => handleDU('1')}
		>
			U
		</button>
	</div>

	<br />

	<div id="submit">
		<button class="clr_ent" on:click={() => handleAction('clear', '')}>Clear</button>
		<button class="clr_ent" style="background-color:white; border: none">
			{#if show_input_confirmation}
				<p style="font-size:1.3em">+</p>
			{/if}
			{#if show_clear_confirmation}Input Cleared{/if}</button
		>
		<button class="clr_ent" on:click={() => handleAction('enter', user_entered_password)}
			>Enter</button
		>
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
		min-height: 12vh;
		font-size: 1em;
	}
</style>
