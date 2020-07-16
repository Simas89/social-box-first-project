import React from "react";
import { useHistory } from "react-router-dom";
import myContext from "./context/account/myContext";
import axios from "axios";
import { Input, Button, Form } from "semantic-ui-react";
import verificationFetch from "../functions/verificationFetch";

const Account = () => {
	const context = React.useContext(myContext);
	const [file, setFile] = React.useState(null);

	const history = useHistory();

	const accVerification = () => {
		let submitMsg = document.querySelector(".submitMsg");
		verificationFetch((msg) => {
			submitMsg.textContent = msg.status;
		});
	};

	const fileHandler = (e) => {
		// console.log(e.target.files[0]);
		setFile(e.target.files[0]);
	};
	const fileUpload = async () => {
		if (file) {
			const fd = new FormData();
			fd.append("myFile", file);

			const data = await axios.post("http://localhost:2000/upload", fd, {
				headers: {
					"Content-Type": "multipart/form-data",
					user: context.accountState.user,
				},
			});
			context.accountState.setAccountState({
				...context.accountState,
				profilePic: data.data,
			});
			// sessionStorage.setItem(
			// 	"MY_CONTAINER_STATE",
			// 	JSON.stringify(context.accountState)
			// );
		}
	};
	// console.log(context.accountState.profilePic);

	return (
		<React.Fragment>
			<Form>
				<Input type='file' onChange={fileHandler} />
				<Button onClick={fileUpload} className='Button'>
					Upload
				</Button>
			</Form>
			<img
				alt=''
				src={`data:${context.accountState.profilePic.mimetype};base64,${context.accountState.profilePic.base64}`}></img>
			<p
				onClick={() =>
					history.push(`/container/users/${context.accountState.user}`)
				}>
				User: {context.accountState.user}
			</p>
			<p>Joined: {context.accountState.dateJoined.toString()} </p>
			{!context.accountState.verified ? (
				<React.Fragment>
					<p>Account status: Not Verified</p>
					<input
						className='emailInput'
						type='email'
						placeholder='Please confirm your email'></input>
					<br></br>
					<button onClick={accVerification}>Submit</button>
					<p className='submitMsg'></p>
				</React.Fragment>
			) : (
				<React.Fragment>
					<p>Account status: Verified</p>
					<p>Email: {context.accountState.email}</p>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Account;
