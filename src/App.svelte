<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import WordGrid from './WordGrid'
	import Keyboard from './Keyboard.svelte'
	import Allwords from './words.js'
	import Bank from './wordbank.js'
	// import AlanAI from './AlanAI.svelte'


	let word = ""
	let state = 0
	let tries = word.length
	let results = []
	let numHints = 5
	let usedHints = []
	let finished = false
	let shareResultsContent = "Dirdle "

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
		console.log(event.detail.key)
		return {key: event.detail.key}
	}

	function buildResultContent(){
		finished = true
		let score = (state == "win") ? (window["keycolor"].length) : "X"
		shareResultsContent += score + "/6 \n"
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

	function randInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min)
	}

	onMount(() => {
		if(word == ""){
			let aw = Bank.split("\n")
			word = aw[randInt(0, aw.length)]
			console.log(word)
			tries = word.length + 2
			state = 0
			results = []
		}
	})

	let markupMode = false
	let selectedColor = "black"
	let selectableColors = ["black", "green", "orange"]
	function toggleMarkupMode(){
		markupMode = !markupMode
	}

	let practiceMode = false
	function togglePracticeMode(){
		practiceMode = !practiceMode
	}
</script>

<div class="message">
	<h1>dirdle</h1> 
	{#if message != ""}
		<strong transition:scale>{message}</strong>
	{/if}
	{#if state == "win"}
		<div transition:scale>
			<strong>You won!</strong>
			<button on:click={copyResults}>{shareBtnContent}</button>
			<button on:click={()=>{window.location.reload()}}>New Game</button>
		</div>
	{/if}

	{#if state == "lose"}
		<div transition:scale>
			<strong>You lost!</strong>
			<p>The word was {word}.</p>
			<button transition:scale on:click={copyResults}>{shareBtnContent}</button>
			<button on:click={()=>{window.location.reload()}}>New Game</button>
		</div>
	{/if}

	<div class="right">
		<strong>{numHints}/5 hints remaining</strong>
	</div>
</div>

<div class="under">
	<a href="#4">Github</a>
	<a href="#3">Original</a>
	<div class="right">
		<small>To use a hint, click a [?]</small>
	</div>
</div>

<div class="bottom" style="left: 10px;">
	{#if markupMode}
		<div>
			{#each selectableColors as scl}
				<button on:click={()=>{selectedColor = scl}}
					style={'color:' + scl + '; font-size:' + ((selectedColor == scl) ? 'x-large' : 'medium')}>⬤</button>
			{/each}
		</div>
	{/if}
	<button style="{
		(!markupMode) ? 'background-color:white; font-weight:bolder' : ''
		}"
	on:click={toggleMarkupMode}>Type</button>
	<button style="{
		(markupMode) ? 'background-color:white; font-weight:bolder' : ''
		}"
	on:click={toggleMarkupMode}>Mark</button>
</div>
<!-- 
<div class="bottom right" style="right: 10px">
	<button style="{
		(!practiceMode) ? 'background-color:white; font-weight:bolder' : ''
		}"
	on:click={togglePracticeMode}>Daily</button>
	<button style="{
		(practiceMode) ? 'background-color:white; font-weight:bolder' : ''
		}; margin-right: 4px"
	on:click={togglePracticeMode}>Practice</button>
</div> -->

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
