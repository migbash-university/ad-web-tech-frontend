<script>
    import { fade, fly } from 'svelte/transition';

    import { onMount } from 'svelte';

    let show = true;

    onMount (() => {
        setTimeout(() => {
            show = false;
        }, 2500)
    })
 
</script>

<!-- Component HTML -->
{#if show}
    <div in:fade out:fade>
        <img src='./assets/svg/Splash_Img.svg' alt='Splash_Img' />
    </div>
{/if}

<slot></slot>

<!-- Component SASS (CSS) -->

<style lang='sass'>

    @import '../../../styles/main.sass'

    div
        @include flex-config($align-items: center, $justify-content: center)
        position: fixed
        background-color: black
        top: 0
        bottom: 0
        right: 0
        left: 0
        z-index: 1000

</style>



