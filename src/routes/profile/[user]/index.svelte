<script context="module">
	// import * as api from 'api.js';

	// export async function preload({ params }, { user }) {
		// const username = params.user.slice(1);

		// console.log('user-view' + params.view)

		// const { profile } = await api.get(`profiles/${username}`, user && user.token);
		// return { profile, favorites: params.view === 'favorites' };
	// }

	import { news_data } from '../../../stores/dummy_news_data.js'

	import { get_non_auth } from 'utils.js';

	export async function preload({ params }, { user }) {
		const uid = user.uid
		const response = await get_non_auth('http://127.168.1.0:8080/news_fav/' + uid );
		console.log(response)
		// const { article } = await api.get(`articles/${params.slug}`, null);

		return { news };
	}

</script>

<script>
	import { stores } from '@sapper/app';
	import Profile from './_Profile.svelte';

	// export let profile;
	// export let favorites;

	const { session } = stores();
</script>

<svelte:head>
	<title> {$session.user.username} • AdavaSpace </title>
</svelte:head>

<!-- <Profile {profile} {favorites} user={$session.user}/> -->
<Profile user={$session.user}/>