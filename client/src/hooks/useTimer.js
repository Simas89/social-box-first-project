import React from "react";

const useTimer = (isActive, seconds, callback) => {
	const [periods, setPeriods] = React.useState(0);

	React.useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setPeriods(periods + 1);
			}, seconds * 1000);
		}
		return () => clearInterval(interval);
	}, [isActive, periods, seconds]);
	periods && callback(periods);
};

export default useTimer;
