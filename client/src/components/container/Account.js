import React from "react";
import "./css/Account.css";
import { useHistory } from "react-router-dom";
import myContext from "../../context/account/myContext";
import axios from "axios";
import verificationFetch from "../../functions/verificationFetch";
import ImgCropperis from "./ImgCroperis";
import graphqlFetch from "../../functions/graphqlFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import marketItemsDataFetch from "../../functions/marketItemsDataFetch";

const Account = () => {
	const context = React.useContext(myContext);

	const [file, setFile] = React.useState(null);
	const [delAcc, setDelAcc] = React.useState(0);
	const [psw, setPsw] = React.useState("");
	const [dellServerMsg, setDellServerMsg] = React.useState("");
	const [submitMsg, setSubmitMsg] = React.useState({ msg: "", pass: 0 });

	const [marketState, setMarketState] = React.useState([]);
	React.useEffect(() => {
		marketItemsDataFetch((data) => {
			setMarketState(data);
		});
	}, []);
	const checkAmountInContainer = (element) => {
		let value = 0;
		try {
			value =
				context.accountState.items[
					context.accountState.items.findIndex(
						(iii) => iii.itemName === element.itemName
					)
				].amount;
		} finally {
			return value;
		}
	};

	// console.log(psw);
	// console.log(delAcc);

	const history = useHistory();

	const accVerification = () => {
		verificationFetch((msg) => {
			setSubmitMsg({ msg: msg.status, pass: msg.pass });
		});
	};

	const fileHandler = (e) => {
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	let url;
	if (file) {
		url = URL.createObjectURL(file);
	}

	const uploadResult = async (croppedImage) => {
		let blob = await fetch(croppedImage).then((r) => r.blob());

		const fd = new FormData();
		fd.append("myFile", blob);

		const data = await axios.post("/upload", fd, {
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

	const submitDelete = () => {
		if (psw.length < 3) {
			console.log("less");
			setDellServerMsg("Please enter your password");
		} else {
			fetch("/delete", {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					userName: context.accountState.user,
					password: psw,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data === "Wrong password") {
						setDellServerMsg("Incorrect password");
					} else if (data === "OK") {
						console.log("deleting acc and log out");
						localStorage.clear();
						sessionStorage.clear();
						// context.logOff();
						history.push("/");
					} else {
						console.log(data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const cancelDelete = () => {
		setDelAcc(0);
		setPsw("");
	};

	const paramOnline = () => {
		graphqlFetch(
			`setOnlineParam( userName: "${
				context.accountState.user
			}", param: "${!context.accountState.settings.showOnline}" )`,
			(res) => {
				context.accountState.setOnline(res.setOnlineParam);
			}
		);
	};
	// console.log(context.accountState.settings.showOnline);

	return (
		<div className='acc-body'>
			<div className={`top ${file && "gridtc"}`}>
				{!file && (
					<div className='img-div' onClick={handleBtnClick}>
						<img
							alt=''
							src={`data:${context.accountState.profilePic.mimetype};base64,${context.accountState.profilePic.base64}`}></img>
					</div>
				)}
				<div className={`info-div ${file && "none"}`}>
					<div className='main-info'>
						<p className='userName'>{context.accountState.user}</p>

						{context.accountState.verified ? (
							<React.Fragment>
								<i className='fas fa-ribbon ribon'></i>
								<p>{context.accountState.email}</p>
							</React.Fragment>
						) : (
							<div className='not-verified'>
								<p>Account is not verified</p>

								<div className='email'>
									<div className='input'>
										<input
											type='email'
											placeholder='Please confirm your email'></input>
										<button onClick={accVerification}>Submit</button>
									</div>
									<p
										className={`submitMsg ${submitMsg.pass ? "pass" : "fail"}`}>
										{submitMsg.msg}
									</p>
								</div>
							</div>
						)}
						<p>Member since {context.accountState.dateJoined.toString()} </p>
						<div className='settings-divider'>
							<FontAwesomeIcon className='icon' icon={faCog} />
							<div className='line'></div>
						</div>
						<div className='show-online'>
							<span>Show my online status</span>
							<input
								className='checkbox'
								type='checkbox'
								checked={context.accountState.settings.showOnline}
								onChange={paramOnline}
							/>
						</div>
					</div>
				</div>
				<ImgCropperis
					imgurl={url}
					uploadResult={uploadResult}
					cancel={() => setFile(null)}
				/>
			</div>
			<div className='bottom'>
				<p>Cr: {context.accountState.credits}</p>
				<div className='bottom-market'>
					{marketState.map((element) => (
						<Item
							key={element.id}
							displayedAt={"MARKET"}
							pending={context.accountState.pending}
							credits={context.accountState.credits}
							itemName={element.itemName}
							price={element.price}
							amount={checkAmountInContainer(element)}
						/>
					))}
				</div>
			</div>
			<div className='delete-acc'>
				{!delAcc ? (
					<button className='del-acc-btn' onClick={() => setDelAcc(1)}>
						Delete account
					</button>
				) : (
					<div>
						<p>{dellServerMsg}</p>
						<input
							type='password'
							placeholder='Confirm Password'
							value={psw}
							onChange={(e) => setPsw(e.target.value)}></input>
						<button className='del-acc-btn' onClick={submitDelete}>
							Delete
						</button>
						<button className='del-acc-btn-no' onClick={cancelDelete}>
							Cancel
						</button>
					</div>
				)}
			</div>

			<input
				ref={inputFileRef}
				type='file'
				onChange={fileHandler}
				style={{ display: "none" }}
			/>
		</div>
	);
};

export default Account;
