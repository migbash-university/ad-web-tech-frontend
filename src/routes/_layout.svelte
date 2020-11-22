<script>
	import { stores } from '@sapper/app'
	import Nav from '../routes/_components/Nav.svelte'
	import Footer from './_components/Footer.svelte'
	import MainTransition from '../routes/_components/Transitions/_MainSplashScreen.svelte'

	export let segment;
</script>

<!-- Component HTML -->

<Nav {segment} />

<main>
	<MainTransition>
		<slot></slot>
	</MainTransition>
</main>

<Footer {segment} />

<!-- Component SASS (CSS) -->

<style lang='sass'>

	main
		background:
			color: black
		min-height: 100vh

</style>