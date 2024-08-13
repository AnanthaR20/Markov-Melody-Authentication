<script lang="ts">
	import StartGame from './StartGame.svelte';
	import SongTutor from './SongTutor.svelte';
	import SongEntry from './SongEntry.svelte';
	import type { CreateInstanceResponse, UpdateInstanceResponse, GetPointsResponse } from './logic';
	import { binaryToDUArray } from './utils';
	import { SONG_TO_ACTUAL_SEQ } from './song_dictionary';
	import { markov_authenticate } from './markov';
	import banner from '$lib/images/Banners_Markov_Melodies.png';

	// Initial Game State Values
	let showStartPage = true;
	let showSelectPage = false;
	let showTutPage = false;
	let showSongEntryPage = false;
	let showEndPage = false;
	let song = 'happy_birthday';
	let tempo = 400;
	let playingSong = false;
	let userEnteredPass = '';

	// vars for backend integration
	let show_pin = false;

	// Staging Functions
	function stageStartPage() {
		showStartPage = true;
		showSelectPage = false;
		showTutPage = false;
		showSongEntryPage = false;
		showEndPage = false;
	}
	function stageSelectPage() {
		showStartPage = false;
		showSelectPage = true;
		showTutPage = false;
		showSongEntryPage = false;
		showEndPage = false;
	}
	function stageTutPage() {
		showStartPage = false;
		showSelectPage = false;
		showTutPage = true;
		showSongEntryPage = false;
		showEndPage = false;
	}
	function stageSongEntryPage() {
		showStartPage = false;
		showSelectPage = false;
		showTutPage = false;
		showSongEntryPage = true;
		showEndPage = false;
	}
	function stageEndPage() {
		showStartPage = false;
		showSelectPage = false;
		showTutPage = false;
		showSongEntryPage = false;
		showEndPage = true;
	}

	// Custom Event Handlers
	function handleDU(event: CustomEvent) {
		let value = event.detail.value;
		userEnteredPass = userEnteredPass.concat(String(value));
		// const a = new Audio(B3);
		// a.play();
		console.log(userEnteredPass);
	}
	function handleClrEnt(event: CustomEvent) {
		let button_pressed = event.detail.button;
		let entered_password = event.detail.password;
		if (button_pressed === 'clear') {
			console.log('nothing dispatched. message should not appear');
		} else if (button_pressed === 'enter') {
			userEnteredPass = entered_password;
			finish_transition();
			// stageEndPage();
			// console.log("logged pword: "+userEnteredPass)
		} else {
			console.log("this message shouldn't appear");
		}
	}
	function handleReplayEnter(event: CustomEvent) {
		let button_pressed = event.detail.value;
		// let pass_entered = event.detail.pass
		if (button_pressed === 'enter') {
			stageSongEntryPage();
		} else if (button_pressed === 'clear') {
			playSongOnce();
		} else {
			console.log('not possible');
			console.log(showTutPage);
		}
	}
	function setSong(s: string) {
		song = s;
	}
	// Audio
	function playSongOnce() {
		// very important function. without it we can't play audio as it's played
		playingSong = true;
	}

	// Integration with Backend
	let uid: string = '';
	let uid_valid: boolean = false;
	$: uid_valid = check_uid_valid(uid);
	let iid: number = -1;
	let actual_pin: string = '';
	const USER_ID_LENGTH = 3;

	function reset() {
		// showStartPage = true;
		// showSelectPage = false;
		// showTutPage = false;
		// showSongEntryPage = false;
		// showEndPage = false;
		stageStartPage();
		song = 'happy_birthday';
		tempo = 400;
		playingSong = false;
		userEnteredPass = '';

		show_pin = false;
		uid_valid = false;
		iid = -1;
		actual_pin = '';
		const temp = uid;
		uid = '';
		uid = temp;
	}

	async function get_points(): Promise<GetPointsResponse> {
		const url = `https://142.93.219.243.nip.io/points/${uid.toLowerCase()}`;
		const request = new Request(url, { method: 'GET' });
		const data = await fetch(request);
		return <GetPointsResponse>(<unknown>data.json());
	}

	function normalize() {
		uid = uid;
	}

	function set_actual_pin(val: string) {
		actual_pin = val;
	}

	function isAlphaNumeric(str: string): boolean {
		let code, i, len;
		for (i = 0, len = str.length; i < len; i++) {
			code = str.charCodeAt(i);
			if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123)) {
				return false;
			}
		}
		return true;
	}

	function check_uid_valid(uid_cand: string): boolean {
		return uid_cand.length === USER_ID_LENGTH && isAlphaNumeric(uid_cand);
	}

	function progress_transition() {
		// if (!uid_valid) return;
		// const url = 'https://142.93.219.243.nip.io/create_instance';
		// const data = {
		// 	game_id: 'MM',
		// 	user_id: uid.toLowerCase()
		// };
		// const request = new Request(url, {
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// 	headers: new Headers({
		// 		'Content-Type': 'application/json; charset=UTF-8'
		// 	})
		// });
		// fetch(request).then((create_instance_value_temp) => {
		// 	create_instance_value_temp.json().then((temp) => {
		// 		const create_instance_value = <CreateInstanceResponse>(<unknown>temp);
		// 		iid = create_instance_value.iid;
		// 		stageSelectPage();
		// 	});
		// });
		stageSelectPage()
	}

	function finish_transition() {
		// const url = 'https://142.93.219.243.nip.io/update_instance';
		// const data = {
		// 	iid_value: iid,
		// 	result_pin: markov_authenticate(SONG_TO_ACTUAL_SEQ[song], userEnteredPass) ? actual_pin : '' // work around for markov melodies
		// 	// result_pin: userEnteredPIN
		// };
		// const request = new Request(url, {
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// 	headers: new Headers({
		// 		'Content-Type': 'application/json; charset=UTF-8'
		// 	})
		// });
		// fetch(request).then((instance_response_value_temp) => {
		// 	instance_response_value_temp.json().then((temp) => {
		// 		const instance_response_value = <UpdateInstanceResponse>(<unknown>temp);
		// 		if (iid !== instance_response_value.iid) {
		// 			alert('Reached invalid state, please report bug!');
		// 		}
		// 		stageEndPage();
		// 	});
		// });
		stageEndPage();
	}
</script>

<svelte:head>
	<title>Markov Melodies</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if showStartPage}
		<img src={banner} alt="Markov Melodies" width="100%" height="30%" />
		<br>
		<!-- <input
			type="text"
			placeholder="User ID"
			bind:value={uid}
			on:change={normalize}
			maxlength={USER_ID_LENGTH}
			name="userid"
			id="userid"
		/>
		{#if uid_valid}
			{#await get_points()}
				<p>Validating User ID...</p>
			{:then get_points_value}
				{#if get_points_value.uid !== null}
					{(set_actual_pin(get_points_value.actual_pin), '')}
					<p style="color: green">Points: {get_points_value.points}</p>
				{:else}
					<p style="color: red">Invalid User ID!</p>
				{/if}
			{:catch error}
				{(console.log(error), '')}
				<p style="color: purple">Network Error: Unable to check validity of User ID!</p>
			{/await}
		{/if}
		<br />
		<button on:click={progress_transition}>Start Game</button> -->
		<StartGame on:click={progress_transition}/>
	{:else if showSelectPage}
		<h1>Select a song password to learn!</h1>
		<h2>
			If this is your first time, we recommended starting with "Happy Birthday". Tap to choose!
		</h2>
		<ol style="font-size:1.5em">
			<li
				style="background-color:blue"
				on:click={() => {
					setSong('happy_birthday');
					stageTutPage();
				}}
			>
				<div>Happy Birthday</div>
			</li>
			<li
				style="background-color:brown"
				on:click={() => {
					setSong('twinkle');
					stageTutPage();
				}}
			>
				<div>Twinkle Twinkle Little Star</div>
			</li>
		</ol>
	{:else if showTutPage}
		<h2 style="font-size:1.2em">
			<strong
				>{song === 'happy_birthday' ? "'Happy Birthday'" : "'Twinkle Twinkle Little Star'"}</strong
			> | Tutorial
		</h2>
		<SongTutor
			on:DU={handleDU}
			on:replay_enter={handleReplayEnter}
			{song}
			{tempo}
			bind:playingSong
		/>
		<h2 style="font-size:1em;text-align:center">
			The sequence at the top of the screen <strong>represents the melody</strong>! When the pitch goes higher, tap "U" for up and when it goes lower tap "D" for down.
			<br />
			<strong>"Play Audio"</strong> & <strong>tap along with the song</strong> to practice! If there are audio issues, play audio again. 
			<br/>
			<strong>When you feel ready</strong> for the test, <strong>hit 'enter'</strong>.
		</h2>
	{:else if showSongEntryPage}
		<h2 style="font-size:1.2em">
			<strong
				>{song === 'happy_birthday' ? "'Happy Birthday'" : "'Twinkle Twinkle Little Star'"}</strong
			> | Test
		</h2>
		<SongEntry song="happy_birthday" on:DU={handleDU} on:clr_ent={handleClrEnt} />
		<h2 style="font-size:1em;text-align:center">
			Try and input the song-ified password. Don't worry, it doesn't need to be perfect.
			<strong>Our system allows you to make a few mistakes.</strong>
			<br />
			<br />
			You'll see confirmation of your taps just below the keyboard as you type. If you need to start
			over, tap 'clear'.
		</h2>
	{:else if showEndPage}
		<img src={banner} alt="Markov Melodies" width="100%" height="30%" />
		<br />
		<!-- {#if actual_pin === userEnteredPIN} -->
		{#if markov_authenticate(SONG_TO_ACTUAL_SEQ[song], userEnteredPass)}
			<!-- <p style="color: green">Congratulations on entering the correct PIN!</p> -->
			<p style="color: green">Congratulations on entering the sequence correctly!</p>
		{:else}
			<p style="color: red">Incorrect sequence entered, no points earned!</p>
		{/if}
		<br />
		{#if show_pin}
			<div style="word-wrap:normal">
				<p style="">Entered Sequence: {binaryToDUArray(userEnteredPass)}</p>
			</div>
		{/if}
		<br />
		<!-- {#await get_points()}
			<p>Fetching points...</p>
		{:then get_points_value}
			{#if get_points_value.uid !== null}
				<p style="color: green">Points: {get_points_value.points}</p>
			{:else}
				<p style="color: red">Invalid User ID!</p>
			{/if}
		{:catch error}
			{(console.log(error), '')}
			<p style="color: purple">Network Error: Unable to fetch points!</p>
		{/await} -->
		<br />
		<button on:click={() => (show_pin = !show_pin)}>Toggle Visibility of Entered Sequence</button>
		<br/>
		<button on:click={reset}>Play Again</button>
		<br />
		<!-- <button><a href="https://142.93.219.243.nip.io/">Checkout Other Games</a></button> -->
		<!-- <p>{markov_authenticate(SONG_TO_ACTUAL_SEQ[song],userEnteredPass)}</p> -->
	{:else}
		<p>shouldn't show up</p>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
