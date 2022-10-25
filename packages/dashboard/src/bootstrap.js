import { createApp } from "vue";

import Dashboard from "./components/Dashboard.vue";
// Mount function to start up this app

const mount = (el) => {
	const app = createApp(Dashboard);
	app.mount(el);
};
// if we are in development and in isolation
// call mount immediatly

if (process.env.NODE_ENV === "development") {
	const devRoot = document.querySelector("#_dashboard-dev-root");
	if (devRoot) {
		mount(devRoot);
	}
}
// We are running through the container and we should export the mount function

export { mount };
