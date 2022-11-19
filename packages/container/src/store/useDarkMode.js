import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useStore = create(
	devtools(
		persist(
			(set) => ({
				mode: "light",
				toggleMode: () =>
					set((state) => ({ mode: state.mode === "light" ? "dark" : "light" }))
			}),
			{
				name: "darkmode-storage",
				getStorage: () => localStorage
			}
		)
	)
);
