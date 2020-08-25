const findUsersFetch = async (searchValue, myContactsOnly, callback) => {
	await fetch("/users", {
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

export default findUsersFetch;
