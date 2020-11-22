<script>

	import UpcomingLaunch from './UpcomingLaunch.svelte'

    import { fade } from 'svelte/transition';
    import { notif } from '../../stores/notification.js';

    import {launch_data} from '../../stores/dummy_launch_data';

    const notifOption = (num) => {
        if (num === 1) {
            alert('Picked Email Notif')
        } else if (num === 2) {
            alert('Picked Browser Notification')
        } else {
            alert('Picked Mobile Notification')
        }
    }
</script>

<!-- Component HTML -->
<div in:fade out:fade class="modal-wrapper"></div>

<div class='modal_frame' in:fade out:fade >
    <!-- close btn -->
    <img on:click={notif.reset} src="./assets/svg/_stream-vid/close_btn.svg" alt="close-btn" />
    <h3> Notify me via </h3>
    <div class="select_menu">
        <span>
            <img on:click={() => notifOption(1)} src="./assets/svg/_notif/Email_Vector.svg" alt="email-icon" />
            <p> Email </p>
        </span>
        <span>
            <img on:click={() => notifOption(2)} src="./assets/svg/_notif/Notifications_Vector.svg" alt="browser-icon" />
            <p> Browser </p>
        </span>
        <span>
            <img on:click={() => notifOption(3)} src="./assets/svg/_notif/Phone-Icon.svg" alt="mobile-icon" />
            <p> Mobile </p>
        </span>
    </div>
    <p> event Notification Details </p>
    <UpcomingLaunch {...launch_data[$notif.notif_id]} />
    <p> notify me 15 min Before Liftoff </p>
    <button> Set Notification </button>
</div>

<!-- Component SASS (CSS) -->
<style lang='sass'>

    @import '../../styles/main.sass'

    .modal_frame
        position: fixed
        top: 0
        bottom: 0
        right: 0
        left: 0
        margin: auto
        z-index: 2001

        background-color: white
        box-shadow: 0 0 4px #cccccc
        width: 35vw
        height: 45vh
        border-radius: 10px
        overflow-y: hidden
        background-color: #1A1A1A

    .select_menu
        display: grid
        grid-template-columns: 1fr 1fr 1fr
        align-content: center
        grid-gap: 50px
        justify-items: center
        height: 100%

    .modal-wrapper
        position: fixed
        top: 0
        left: 0
        z-index: 2000

        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, 0.6)

    img
        padding: 50px
        border-radius: 10px
        background-color: #313131

        &:hover
            background-color: white
            transition: all 3s ease
            box-shadow: 1px 1px 1px white

    span
        @include flex-config($align-items: center, $justify-content: center, $flex-direction: column)

        p
            color: white
            font:
                family: Azonix
                size: 14px

    h3
        color: white
        font:
                family: Azonix
</style>