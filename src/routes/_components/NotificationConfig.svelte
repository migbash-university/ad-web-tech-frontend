<script>

    let base = 'https://space-shadow-api.herokuapp.com';

    if (process.env.NODE_ENV != 'production') {
        base = 'http://127.168.1.0:8080';
    }

    import UpcomingLaunch from './UpcomingLaunch.svelte'

    import { fade } from 'svelte/transition';
    import { notif } from '../../stores/_state_notification.js';

    // DUMMY DATA:
    // import { launch_data } from '../../stores/dummy_launch_data';

	import { post_non_auth } from 'utils.js';

    let option; // 'Email', 'Mobile', 'Browser';

    let email, phone_number; // Values to record;

    if (process.env.NODE_ENV != 'production') {
		email = 'miguelbacharov20@gmail.com'
    }

    let launch_data;
    
    (async () => {
        const response = await fetch(base + '/launch_data');
        launch_data = await response.json()
    })()

    let launch_id = $notif.notif_id

    let inProgress = false, success = false

    async function setNotif(event) {
        inProgress = true;

        // Select email notif request;
        if (option == 'Email') {
            const response = await post_non_auth(base + '/email_notif', { email, launch_id });
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

        // BROWSER NOTIF [FUTURE FEATURE]

        // MOBILE NOTIF [FUTURE FEATURE]

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
        <!-- Email Notification -->
        <span on:click={() => option = 'Email'} >
            <div class='notif-select' class:active='{option === 'Email'}'>
                <img src="./assets/svg/_notif/Email_Vector.svg" alt="email-icon" />
            </div>
            <h5> Email </h5>
        </span>
        <!-- Browser Notification -->
        <span on:click={() => option = 'Browser'} >
            <div class='notif-select' class:active='{option === 'Browser'}'>
                <img src="./assets/svg/_notif/Notifications_Vector.svg" alt="browser-icon" />
            </div>
            <h5> Browser </h5>
            <p> coming soon </p>
        </span>
        <!-- Mobile Notification -->
        <span on:click={() => option = 'Mobile'}>
            <div class='notif-select' class:active='{option === 'Mobile'}'> 
                <img src="./assets/svg/_notif/Phone-Icon.svg" alt="mobile-icon" />
            </div>
            <h5> Mobile </h5>
            <p> coming soon </p>
        </span>
    </div>

     <!-- notification details -->
    <h6 style='color: #555555; justify-self: left;'> event Notification Details </h6>
    <!-- target launch up for notification set up -->
    <div id='div-launch-card-cont'>
        {#if launch_data != undefined}
            {#each launch_data.result as item}
                {#if item.id === launch_id}
                    <UpcomingLaunch {...item} />
                {/if}
            {/each}
        {/if}
    </div>  
    <h3 style='color: #555555'> notify me 15 min Before Liftoff </h3>

    <div id="cont">
        {#if inProgress == false}
            <!-- display notification config, depending on selected option -->
            <!-- Email Option Select -->
            {#if option === 'Email'}
                <div in:fade={{ delay: 500 }}>
                    <input bind:value={email} placeholder='Email *' />
                </div>
            <!-- Browser Option Select -->
            {:else if option === 'Browser'}
                <div in:fade={{ delay: 500 }}>
                    <p> Browser </p>
                </div>
            <!-- Mobile Option Select -->
            {:else if option === 'Mobile'}
                <div in:fade={{ delay: 500 }}>
                    <input bind:value={phone_number} placeholder='Phone Number *' />
                </div>
            {:else}
                <!-- display nothing; -->
            {/if}

            <button on:click={setNotif}> Set Notification </button>

        {:else}
            {#if success}
                <!-- display loading icon -->
                <img in:fade src="./assets/svg/_notif/Success_Vector.svg" alt="success-img" />
                <h4 style='color: #555555'> Notification Has been set </h4>
            {/if}
        {/if}
    </div>


</div>

<!-- Component SASS (CSS) -->
<style>

    #cont {
        position: relative;
        text-align: center;
    }

    #close-btn {
        position: absolute;
        cursor: pointer;
        right: 5%;
        top: 5%;
    }

    #div-launch-card-cont {
        width: 80%;
        /* transform: scale(0.75); */
        zoom: 0.75;
    }

    .notif-select {
        padding: 25px;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #313131;
        transition: all 0.5s ease;
        display: flex;
        align-self: center;
        justify-content: center;
    }

    .notif-select:hover {
        background-color: white;
        box-shadow: 1px 1px 1px white;
    }

    .active {
        background-color: white;
        box-shadow: 1px 1px 1px white;
    }

    .modal_frame {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        z-index: 2001;
        box-shadow: 0 0 4px #cccccc;
        max-width: 60%;
        height: 60vh;
        border-radius: 10px;
        overflow-y: hidden;
        background-color: #1A1A1A;
        display: grid;
        align-items: center;
        justify-items: center;
        padding: 25px;
    }

    .select_menu {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-content: center;
        grid-gap: 50px;
        justify-items: center;
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

    span {
        display: grid;
        width: 100%;
        text-align: center;
        cursor: pointer;
    }

    input {
        font-family: 'Azonix';
        color: white;
        background-color: transparent;
        border: 2px solid #FF7A00;
        margin-bottom: 15px;
    }

</style>