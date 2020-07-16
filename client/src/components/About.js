import React from "react";

import myContext from "./context/account/myContext";

function About() {
	const context = React.useContext(myContext);

	return (
		<div onClick={() => context.setAccountStateALL(true)}>
			{console.log(context)}Hello from About
		</div>
	);
}

export default About;
