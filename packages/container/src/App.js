import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
	StylesProvider,
	createGenerateClassName
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

export default () => {
	const [isSignedIn, setSignedIn] = useState(false);

	const generateClassName = createGenerateClassName({
		productionPrefix: "co"
	});

	return (
		<BrowserRouter>
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
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</BrowserRouter>
	);
};
