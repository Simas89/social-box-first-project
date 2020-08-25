const registerFetch = (regData, callback) => {
	fetch("/register", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			userName: regData.inputValueName,
			userPsw: regData.inputValuePsw,
		}),
	})
		.then((res) => res.json())
		.then((data) => callback(data))
		.catch((err) => console.log(err));
};

export default registerFetch;
