<script context="module">
	export function preload({ params }, { user }) {
		if (!user) {
			this.redirect(302, `/login`);
		}
	}
</script>


<script>
	import { goto, stores } from '@sapper/app';
	import ListErrors from '../_components/ListErrors.svelte';
	import SettingsForm from './_SettingsForm.svelte';
	import { post } from 'utils.js';

	let inProgress;
	let errors;

	const { session } = stores();

	async function logout() {
		await post(`auth/logout`);
		$session.user = null;
		goto('/');
	}

	async function save(event) {
		inProgress = true;

		const response = await post(`auth/save`, event.detail);

		errors = response.errors;
		if (response.user) $session.user = response.user;

		inProgress = false;
	}
</script>

<svelte:head>
	<title> Acccount Settings • AdavaSpace </title>
</svelte:head>

<div class="settings-page">
	<h1 class="text-xs-center">Your Settings</h1>

	<ListErrors {errors}/>

	<SettingsForm on:save={save} {...$session.user} {inProgress}/>

	<hr />

	<button class="btn btn-outline-danger" on:click={logout}>
		Or click here to logout.
	</button>
</div>