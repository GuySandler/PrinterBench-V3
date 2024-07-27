import { writable } from 'svelte/store';

export const profileImg = writable("");
export const profileName = writable("");
export const profileFavs = writable([]);
export const profileUid = writable("");
export const profileImportant = writable(false);
export const expertMode = writable(false);