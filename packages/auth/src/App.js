import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
	StylesProvider,
	createGenerateClassName
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import SignUp from "./components/Signup";
import { CssBaseline } from "@material-ui/core";
import { useStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = ({ history, onSignIn, theme, mode }) => {
	const generateClassName = createGenerateClassName({
		productionPrefix: "au"
	});

	const { setDarkMode } = useStore();

	// useEffect(() => {
	// 	if (mode) {
	// 		setDarkMode(mode);
	// 		console.log("APP auth mode", { mode });
	// 	}
	// }, [mode]);

	return (
		<StylesProvider generateClassName={generateClassName}>
			<CssBaseline />
			<div>
				<Router history={history}>
					<Switch>
						<Route path="/auth/signin">
							<Signin onSignIn={onSignIn} mode={mode} theme={theme} />
						</Route>
						<Route path="/auth/signup">
							<SignUp onSignIn={onSignIn} />
						</Route>
					</Switch>
				</Router>
			</div>
		</StylesProvider>
	);
};

export default App;
