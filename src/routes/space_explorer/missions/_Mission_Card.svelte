<script>

    import { missionSelect } from '../../../stores/_store_missionSelect.js'

    export let pos,
    mission_title,
    mission_desc,
    mission_launch,
    mission_destination,
    mission_arrival,
    agency

    const toggleMissionView = () => {
        missionSelect.select(pos)
    }

</script>

<!-- 
    Component HTML 
-->
<div id='div-mission-wrapper' on:click={toggleMissionView}>
    <div id='div-mission-cont' class:selected="{$missionSelect.state == true}">
        <h5> { mission_title } </h5>
        <p> { mission_desc } </p>
        <p> { mission_launch } </p>
        <p> { mission_destination } </p>
        <p> { mission_arrival } </p>
        <p> { agency } </p>
    </div>
</div>

<!-- 
    Component Style 
-->

<style>

    #div-mission-wrapper {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5));
        border-radius: 10px;
        padding: 2.5px;
    }

    #div-mission-wrapper:hover {
        background: linear-gradient(to bottom, rgba(255, 122, 0, 1), rgba(255, 255, 255, 0));
    }

    #div-mission-cont {
        background-color: black;
        border: 0.5px solid white;
        border-radius: 10px;
        padding: 25px;
    }

    #div-mission-cont:hover {
        color: #867D7D;
        background-color: #414141;
        cursor: pointer;
    }

    .selected {
        color: #867D7D !important;
        background-color: #414141 !important;
        cursor: pointer !important;
    }

</style>