<script>
    import { fade } from 'svelte/transition';
    import { streamVisible } from '../../stores/stream.js';
</script>

<!-- 
    Exit Option from pop-up window 
-->

<svelte:window on:keydown={e => { if (e.key == 27) { streamVisible.reset }}} />

<!-- Component HTML -->
<div in:fade out:fade on:click={streamVisible.reset} class="modal-wrapper"></div>

<div in:fade out:fade>
    <!-- close btn -->
    <img on:click={streamVisible.reset} src="./assets/svg/_stream-vid/close_btn.svg" alt="close-btn" />
    <iframe width="420" height="315" src={$streamVisible.stream_link} title='stream-link-video'> </iframe>
</div>

<!-- Component SASS (CSS) -->
<style lang='sass'>

    div
        position: fixed
        top: 0
        bottom: 0
        right: 0
        left: 0
        margin: auto
        z-index: 2001
        background-color: white
        box-shadow: 0 0 4px #cccccc
        width: 65vw
        height: 65vh
        border-radius: 10px
        overflow-y: hidden

    .modal-wrapper
        position: fixed
        top: 0
        left: 0
        z-index: 2000

        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, 0.9)

    img
        position: absolute
        top: 15px
        right: 15px

    iframe
        border-radius: 10px
        height: 100%
        width: 100%

</style>