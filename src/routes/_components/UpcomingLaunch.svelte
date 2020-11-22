<script>
    // import {launch_data} from '../../stores/dummy_launch_data';
    import { fade } from 'svelte/transition';
    import { streamVisible } from '../../stores/stream.js';
    import { notif } from '../../stores/notification.js';

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

<!-- Component HTML -->
<div class='card-cont' on:click={expandInfo}>
    <div class="mission_date">
        <h1> {unixToDay(launch_time_unix)} </h1>
        <h1 class='month'> {unixToMonth(launch_time_unix)} </h1>
    </div>
    <div class='mission_desc'>
        <h2> {mission_title} </h2>
        <span>
            <h3> {company} </h3>
            <h3> {launch_site} </h3>
        </span>
        <p> {mission_desc} </p>
        <!-- Expanded Info on Click-->
        {#if expand}
            <div in:fade out:fade>
                <p> Social Media Stuf </p>
                <p on:click={streamVisible.visible(live_stream)}> View Livestream </p>
            </div>
        {/if}
    </div>
    {#if live}
        <!-- Live Launch Status Icon-->
        <img style='position: absolute; right: 0; width 17px; height: 17px; right: 10px; top: 10px;' src="./assets/gif/red-point-gif.gif" alt="red-point-gif" />
    {:else}
        <!-- Bell Icon -->
        <img on:click={notif.visible(id)} style='position: absolute; right: 0; width 17px; height: 17px; right: 10px; top: 10px;' src="./assets/svg/notification-icon.svg" alt="notification-icon" />
    {/if}
</div>

<!-- Component SASS (CSS) -->
<style lang='sass'>

    @import '../../styles/main.sass'

    span
        display: flex
        justify-content: start

        h3
            margin: 5px

    h2
        font:
            family: Azonix
            size: 15px
        color: black

    h3
        color: #8D8D8D
        font:
            family: Azonix
            size: 10px
    
    .card-cont
        @include flex-config($align-items: center, $justify-content: start)
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

        p
            margin: 0
            font-size: 10px

    .month
        font-size: 10px
        color: #7C7C7C

</style>

