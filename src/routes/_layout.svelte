<script>
	import { stores } from '@sapper/app'
	import Nav from '../routes/_components/Nav.svelte'
	import Footer from './_components/Footer.svelte'
	import MainTransition from '../routes/_components/Transitions/_MainSplashScreen.svelte'

	export let segment;
</script>

<!-- 
Component HTML 
-->

{#if segment != 'space_explorer'}
	<Nav {segment} />
{/if}

<main>
	<MainTransition>
		<slot></slot>
	</MainTransition>
</main>

{#if segment != 'space_explorer'}
	<Footer {segment} />
{/if}


<!-- 
Component SASS (CSS)
-->

<style>

	main {
		background-color: black;
		min-height: 100vh;
	}

</style>