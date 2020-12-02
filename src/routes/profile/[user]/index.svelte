<script context="module">
	// import * as api from 'api.js';

	// export async function preload({ params }, { user }) {
		// const username = params.user.slice(1);

		// console.log('user-view' + params.view)

		// const { profile } = await api.get(`profiles/${username}`, user && user.token);
		// return { profile, favorites: params.view === 'favorites' };
	// }

	let base = 'https://space-shadow-api.herokuapp.com/api';

	if (process.env.NODE_ENV != 'production') {
		base = 'http://127.168.1.0:8080/api';
	}

	import { news_data } from '../../../stores/dummy_news_data.js'

	import { post_non_auth } from 'utils.js';

	export async function preload({ params }, { user }) {
		const uid = user.uid

		const response = await post_non_auth(base + '/get_news_fav', { uid });
		console.log(response)
		// const { article } = await api.get(`articles/${params.slug}`, null);

		let favorites = []
		news_data.forEach(elem => {
			if (response.fav_news.includes(elem.id)) {
				favorites.push(elem)
			}
		});

		return { favorites };
	}

</script>

<script>
	import { stores } from '@sapper/app';
	import Profile from './_Profile.svelte';

	// export let profile;
	export let favorites;

	const { session } = stores();
</script>

<svelte:head>
	<title> {$session.user.username} • AdavaSpace </title>
</svelte:head>

<!-- <Profile {profile} {favorites} user={$session.user}/> -->
<Profile {favorites} user={$session.user}/>