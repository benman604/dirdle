<script>
    import { scale } from 'svelte/transition'
    export let state = false
    export let closeButton = true

    function toggleState(){
        state = !state
    }

    window.addEventListener('click', function(e){   
        try {
            if (!document.getElementById('content').contains(e.target) && e.target.id != 'helpbtn') {
                state = false
            }
        } catch (error) {}
    });
</script>

{#if state}
    <main transition:scale>
        <div class="content" id="content">
            {#if closeButton}
                <a class="right" href="#/" role="button" on:click|preventDefault={toggleState}>Close</a>
            {/if}
            <slot></slot>
        </div>
    </main>
{/if}

<style>
    main {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .content {
        background-color: #ffffff;
        margin: 15% auto;
        padding: 20px;
        padding-top: 10px;
        width: 80%;
        min-width: 200px;
        max-width: fit-content;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }

    .right {
        float: right;
    }
</style>