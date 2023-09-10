<script>
    import Game from "./Game.svelte";
    import Bank from "./wordbank";

    let mode = "daily"
    let aw = Bank.split("\n")
    let word = aw[10]

    let componentRefreshTrigger = 0

    function randInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min)
	}

    function getDaily() {
        const msPerDay = 24 * 60 * 60 * 1000
        const today = new Date()
        const referenceDate = new Date("2023-09-09")
        const deltaDays = Math.floor((today - referenceDate) / msPerDay)
        return aw[deltaDays % aw.length]
    }

    $: {
        if (mode == "daily") {
            word = getDaily()
            console.log("daily:" + word)
        } else if (mode == "unlimited") {
            word = aw[randInt(0, aw.length)]
            console.log("random: " + word)
        }
    }
</script>

{#key mode, componentRefreshTrigger}
    <Game word={word} bind:mode={mode} bind:componentRefreshTrigger={componentRefreshTrigger}/>
{/key}