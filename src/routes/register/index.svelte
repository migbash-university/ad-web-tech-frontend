<script context="module">
	export async function preload({ params }, { user }) {
		if (user) {
			this.redirect(302, `/`);
		}
	}
</script>

<script>
	import { goto, stores } from '@sapper/app';
	import ListErrors from '../_components/ListErrors.svelte';
	import { post } from 'utils.js';

	const { session } = stores();

	let username = '';
	let email = '';
	let password = '';
	let errors = null;

	if (process.env.NODE_ENV != 'production') {
		console.log('=== DEV ENV ===')
		username = 'Miguel Bacharov'
		password = 'miguel2000#'
		email = 'miguelbacharov20@gmail.com'
	}

	async function submit(event) {
		const response = await post(`auth/register`, { username, email, password });

		// TODO handle network errors
		errors = response.errors;

		if (response.user) {
			$session.user = response.user;
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Sign up • AdavaSpace</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign up</h1>
				<p class="text-xs-center">
					<a href="/login">Have an account?</a>
				</p>

				<ListErrors {errors}/>

				<form on:submit|preventDefault={submit}>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="text" required placeholder="Your Name" bind:value={username}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right">
						Sign up
					</button>
				</form>
			</div>
		</div>
	</div>
</div>