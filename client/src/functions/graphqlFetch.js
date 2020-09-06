const graphqlFetch = (query, callback) => {
	fetch("/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("token"),
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: `{
       ${query}
      }
     `,
		}),
	})
		.then((r) => r.json())
		.then((data) => {
			console.log("ROOT: ", data);
			callback(data.data);
		});
};

export default graphqlFetch;
