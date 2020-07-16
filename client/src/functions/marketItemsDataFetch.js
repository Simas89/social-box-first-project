const marketItemsDataFetch = async (callback) => {
	await fetch("http://localhost:2000/market", {
		method: "get",
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("token"),
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (Array.isArray(data)) {
				callback(data);
			} else {
				callback([]);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = marketItemsDataFetch;
