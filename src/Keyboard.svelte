<script>
    export let markupMode = false;
    export let selectedColor = "black"
    let keys = [
        "qwertyuiop",
        "asdfghjkl",
        "←zxcvbnm→"
    ]

    function keyClick(key){
        if(key == "←"){
            key = "Backspace"
        }
        if(key == "→"){
            key = "Enter"
        }
        if(markupMode){
            if(key == "Enter" || key == "Backspace"){
                return
            }
            if(selectedColor == keycolors[key]){
                keycolors[key] = ""
            } else{
                keycolors[key] = selectedColor
            }
            return
        }
        for(let fn of window["keypress"]){
            fn({key: key})
        }
    }

    let keycolors = {}
    function updateKeyboard(colors){
        // console.log(keycolors)
        for(let i of Object.keys(colors)){
            for(let j of colors[i]){
                keycolors[j] = i
            }
        }
        keycolors = keycolors
    }

    window["updateKeyboard"] = updateKeyboard
</script>

<main>
    <br>
    {#each keys as key}
        <div class="row">
            {#each key as letter}
                <button class="{keycolors[letter]}" on:click={()=>{keyClick(letter)}}>{letter}</button>
            {/each}
        </div>
    {/each}
</main>

<style>
    .row{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .row button{
        margin-left: 2px;
        margin-right: 2px;
        width: 35px;
        height: 35px;
        text-transform: uppercase;
    }
    main{
        margin-bottom: 50px;
    }
    @media only screen and (max-width: 600px), (max-height: 600px){
        .row button{
            width: 32px;
            height: 32px;
        }
    }

    .greenorblack{
	    background-image: url("images/unknown.png"), linear-gradient(#e9e9e9c7, #e9e9e9c7);
        background-size: cover;
        color: black;
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