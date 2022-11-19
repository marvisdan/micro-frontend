import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
	StylesProvider,
	createGenerateClassName,
	useTheme,
	ThemeProvider,
	createTheme
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { CssBaseline } from "@material-ui/core";
import { useStore } from "./store/useDarkMode";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();

// export const themeLight = createTheme({
// 	palette: {
// 		background: {
// 			default: "#fafafa",
// 			paper: "#fff"
// 		},
// 		type: "light"
// 	}
// });

// export const themeDark = createTheme({
// 	palette: {
// 		background: {
// 			default: "#000"
// 		},
// 		type: "dark",
// 		text: {
// 			primary: "#ffffff"
// 		}
// 	}
// });

export default () => {
	const [isSignedIn, setSignedIn] = useState(false);

	useEffect(() => {
		if (isSignedIn) {
			history.push("/dashboard");
		}
	}, [isSignedIn]);

	const generateClassName = createGenerateClassName({
		productionPrefix: "co"
	});

	// const [mode, setMode] = useState("light");
	// const [light, setLight] = useState(true);
	const { mode } = useStore();
	console.log("APP.js zustand mode", mode);

	const theme = createTheme({
		palette: {
			type: mode
		}
	});

	// const colorMode = React.useMemo(
	// 	() => ({
	// 		mode,
	// 		toggleColorMode: () => {
	// 			setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	// 		},

	// 		toggleColorType: () => {
	// 			setLight((prev) => !prev);
	// 		},
	// 		changeTheme: (mode) => {
	// 			setThemeState((prevTheme) => {
	// 				return {
	// 					...prevTheme,
	// 					palette: {
	// 						...prevTheme.palette,
	// 						type: mode === "light" ? "dark" : "light"
	// 					}
	// 				};
	// 			});
	// 		}
	// 	}),
	// 	[]
	// );

	return (
		<Router history={history}>
			<StylesProvider generateClassName={generateClassName}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Header
						onSignOut={() => {
							setSignedIn(false);
						}}
						isSignedIn={isSignedIn}
					/>

					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path="/auth">
								<AuthLazy
									onSignIn={() => {
										setSignedIn(true);
									}}
									theme={theme}
									mode={mode}
								/>
							</Route>
							<Route path="/dashboard">
								{!isSignedIn ? <Redirect to="/" /> : <DashboardLazy />}
							</Route>
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</ThemeProvider>
			</StylesProvider>
		</Router>
	);
};
