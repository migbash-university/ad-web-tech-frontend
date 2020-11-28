<script>

	import UpcomingLaunch from './UpcomingLaunch.svelte'

    import { fade } from 'svelte/transition';
    import { notif } from '../../stores/notification.js';

    import {launch_data} from '../../stores/dummy_launch_data';

	import { post_non_auth } from 'utils.js';

    let option; // 'Email', 'Mobile', 'Browser';

    let email, phone_number; // Values to record;

    if (process.env.NODE_ENV != 'production') {
		email = 'miguelbacharov20@gmail.com'
	}

    let launch_id = $notif.notif_id

    let inProgress = false, success = false

    async function setNotif(event) {
        inProgress = true;

        // Select email notif request;
        if (option == 'Email') {
            const response = await post_non_auth('http://127.168.1.0:8080/email_notif', { email, launch_id });
            if (process.env.NODE_ENV != 'production') {
                console.log(response)
	        }
            if (response.ok) {
                success = true
                setTimeout(function() {
                    success = false
                    inProgress = false
                    // $session.withdraw = false;
                }, 5000)
            }
        }

        // Select phone notif request;
        if (option == 'Mobile') {
            const response = await post_non_auth('http://127.168.1.0:8080/email_notif', { email, launch_id });
            console.log(response)
        }
    }

</script>

<!-- 
    Exit Option from pop-up window 
-->
<svelte:window on:keydown={e => { if (e.key == 27) { notif.reset }}} />

<!-- Component HTML -->
<div in:fade out:fade class="modal-wrapper" on:click={notif.reset}></div>

<div class='modal_frame' in:fade out:fade>
    <!-- close btn -->
    <img id='close-btn' on:click={notif.reset} src="./assets/svg/_stream-vid/close_btn.svg" alt="close-btn" />
    <h3> Notify me via </h3>
    
    <!-- select menu div -->
    <div class="select_menu">
        <span>
            <img class='notif-select' on:click={() => option = 'Email'} src="./assets/svg/_notif/Email_Vector.svg" alt="email-icon" />
            <p> Email </p>
        </span>
        <span>
            <img class='notif-select' on:click={() => option= 'Browser'} src="./assets/svg/_notif/Notifications_Vector.svg" alt="browser-icon" />
            <p> Browser </p>
        </span>
        <span>
            <img class='notif-select' on:click={() => option = 'Mobile'} src="./assets/svg/_notif/Phone-Icon.svg" alt="mobile-icon" />
            <p> Mobile </p>
        </span>
    </div>

     <!-- notification details -->
    <p> event Notification Details </p>
    <UpcomingLaunch {...launch_data[launch_id]} />
    <p> notify me 15 min Before Liftoff </p>

    <div id="cont">
        {#if inProgress == false}
            <!-- display notification config, depending on selected option -->
            <div class='passive' class:active='{option === 'Email'}' in:fade={{ delay: 500 }} out:fade={{ duration: 300 }}>
                <p> Email </p>
                <input bind:value={email} placeholder='Email *' />
            </div>
            <div class='passive' class:active='{option === 'Browser'}' in:fade={{ delay: 500 }} out:fade={{ duration: 300 }}>
                <p> Browser </p>
            </div>
            <div class='passive' class:active='{option === 'Mobile'}' in:fade={{ delay: 500 }} out:fade={{ duration: 300 }}>
                <p> Mobile </p>
                <input bind:value={phone_number} placeholder='Phone Number *' />
            </div>
        {:else}
            {#if success}
                <!-- display loading icon -->
                <img in:fade out:fade class='momentIcon' src="./assets/svg/_notif/Success_Vector.svg" alt="success-img" />
            {/if}
        {/if}
    </div>

    <button on:click={setNotif}> Set Notification </button>

</div>

<!-- Component SASS (CSS) -->
<style lang='sass'>

    @import '../../styles/main.sass'

    #cont
        position: relative

    .active
        position: relative !important
        display: block !important
        opacity: 1 !important

    .passive
        position: absolute
        display: none
        opacity: 0
        transition: all 0.4 ease

    .momentIcon
        position: absolute

    #close-btn
        position: absolute
        right: 5%
        top: 5%

    .notif-select
        padding: 50px
        border-radius: 10px
        background-color: #313131

        &:hover
            background-color: white
            transition: all 3s ease
            box-shadow: 1px 1px 1px white

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
        width: fit-content
        height: fit-content
        border-radius: 10px
        overflow-y: hidden
        background-color: #1A1A1A

    .select_menu
        display: grid
        grid-template-columns: 1fr 1fr 1fr
        align-content: center
        grid-gap: 50px
        justify-items: center

    .modal-wrapper
        position: fixed
        top: 0
        left: 0
        z-index: 2000
        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, 0.6)

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