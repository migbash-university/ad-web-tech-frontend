<script>
  	const fetch = process.browser ? window.fetch : require('node-fetch').default;

	import { stores } from '@sapper/app';

	const { page, session } = stores();

	export let segment;

</script>

<nav class="{segment == 'space_explorer' ? 'trans_div' : ''}">
	<!-- Company Brand Image -->
	<a rel='prefetch' href="/">
		<img src="./assets/svg/logo_main.svg" alt="company-img">
	</a>
	<!-- Navbar Menu -->
	<div class='nav-menu'>
		<a rel='prefetch' class="nav-link" class:active="{$page.path === '/'}" href="/">Home</a>
		<!-- User Signed In -->
		{#if $session.user}
			<!-- <a rel='prefetch' href="/editor" class="nav-link" class:active="{$page.path === '/editor'}">
				<i class="ion-compose"></i>&nbsp;New Post
			</a> -->
			<a rel='prefetch' href="/settings" class="nav-link" class:active="{$page.path === '/settings'}">
				<i class="ion-gear-a"></i>&nbsp;Settings
			</a>
			<a rel='prefetch' href='/profile/@{$session.user.username}' class="nav-link">
				<!-- <img src={$user.image} class="user-pic" alt={$user.username}> -->
				{$session.user.username}
			</a>
		<!-- User Not Signed In -->
		{:else} 
			<a rel='prefetch' href="/login" class="nav-link" class:active="{$page.path === '/login'}">
				Login
			</a>
			<a rel='prefetch' href="/register" class="nav-link" class:active="{$page.path === '/register'}">
				Sign In
			</a>
		{/if}
	</div>
</nav>

<!-- Component Style -->
<style lang="sass">

	nav 
		display: flex
		justify-content: space-around
		height: 10vh
		align-items: center
		background-color: #1D1D1D

		// Switch Layout for the '/space_explorer' page

		&.trans_div
			background-color: transparent
			position: absolute
			z-index: 100
			width: 100%
			border-bottom: 0.5px solid white

	.nav-menu
		width: 15%
		justify-content: space-evenly
		display: flex

	.active
		color: #FA00FF

	a
		font: 
			family: Azonix
			size: 14px

</style>