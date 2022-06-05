<script>
    // import word-stream
    // import random-word
    import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher();
	import Allwords from './words.js'


    export let correct
    export let state
    export let numhints
    export let finished = false
    let word = ""
    let color = "waiting,".repeat(correct.length).split(",")

    function getColor(i){
        for(let j of usedHints){
            if(j.index == i && j.char == word[i]){
                return color[i]
            }
        }
        if(state == "correct"){
            return "green"
        }
        if(i == word.length && state != "waiting"){
            return "cursor"
        }
        if(color[i] == "green" || color[i] == "black"){
            return "greenorblack"
        }
        if(color[i] == "yellow"){
            let cindex = 0
            for(let j=0; j<correct.length; j++){
                if(correct[j] == word[i]){
                    cindex = j
                }
            }
            if(i < cindex){
                return "somewhere-right"
            } 
            if(i > cindex){
                return "somewhere-left"
            }
        }
        return color[i]
    }

    function getChar(i){
        if(i < word.length){
            return word[i]
        }
        return " "
    }

    function countChar(wd, char){
        return wd.split(char).length - 1
    }

    async function check(){
        for(let i = 0; i < word.length; i++){
            if(word[i] == correct[i]){
                color[i] = "green"
            } else if(correct.includes(word[i])){
                color[i] = "yellow"
            } else{
                color[i] = "black"
            }
        }        
        updateKeyboardColors()
        window["keycolor"].push(color)
        state = (word == correct) ? "correct" : "incorrect"
        setTimeout(() => {
            dispatch('message', {state: state})
        }, 100)
    }

    function updateKeyboardColors(){
        let reformatedColors = {"black": [], "yellow": [], "green": [], "greenorblack": [], "somewhere-right": [], "somewhere-left": []}
        for(let i = 0; i < word.length; i++){
            reformatedColors[getColor(i)].push(word[i])
        }
        window["updateKeyboard"](reformatedColors)
    }

    function keypress(event){
        if(state == "typing" && word.length <= correct.length){
            if(event.key == "Enter" && word.length == correct.length){
                if(Allwords.split("\n").includes(word)){
                    check()
                    return
                }
                dispatch("message", {message: word + " is not a word!"})
            }
            if(event.key == "Backspace"){
                word = word.substring(0, word.length - 1)
            } else if(event.key.length == 1 && word.length < correct.length){
                word += event.key.toLowerCase()
            }
        }
    }

    window["keypress"].push(keypress)

    export let usedHints = []
    function revealHint(i){
        for(let j of usedHints){
            if(j.index == i && j.char == word[i]){
                return
            }
        }
        if(numhints <= 0 && !finished){
            dispatch("message", {message: "You have no more hints!"})
            return
        }
        if(getColor(i) == "greenorblack"){
            usedHints.push({index: i, char: word[i]})
            usedHints = usedHints
            if(!finished && word[i] != correct[i]){
                numhints--
                numhints = numhints
                for(let j=0; j<correct.length; j++){
                    usedHints.push({index: j, char: word[i]})
                }
                usedHints = usedHints
            }
        }

        updateKeyboardColors()
    }
</script>

<svelte:window on:keydown={keypress}/>
<tr>
    {#each {length: correct.length} as _, i}
        <th 
            class="{getColor(i, word, state, usedHints)}"
            on:click={()=>{revealHint(i)}}
        >
            {getChar(i, word)}
        </th>
    {/each}
</tr>

<style>
    th{
        width: 75px;
        height: 75px;
        font-size: xx-large;
        color: white;
        text-transform: uppercase;
    }

	@media only screen and (max-height: 800px){
        th{
            width: 60px;
            height: 60px;
            font-size: x-large;
        }
    }

    @media only screen and (max-width: 600px), (max-height: 700px){
        th{
            width: 50px;
            height: 50px;
            font-size: x-large;
        }
    }

    .greenorblack{
	    background-image: url("images/unknown.png"), linear-gradient(#e9e9e9c7, #e9e9e9c7);
        background-size: cover;
        color: black;
    }
    .greenorblack:hover{
        background-image: url("images/unknown.png"), linear-gradient(#5e5e5e, #5e5e5e);
        background-size: cover;
        color: white;
        cursor: pointer;
    }

    .somewhere-left{
        background-image: url("images/left-trig.png"), linear-gradient(#ffffff, #ffffff);
        background-size: cover;
        color: black;
    }

    .somewhere-right{
        background-image: url("images/right-trig.png"), linear-gradient(#ffffff, #ffffff);
        background-size: cover;
        color: black
    }
</style>
