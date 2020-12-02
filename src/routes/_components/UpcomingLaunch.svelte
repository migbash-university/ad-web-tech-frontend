<script>
    // import {launch_data} from '../../stores/dummy_launch_data';
    
    import { fade } from 'svelte/transition';

    // trigger component UI/UX changes view:
    import { streamVisible } from '../../stores/stream.js';
    import { notif } from '../../stores/_state_notification.js';

    export let id,
    company,
    launch_date,
    launch_time_unix,
    live,
    launch_site,
    mission_title,
    mission_desc,
    mission_tag,
    live_stream,
    location

    let expand = false

    const expandInfo = () => {
        expand = !expand
    }
    
    const unixToDay = (unix_time) => {
        var date = new Date(unix_time * 1000)
        return date.getDate()
    }

    const unixToMonth = (unix_time) => {
        var date = new Date(unix_time * 1000)
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return monthNames[date.getMonth()]
    }

</script>

<!-- 
    COMPONENT HTML 
-->
<div in:fade class='card-cont' on:click={expandInfo}>

    <div class="mission_date">
        <h3> {unixToDay(launch_time_unix)} </h3>
        <h6 class='month'> {unixToMonth(launch_time_unix)} </h6>
    </div>

    <div class='mission_desc'>
        <h4> {mission_title} </h4>
        <span>
            <h6> {company} </h6>
            <h6> {launch_site} </h6>
        </span>
        <p style='color: #555555;'> {mission_desc} </p>
        <span on:click={streamVisible.visible(live_stream)}>
            <p style='color: #555555; margin-right: 10px;'> Stream </p>
            <img src="./assets/svg/_launch_card/stream_feed_icon.svg" alt="stream-video-icon" />
        </span>
        <!-- Expanded Info on Click FUTURE FEATURE; -->
        <!-- {#if expand}
            <div class='extra-links' in:fade out:fade>
                <p> Social Media Stuf </p>
                <p on:click={streamVisible.visible(live_stream)}> View Livestream </p>
            </div>
        {/if} -->
    </div>

    {#if live}
        <!-- Live Launch Status Icon-->
        <img style='position: absolute; right: 0; width 17px; height: 17px; right: 10px; top: 10px;' src="./assets/gif/red-point-gif.gif" alt="red-point-gif" />
    {:else}
        <!-- Bell Icon -->
        <img on:click={notif.visible(id)} style='position: absolute; right: 0; width 17px; height: 17px; right: 10px; top: 10px;' src="./assets/svg/notification-icon.svg" alt="notification-icon" />
    {/if}
</div>

<!-- 
    Component SASS (CSS) 
-->
<style lang='sass'>

    @import '../../styles/main.sass'

    h4
        color: #000000

    span
        display: flex
        justify-content: start

        h6
            margin: 5px
            color: #8D8D8D

    .card-cont
        background: 
            color: white
        border-radius: 10px
        display: grid
        grid-template-columns: 1fr 1fr 1fr 1fr
        align-items: center
        background-color: white
        border-radius: 10px
        margin: 10px 0
        overflow: hidden
        position: relative
        cursor: pointer

    // MISSION INFO
        
    .mission_date
        background: 
            color: #464646
        font:
            family: Azonix
            size: 20px
        color: white
        height: 100%
        display: flex
        align-items: center
        flex-direction: column
        justify-content: center

    .mission_desc
        grid-column: 2 / 5
        padding: 20px

    .month
        color: #7C7C7C

</style>

