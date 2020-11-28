<script>
    import { fade } from 'svelte/transition';

    // reset all of the modal counters
</script>

<!-- 
    Exit Option from pop-up window 
-->
<svelte:window on:keydown={e => { if (e.key == 27) { notif.reset }}} />

<!-- Component HTML -->

<!-- Background opcaque modal -->
<div in:fade out:fade class="modal-wrapper" on:click={notif.reset}></div>

<!-- Content front modal -->
<div class='modal_frame' in:fade out:fade> 

    <slot> 
        <!-- Rendered dynamic content goes here -->
    </slot>

</div>

<style> 

    .modal_frame {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        z-index: 2001;

        background-color: white;
        box-shadow: 0 0 4px #cccccc;
        width: fit-content;
        height: fit-content;
        border-radius: 10px;
        overflow-y: hidden;
        background-color: #1A1A1A;
    }

    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;

        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
    }
        
        

</style>