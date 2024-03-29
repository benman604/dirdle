<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import WordGrid from './WordGrid'
	import Keyboard from './Keyboard.svelte'
	import Popover from './Popover.svelte'
	
	export let word = ""
	export let mode = "daily"
	export let componentRefreshTrigger = 0
	let state = 0
	let tries = 6
	let results = []
	let numHints = 5
	let usedHints = []
	let finished = false
	let shareResultsContent = "dirdle " + new Date().toJSON().slice(0, 10) + "\n"

	if (mode == "unlimited") {
		shareResultsContent = "dirdle unlimited " + word.toUpperCase() + "\n"
	}

	window["keypress"] = []
	window["keycolor"] = []

	let message = ""
	function handleMessage(event){
		if(event.detail.message != undefined){
			message = event.detail.message
			setTimeout(() => {
				message = ""
			}, 1000)
		} else{
			let x = event.detail.state
			results.push(x)
			if(x == "correct"){
				state = "win"
				buildResultContent()
			} 
			else if(x == "incorrect"){
				if(state + 1 >= tries){
					state = "lose"
					buildResultContent()
				}
				else{
					state++
				}
			}
		}
	}

	function handleKeyclick(event){
		// console.log(event.detail.key)
		return {key: event.detail.key}
	}

	function buildResultContent(){
		finished = true
		let score = (state == "win") ? (window["keycolor"].length) : "X"
		shareResultsContent += `${score}/7 (${5-numHints}/5 hints used) \n`
		for(let row of window["keycolor"]){
			for(let color of row){
				if(color == "black"){
					shareResultsContent += "⬛"
				}
				if(color == "green"){
					shareResultsContent += "🟩"
				}
				if(color == "yellow"){
					shareResultsContent += "🟨"
				}
			}
			shareResultsContent += "\n"
		}

		shareResultsContent += "https://dirdle.vercel.app/"
	}

	let shareBtnContent = "Share"
	function copyResults(){
		navigator.clipboard.writeText(shareResultsContent).then(function() {
			shareBtnContent = ('Copied results');
		}, function(err) {
			shareBtnContent = ('Could not copy text: ', err);
		});

		setTimeout(() => {
			shareBtnContent = "Share"
		}, 2000);
	}

	function getState(i){
		if(i == state){
			return "typing"
		}
		if(i > state){
			return "waiting"
		}
		return results[i]
	}

	onMount(() => {
		console.log(word)
	})

	let markupMode = false
	let selectedColor = "black"
	let selectableColors = ["black", "green", "orange"]
	function toggleMarkupMode(){
		markupMode = !markupMode
	}

	function toggleMode() {
		mode = (mode == "daily") ? "unlimited" : "daily"
	}

	let practiceMode = false
	function togglePracticeMode(){
		practiceMode = !practiceMode
	}

	let showInfo = true
	if(window.localStorage.getItem("first") === null){
		window.localStorage.setItem("first", "true")
	} else{
		showInfo = false
	}

	function newGame() {
		componentRefreshTrigger++
		mode = "daily"
		mode = "unlimited"
	}
</script>


<Popover bind:state={showInfo}>
	<p>Welcome to dirdle, a directional word guessing game based on Wordle.</p>
	<ul>
		<li>If a letter has a grey [?], you know it's either in the correct place or is not in the word at all.</li>
		<ul>
			<li>Click a [?] to reveal a hint. If that letter turns green, it's in the right place. If it turns black, it's not in the word at all.</li>
			<li>You can reveal up to 5 hints that turn black.</li>
		</ul>
		<li>If a letter has a yellow arrow, it exists somewhere in the word in that respective direction.</li>
	</ul>
</Popover>

<div class="message">
	<h1>dirdle</h1> 
	<div class="right">
		<strong>{numHints}/5 hints remaining</strong>
	</div>
</div>

<Popover state={message != "" || state == "win" || state == "lose"} closeButton={state == "win" || state == "lose"}>
	<!-- <div class="message"> -->
		{#if message != ""}
			<strong transition:scale>{message}</strong>
		{/if}
		{#if state == "win"}
			<div transition:scale>
				<strong>You won!</strong> <br> <br>
				<button on:click={copyResults}>{shareBtnContent}</button> 
				<button on:click={newGame}>New Game</button>
			</div>
		{/if}

		{#if state == "lose"}
			<div transition:scale>
				<strong>You lost!</strong>
				<p>The word was {word}.</p>
				<button transition:scale on:click={copyResults}>{shareBtnContent}</button>
				<button on:click={newGame}>New Game</button>
			</div>
		{/if}
	<!-- </div> -->
</Popover>

<div class="under">
	<a href="https://github.com/benman604/dirdle">Github</a>
	<a href="#3" id="helpbtn" on:click={()=>{showInfo = true}}>Help</a>
	<div class="right">
		<small>To use a hint, click a [?]</small>
	</div>
</div>

<div class="bottom" style="left: 10px;">
	<!-- {#if markupMode}
		<div>
			{#each selectableColors as scl}
				<button on:click={()=>{selectedColor = scl}}
					style={'color:' + scl + '; font-size:' + ((selectedColor == scl) ? 'x-large' : 'medium')}>⬤</button>
			{/each}
		</div>
	{/if} -->
	<!-- <button style="{
		(!markupMode) ? 'background-color:white; font-weight:bolder' : ''
		}"
	on:click={toggleMarkupMode}>Type</button>
	<button style="{
		(markupMode) ? 'background-color:white; font-weight:bolder' : ''
		}"
	on:click={toggleMarkupMode}>Mark</button> -->


	<button style="{
			(mode == "unlimited") ? 'background-color:white; font-weight:bolder' : ''
		}"
		on:click={toggleMode}>Unlimited
	</button>
	<button style="{
			(mode == "daily") ? 'background-color:white; font-weight:bolder' : ''
		}"
		on:click={toggleMode}>Daily
	</button>
</div>

<main>
	<br>
	<table>
		{#each {length: tries} as _, i}
			<WordGrid state={getState(i, state)} correct={word} bind:numhints={numHints} bind:usedHints={usedHints} bind:finished={finished} on:message={handleMessage}/>
		{/each}
	</table>

	<Keyboard on:keyclick={handleKeyclick} bind:markupMode={markupMode} bind:selectedColor={selectedColor}/>
	<!-- <AlanAI on:message={handleMessage} correct={word} bind:state={state}/> -->
</main>

<style>
	main{
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.message *, .under *{
		margin-right: 10px;
		margin-left: 10px;
		display: inline;
	}
	.message{
		width: 100%;
	}

	.bottom{
		bottom:5px; 
		position:absolute;
	}

	@media only screen and (max-width: 600px), (max-height: 800px){
		table{
			margin-left: auto;
			margin-right: auto;
		}
		h1{
			font-size: x-large;
		}
		main{
			margin-top: 50px;
		}
	}

	@media only screen and (max-height: 600px){
		h1 {
			font-size: large;
		}
    }
</style>
