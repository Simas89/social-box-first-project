const tradeFetch = (data, user, token, callback) => {
	Object.assign(data, { user: user });
	// console.log("tradeFetch >", data);
	fetch("http://localhost:2000/container", {
		method: "post",
		headers: { "Content-Type": "application/json", "x-auth-token": token },
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === "TRANSACTION COMPLETED") {
				callback({
					logged: undefined,
					user: data.userName,
					credits: data.credits,
					items: data.items,
					pending: false,
				});
			} else {
				callback({
					logged: undefined,
					user: undefined,
					credits: undefined,
					items: undefined,
					pending: false,
				});
			}
			// console.log(data);
		})
		.catch((err) => {
			callback(undefined);
			console.log(err);
		});
};

export default tradeFetch;
