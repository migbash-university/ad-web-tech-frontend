<script>
    import { fade, fly } from 'svelte/transition';

	import { post_non_auth } from 'utils.js';

    let email
    let success = false

    if (process.env.NODE_ENV != 'production') {
		email = 'miguelbacharov20@gmail.com'
	}
    
    async function submitEmail() {
        const response = await post_non_auth('http://127.168.1.0:8080/news_sub', { email });
        if (process.env.NODE_ENV != 'production') {
            console.log(response)
	    }
        // TODO handle network errors
        // errors = response.errors;
		if (response.ok) {
            success = true
            // SUCCESS REVERT
            setTimeout(function() {
                success = false;
                // $session.withdraw = false;
            }, 5000)
		}
    }

</script>

<!-- "Newsletter Subscription" | Section -->

<section id='newsletter-sec' class='container-fluid'>

    <!-- <form on:submit|preventDefault={submit}>
        <fieldset class="form-group">
            <input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
        </fieldset>
        <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
        </fieldset>
        <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
            Sign in
        </button>
    </form> -->

    {#if success == false}
        <div in:fade out:fade class='input-form'>	
            <h1> subscribe to our newsletter </h1>
            <input bind:value={email} placeholder='Your email' />
            <!-- <p> We promise, no spam </p> -->
            <button on:click={submitEmail}>Sumbit</button>
        </div>

    {:else}
        <div in:fade out:fade class='success-msg'>
            <h1> thank you for subscribing </h1>
        </div>
    {/if}

</section>

<!-- Component Svelte -->
<style lang='sass'>

    @import '../../styles/main.sass'

    section
        @include flex-config($align-items: center, $justify-content: center)

        .input-form
            @include flex-config($align-items: center, $justify-content: space-evenly, $flex-direction: column)
            height: 80%

            p
                align-self: start

            button
                width: auto
                border-color: #FF7A00
                color: white
                background-color: black
                font-family: 'Azonix'
                font-size: 16px
                padding: 7.5px 30px
                border-radius: 5px
                letter-spacing: 3.7px
                transition: all 0.5s ease

                &:hover
                    background-color: #FF7A00
                    color: black
                    
    h1
        font:
            family: Azonix
            size: 20px
        letter-spacing: 3.7px
        color: white
                
    #newsletter-sec
        height: 50vh
        background:
            image: url('/assets/svg/newsletter-sec-img.svg')
            position: right
            // size: contain
            repeat: no-repeat

    .success-msg
        position: absolute

</style>