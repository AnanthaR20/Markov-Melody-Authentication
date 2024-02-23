<script lang='ts'>
	import StartGame from "./StartGame.svelte";
	import SongTutor from "./SongTutor.svelte";
	import SongEntry from "./SongEntry.svelte";
	import banner from "$lib/images/Banners_Markov_Melodies.png"

	// Initial Game State Values
	let showStartPage = true;
	let showSelectPage = false;
	let showTutPage = false;
	let showSongEntryPage = false;
	const tempo = 200;
	let playingSong = false;
	let userEnteredPass = "";

	// Staging Functions
	function stageStartPage(){
		showStartPage = true;
		showSelectPage = false;
		showTutPage = false;
		showSongEntryPage = false;
	}
	function stageSelectPage(){
		showStartPage = false;
		showSelectPage = true;
		showTutPage = false;
		showSongEntryPage = false;
	}
	function stageTutPage(){
		showStartPage = false;
		showSelectPage = false;
		showTutPage = true;
		showSongEntryPage = false;
	}
	function stageSongEntryPage(){
		showStartPage = false;
		showSelectPage = false;
		showTutPage = false;
		showSongEntryPage = true;
	}

	// LR Handler
	function handleDU(event:CustomEvent){
		let value = event.detail.value;
		userEnteredPass = userEnteredPass.concat(String(value))
		// const a = new Audio(B3);
		// a.play();
		console.log(userEnteredPass)
	}
	function handleClrEnt(event:CustomEvent){
		let button_pressed = event.detail.button;
		let entered_password = event.detail.password;
		if ( button_pressed === "clear"){
			console.log("nothing dispatched. message should not appear")
		} else if (button_pressed === "enter") {
			userEnteredPass = entered_password;
			console.log("logged pword: "+userEnteredPass)
		} else {
			console.log("this message shouldn't appear")
		}

	}
	function handleReplayEnter(event:CustomEvent){
		let button_pressed = event.detail.value;
		// let pass_entered = event.detail.pass
		if (button_pressed === 'enter'){
			stageSongEntryPage();
		} else if (button_pressed === 'clear') {
			playSongOnce()
		} else {
			console.log("not possible")
			console.log(showTutPage)
		}
	}

	// Audio
	function playSongOnce(){
		playingSong = true;
	}
	

</script>

<svelte:head>
	<title>Markov Melodies</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if showStartPage}
	<img src={banner} alt="Markov Melodies" width="100%" height="30%" />
		<br />
	<StartGame on:click={()=> stageSelectPage()}/>
	{:else if showSelectPage}
		<h1>Select a song!</h1>
		<h2>We highly recommended you play using the "Happy Birthday" password first.</h2>

		<ol>
			<li>Happy Birthday</li>
			<li>Twinkle Twinkle Little Star</li>
		</ol>

		<button on:click={() => stageTutPage()}>next page</button>
	
	{:else if showTutPage}
		<h1>Hit 'Enter' to Play Audio</h1>
		<SongTutor on:DU = {handleDU} on:replay_enter = {handleReplayEnter} song="happy_birthday" bind:playingSong />
		<h2>In this round observe how the melody is input. You will hear the song you chose. Above the key pad you'll see the correct sequence. The keys will also be highlighted as they are played.  </h2>
	
		{:else if showSongEntryPage}
		<h1>Now it's your turn! </h1>
		<SongEntry song="happy_birthday" on:DU = {handleDU} on:clr_ent = {handleClrEnt}/>
		<h2>Try and input the Song. You will not see anything show up as you type. If you need to start over, tap 'clear'.</h2>
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
