<script>
	import { createEventDispatcher } from 'svelte';

	export let inProgress, image, username, bio, email, password = '';
	const dispatch = createEventDispatcher();

	/**
	 * Function to send update to the parent layer, 
	 * for function trigger,
	 */
	function submit(event) {
		dispatch('save', { image, username, bio, email, password });
	}
</script>

<form on:submit|preventDefault='{submit}'>
	<fieldset>
		<fieldset>
			<input type="text" placeholder="Username" bind:value={username}>
		</fieldset>

		<fieldset>
			<input class="form-control form-control-lg" type="email" placeholder="Email" bind:value={email}>
		</fieldset>

		<fieldset>
			<input type="password" placeholder="New Password" bind:value={password}>
		</fieldset>

		<!-- <fieldset class="form-group">
			<input class="form-control" type="text" placeholder="URL of profile picture" bind:value={image}>
		</fieldset> -->

		<!-- <fieldset class="form-group">
			<textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" bind:value={bio}/>
		</fieldset> -->

		<fieldset>
			<button type="submit" disabled={inProgress}>
				Update Settings
			</button>
		</fieldset>
		
	</fieldset>	
</form>

<!-- 
COMPONENT STYLE 
-->
<style>

	fieldset {
		outline: none;
   		border: none;
	}

	button {
		background-color: #FF7A00;
	}

</style>