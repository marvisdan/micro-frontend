import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
export default ({ onSignIn, mode, theme }) => {
	const ref = useRef(null);

	const history = useHistory(); // get the browser history of our container
	useEffect(() => {
		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname, // If you use react-route v6 use useLocation.pathname instead
			// see solution 3 https://stackoverflow.com/questions/68782781/react-router-v6-history-listen?fbclid=IwAR1Yo-hixu4H4pX8Hl_LdCiIdcbtoNQ8JO06AmjbNSaUBfBeFRYdjIZCEXo
			onNavigate: ({ pathname: nextPathname }) => {
				const { pathname } = history.location;
				if (pathname !== nextPathname) {
					history.push(nextPathname);
				}
			},
			onSignIn,
			mode,
			theme
		});
		history.listen(onParentNavigate);
	}, [theme, mode]); // put value here if you want to trigger a rerender and continue to pass this value( here: change the mode )

	return <div ref={ref} />;
};
