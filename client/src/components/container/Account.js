import React from "react";
import "./css/Account.css";
import { useHistory } from "react-router-dom";
import myContext from "../../context/account/myContext";
import axios from "axios";
import verificationFetch from "../../functions/verificationFetch";
import ImgCropperis from "./ImgCroperis";

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
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	console.log(file);

	let url;
	if (file) {
		url = URL.createObjectURL(file);
	}

	const uploadResult = async (croppedImage) => {
		let blob = await fetch(croppedImage).then((r) => r.blob());

		const fd = new FormData();
		fd.append("myFile", blob);

		const data = await axios.post("http://localhost:2000/upload", fd, {
			headers: {
				"Content-Type": "multipart/form-data",
				user: context.accountState.user,
			},
		});

		setFile(null);
		context.accountState.setAccountState({
			...context.accountState,
			profilePic: data.data,
		});
	};

	const inputFileRef = React.useRef(null);

	const handleBtnClick = () => {
		inputFileRef.current.click();
	};

	return (
		<div className='acc-body'>
			{!file && (
				<div className='img-div' onClick={handleBtnClick}>
					<img
						alt=''
						src={`data:${context.accountState.profilePic.mimetype};base64,${context.accountState.profilePic.base64}`}></img>
				</div>
			)}

			<input
				ref={inputFileRef}
				type='file'
				onChange={fileHandler}
				style={{ display: "none" }}
			/>

			<ImgCropperis
				imgurl={url}
				uploadResult={uploadResult}
				cancel={() => setFile(null)}
			/>

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
		</div>
	);
};

export default Account;
