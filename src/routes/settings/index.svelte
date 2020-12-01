<!-- 
LOADS BEFORE COMPONENT RENDERS - JS 
-->
<script context="module">
	export function preload({ params }, { user }) {
		if (!user) {
			this.redirect(302, `/login`);
		}
	}
</script>

<!-- 
COMPONENT JS 
-->
<script>
	// SVELTE IMPORTS
	import { goto, stores } from '@sapper/app';

	// COMPONENTS IMPORTS
	import ListErrors from '../_components/ListErrors.svelte';
	import SettingsForm from './_SettingsForm.svelte';

	// DATA IMPORTS
	import { post } from 'utils.js';

	let inProgress;
	let errors;

	const { session } = stores();

	/**
	 * Function loagout user from the web-app,
	 * $session.user = null
	 */
	async function logout() {
		await post(`auth/logout`);
		$session.user = null;
		goto('/');
	}

	/**
	 * Function save / update the user account details,
	 * sets new $session.user data on response,
	 * @param event
	 */
	async function save(event) {
		inProgress = true;

		// console.log(event.detail)

		const response = await post(`auth/save`, event.detail);

		errors = response.errors;
		if (response.user) $session.user = response.user;

		inProgress = false;
	}

</script>

<!-- 
COMPONENT HEAD TAG 
-->
<svelte:head>
	<title> Acccount Settings • AdavaSpace </title>
</svelte:head>

<!-- 
COMPONENT HTML 
-->
<section>
	<div id="div-settings-cont">
		<h1> Account Settings </h1>

		<!-- visible errors display -->
		<ListErrors {errors}/>

		<!-- settings form view -->
		<SettingsForm on:save={save} {...$session.user} {inProgress}/>

		<!-- user logout button -->
		<button id='btn-log-out' on:click={logout}>
			Logout
		</button>
	</div>
</section>

<!-- 
COMPONENT STYLE 
-->
<style>

	section {
		display: flex;
		height: 90vh;
	}

	#div-settings-cont {
		margin: auto;
		width: 50%;
		display: grid;
		grid-gap: 25px;
		align-items: center;
	}

	#btn-log-out {
		background-color: #00FFD1;
		color: black;
		width: fit-content;
	}

</style>