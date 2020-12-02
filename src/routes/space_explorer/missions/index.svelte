<script>

    import MissionCard from './_Mission_Card.svelte'

    import { fade } from 'svelte/transition';

    import { missionSelect } from '../../../stores/_store_missionSelect.js'

    // DUMMY DATA;
    import { mission_data } from '../../../stores/_data_missions.js'

    // REAL DATA;

    // let base = 'https://space-shadow-api.herokuapp.com/api';

	// if (process.env.NODE_ENV != 'production') {
	// 	base = 'http://127.168.1.0:8080/api';
    // }
    
    // (async () => {
    //     const response = await fetch(base + '/launch_data');
    //     launch_data = await response.json()
    // })()

</script>

<!-- 
    Component HTML 
-->
<!-- Option Menu for Mission Tracking and Simple Planet/Galaxy Exploration -->
<div id='div-opt-menu'>
    <a rel=prefetch sapper:noscroll href='space_explorer/planets'>
        <button> Planets </button>
    </a>
    <a rel=prefetch sapper:noscroll href='space_explorer/missions'>
        <button> Missions </button>
    </a>
</div>

{#if $missionSelect.state}
    <!-- Show the clicked mission (selected) -->
    <div in:fade id='div-mission-cont'>
        <div>
            <!-- mission card selected -->
            <MissionCard {...mission_data[$missionSelect.data_pos]} />
            <!-- return btn; -->
            <div id='div-return-cont'>
                <img on:click={missionSelect.reset} src="./assets/svg/_stream-vid/close_btn.svg" alt="close-btn" />
                <h5> Return </h5> 
            </div>
        </div>
        <!-- mission data description in greater depth -->
        <div id='div-mission-desc-cont'>
            <p> {mission_data[$missionSelect.data_pos]['mission_desc']} </p>
        </div>
    </div>
{:else}
    <!-- Missions grid layout -->
    <div in:fade id='div-mission-cont'>
        <!-- {#each Array(9) as _} -->
        {#each mission_data as item}
            <!-- <MissionCard {...mission_data[0]} /> -->
            <MissionCard {...item} />
        {/each}
    </div>
{/if}

<!-- 
    Component Style 
-->
<style>

    #div-opt-menu {
        text-align: center;
    }

    #div-mission-desc-cont {
        grid-column: 2 / 4;
    }

    #div-return-cont {
        display: grid;
        margin-top: 15px;
        grid-gap: 10px;
        align-items: center;
        grid-template-rows: 1fr 1fr;
        cursor: pointer;
    }

    #div-mission-cont {
        display: grid;
        align-items: start;
        justify-content: space-evenly;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 50px;
        background-color: black;
        padding: 5%;
    }

    #div-mission-desc-cont p {
        font-size: 14px;
    }

</style>