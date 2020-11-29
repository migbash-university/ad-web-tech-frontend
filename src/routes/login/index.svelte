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

<div id="div-outer-cont">

	<div id='div-login-cont'>
		<h1>Sign In</h1>

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
	
	<!-- extra actions for the user -->
	<div id='div-auth-actions-cont'>
		<p>	Do not have an account yet? </p>
		<p>	<a style='color: #FA00FF !important;' href="/register"> Sign Up </a> </p>
	</div>
</div>

<!-- 
	COMPONENT STYLE 
-->

<style>

	#div-outer-cont {
		margin: auto;
		width: 50%;
		display: grid;
		grid-gap: 25px;
		align-items: center;
		grid-template-rows: auto auto;
	}

	#div-login-cont {
		background-image: url('/assets/svg/_user/visual_design_sign_up.svg');
		background-position: center;
		background-repeat: no-repeat;
		/* background-color: aliceblue; */
		background-color: #1B1B1B;
		background-size: cover;
		border-radius: 10px;
		height: 50vh;
		display: grid;
		align-items: center;
		width: 100%;
		padding: 5%;
		text-align: center;
	}

	#div-login-cont:hover {
		transform: scale(1.01);
		box-shadow: 0 0 5px aliceblue;
	}

	
	#div-login-cont h1 {
		text-align: left;
	}

	#div-auth-actions-cont {
		text-align: center;
	}

	#div-auth-actions-cont p {
		font-size: 18px;
		font-weight: bold;
	}

	fieldset {
		outline: none;
   		border: none;
	}

	button {
		margin-top: 25px;
	}
	
</style>