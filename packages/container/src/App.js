import React from "react";
import { mount } from "marketing/MarketingApp";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
console.log("here");
export default () => {
	return (
		<Router>
			<div>
				<Header />
				<MarketingApp />.
			</div>
		</Router>
	);
};
