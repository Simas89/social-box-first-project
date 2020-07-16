const registerFetch = (regData, callback) => {
	fetch("http://localhost:2000/register", {
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

module.exports = registerFetch;
