module.exports = async (searchValue, myContactsOnly, callback) => {
	await fetch("http://localhost:2000/users", {
		method: "get",
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("token"),
			searchValue,
			myContactsOnly,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
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
