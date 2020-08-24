const addRemoveUser = async (userName, isListed, callback) => {
	await fetch("http://localhost:2000/users/addremove", {
		method: "get",
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("token"),
			userName: userName,
			isListed,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			callback(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
export default addRemoveUser;
