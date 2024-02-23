<script>
	// import {createEventDispatcher } from 'svelte'

	// const dispatch = createEventDispatcher();

	// function startGame(){
	//     dispatch('start',{
	//         text:"Started Game"
	//     })
	// }
</script>

<!-- <h1>Markov Melodies</h1> -->

<buton id="start" on:click>Start Game!</buton>

<style>
	#start {
		background-color: aquamarine;
		min-width: 80vw;
		min-height: 5vh;
		text-align: center;
		font-size: 1.5em;
	}
</style>
