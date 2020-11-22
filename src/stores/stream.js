import { writable } from 'svelte/store';

function visible() {
	const { subscribe, set, update } = writable({ stream: false, stream_link: ''});

	return {
		subscribe,
		visible: (stream_url) => set({stream: true, stream_link: stream_url}),
		reset: () => set({stream: false, stream_link: ''})
	};
}

export const streamVisible = visible();

