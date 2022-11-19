import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
	window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create(
	devtools(
		persist(
			(set) => ({
				// get localStorage variable
				darkmode: getLocalStorage("darkmode-storage")?.state?.mode || "light",
				setDarkMode: (mode) => {
					if (mode) {
						set((state) => ({
							...state,
							darkmode: mode
						}));
					}
				},
				// if you need to set this same variable into the localStorage
				setCollection: (darkmode) =>
					set((state) => {
						setLocalStorage("darkmode-storage", darkmode);
						return { darkmode };
					})
			}),
			{
				name: "auth-storage",
				getStorage: () => localStorage
			}
		)
	)
);
