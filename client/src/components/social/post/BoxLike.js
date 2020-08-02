import React from "react";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import graphqlCall from "../../../functions/graphqlCall";

const BoxLike = () => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	return <div>Likes element</div>;
};

export default BoxLike;
