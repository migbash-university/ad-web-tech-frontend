<!-- "Newsletter Subscription" | Section -->

<section id='newsletter-sec' class='container-fluid'>
	<div class='input-form'>	
		<h1> subscribe to our newsletter </h1>
		<input placeholder="Email" />
		<button href=''> Sumbit </button>
	</div>
</section>

<!-- Component Svelte -->
<style lang='sass'>

    @import '../../styles/main.sass'

    section
        @include flex-config($align-items: center, $justify-content: center)
        // min-height: 100vh

        .input-form
            @include flex-config($align-items: center, $justify-content: center, $flex-direction: column)

            button
                width: auto

    h1
        font-family: Azonix
        color: white
                
    #newsletter-sec
        height: 50vh
        background:
            image: url('/assets/svg/newsletter-sec-img.svg')
            position: right
            // size: contain
            repeat: no-repeat
</style>