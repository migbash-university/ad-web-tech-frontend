<script>

    import MissionCard from './_Mission_Card.svelte'

    import { fade } from 'svelte/transition';

    import { missionSelect } from '../../../stores/_store_missionSelect.js'

    // DUMMY DATA;
    import { mission_data } from '../../../stores/_data_missions.js'

    // REAL DATA;

</script>

<!-- 
    Component HTML 
-->
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
        {#each mission_data as mission}
            <MissionCard {...mission} />
        {/each}
    </div>
{/if}

<!-- 
    Component Style 
-->

<style>

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
        grid-column-gap: 50px;
        background-color: black;
        padding: 5%;
    }

    #div-mission-desc-cont p {
        font-size: 14px;
    }

</style>