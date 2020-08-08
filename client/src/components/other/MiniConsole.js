import React from "react";

const MiniConsole = () => {
	const [pointer, setPointer] = React.useState("");
	const [isActive, setIsActive] = React.useState(true);
	//eslint-disable-next-line
	const toggle = () => {
		setIsActive(!isActive);
	};

	React.useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				pointer === ">" ? setPointer(">_") : setPointer(">");
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isActive, pointer]);

	return pointer;
};

export default MiniConsole;
