const logInFetch = async (logData, callback) => {
	await fetch("http://localhost:2000/login", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("token"),
		},
		body: JSON.stringify({
			aotoLogin: logData.aotoLogin,
			rememberMe: logData.rememberMe,
			// userName: "Simas",
			// userPsw: "000",

			userName: logData.inputValueName,
			userPsw: logData.inputValuePsw,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			callback(data);
		})
		.catch((err) => console.log(err));
};

export default logInFetch;
