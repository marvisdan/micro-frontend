import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";
// Mount function to start up this app

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
	const history = defaultHistory
		? defaultHistory
		: createMemoryHistory({
				initialEntries: [initialPath]
		  });
	if (onNavigate) {
		history.listen(onNavigate);
	}

	ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);
	return {
		onParentNavigate({ pathname: nextPathname }) {
			const { pathname } = history.location;
			if (pathname !== nextPathname) {
				console.log(nextPathname);

				history.push(nextPathname);
			}
		}
	};
};
// if we are in development and in isolation
// call mount immediatly

if (process.env.NODE_ENV === "development") {
	const devRoot = document.querySelector("#_auth-dev-root");
	if (devRoot) {
		mount(devRoot, { defaultHistory: createBrowserHistory() });
	}
}
// We are running through the container and we should export the mount function

export { mount };
