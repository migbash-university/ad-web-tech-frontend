<script>
  	const fetch = process.browser ? window.fetch : require('node-fetch').default;

	import { stores } from '@sapper/app';

	const { page, session } = stores();

</script>

<nav class="navbar navbar-dark bg-dark">
	<div class="container">
		<a rel='prefetch' class="navbar-brand" href="/">
			<img src="./assets/svg/logo_main.svg" alt="">
		</a>

		<!-- Navbar Menu -->
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<a rel='prefetch' class="nav-link" class:active="{$page.path === '/'}" href="/">Home</a>
			</li>

			<!-- User Signed In -->
			{#if $session.user}
				<li class="nav-item">
					<a rel='prefetch' href="/editor" class="nav-link" class:active="{$page.path === '/editor'}">
						<i class="ion-compose"></i>&nbsp;New Post
					</a>
				</li>
				<li class="nav-item">
					<a rel='prefetch' href="/settings" class="nav-link" class:active="{$page.path === '/settings'}">
						<i class="ion-gear-a"></i>&nbsp;Settings
					</a>
				</li>
				<li class="nav-item">
					<a rel='prefetch' href='/profile/@{$session.user.username}' class="nav-link">
						<!-- <img src={$user.image} class="user-pic" alt={$user.username}> -->
						{$session.user.username}
					</a>
				</li>

			<!-- User Not Signed In -->
			{:else} 
				<li class="nav-item">
					<a rel='prefetch' href="/login" class="nav-link" class:active="{$page.path === '/login'}">
						Login
					</a>
				</li>

				<li class="nav-item">
					<a rel='prefetch' href="/register" class="nav-link" class:active="{$page.path === '/register'}">
						Sign In
					</a>
				</li>
			{/if}

		</ul>
	</div>
</nav>

<!-- Component Style -->
<style lang="sass">

	a
		color: white
		font: 
			family: Azonix
			size: 14px

</style>