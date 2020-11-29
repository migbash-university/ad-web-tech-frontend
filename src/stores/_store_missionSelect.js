import { writable } from 'svelte/store';

function visibleComp() {
	const { subscribe, set, update } = writable({ state: false, data_pos: null});

	return {
		subscribe,
		select: (pos) => set({ state: true, data_pos: pos}),
		reset: () => set({ state: false, data_pos: null})
	};
}

export const missionSelect = visibleComp();