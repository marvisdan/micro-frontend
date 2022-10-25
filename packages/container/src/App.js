import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
	StylesProvider,
	createGenerateClassName
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();

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
	createBrowserHistory;
	return (
		<Router history={history}>
			<StylesProvider generateClassName={generateClassName}>
				<div>
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
								/>
							</Route>
							<Route path="/dashboard">
								{!isSignedIn ? <Redirect to="/" /> : <DashboardLazy />}
							</Route>
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</Router>
	);
};
