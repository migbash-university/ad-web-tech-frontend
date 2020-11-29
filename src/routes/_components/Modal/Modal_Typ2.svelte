<script>
    import { fade } from 'svelte/transition';
</script>

<!-- 
    Component HTML 
-->

<div in:fade id='div-wrapper'>
    <div id='div-inner'>
        <h5> Earth </h5>
        <p> Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface. </p>
    </div>
</div>

<!-- 
    Component Style 
-->

<style>

    #div-wrapper {
        position: absolute;
        left: 0;
        top: 50%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5));
        padding: 1px;
        border-radius: 10px;
        width: 250px;
    }

    #div-inner {
        
    }

</style>