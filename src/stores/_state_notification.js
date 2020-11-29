import { writable } from 'svelte/store';

function visibleFn() {
	const { subscribe, set, update } = writable({ state: false, notif_id: null});

	return {
		subscribe,
		visible: (id) => set({ state: true, notif_id: id}),
		reset: () => set({ state: false, notif_id: null})
	};
}

export const notif = visibleFn();