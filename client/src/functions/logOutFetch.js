const logOutFetch = async (userName) => {
	await fetch("http://localhost:2000/logout", {
		method: "get",
		headers: { "Content-Type": "application/json", userName },
	})
		.then((res) => res.json())
		.then((data) => {
			localStorage.clear();
			console.log(data);
		})
		.catch((err) => console.log(err));
};

export default logOutFetch;
