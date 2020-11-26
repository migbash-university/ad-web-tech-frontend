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

	let email = '';
	let password = '';
	let errors = null;

	if (process.env.NODE_ENV != 'production') {
		console.log('=== DEV ENV ===')
		password = 'miguel2000#'
		email = 'miguelbacharov20@gmail.com'
	}

	async function submit(event) {
		const response = await post(`auth/login`, { email, password });

		// TODO handle network errors
		errors = response.errors;

		if (response.user) {
			$session.user = response.user;
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Sign in • AdavaSpace</title>
</svelte:head>

<!-- 
	COMPONENT HTML 
-->

<div class="auth-page">
	<div class='innerDiv'>
		<h1 class="text-xs-center">Sign In</h1>
		<p class="text-xs-center">
			<a href="/register">Need an account?</a>
		</p>

		<ListErrors {errors}/>

		<form on:submit|preventDefault={submit}>
			<fieldset class="form-group">
				<input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
			</fieldset>
			<fieldset class="form-group">
				<input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
			</fieldset>
			<button class="btn btn-lg btn-primary pull-xs-right" type="submit">
				Sign in
			</button>
		</form>
	</div>
</div>

<!-- 
	COMPONENT STYLE 
-->

<style>

	.auth-page {
		margin: auto;
		height: 100vh;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.innerDiv {
		height: 35%;
    	display: grid;
    	align-items: center;
	}
	
</style>