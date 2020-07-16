import React from "react";
import { useHistory } from "react-router-dom";
import { Radio } from "semantic-ui-react";
import styled from "styled-components";
import logInFetch from "../functions/logInFetch";
import myContext from "./context/account/myContext";

function Login(props) {
	const context = React.useContext(myContext);
	const [rememberMe, setRememberMe] = React.useState(false);
	const history = useHistory();

	React.useEffect(() => {
		if (localStorage.getItem("rememberme")) {
			console.log("Executing auto-login");
			logInCheck();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let timer = null;
	const errorMessage = (message) => {
		clearTimeout(timer);
		const pRed = document.querySelector(".errorMessageLabel");
		pRed.textContent = message;
		timer = setTimeout(() => {
			pRed.textContent = "";
			clearTimeout(timer);
		}, 3000);
	};

	const logInCheck = () => {
		const inputValueName = document.querySelector('input[name="name"]').value;
		const inputValuePsw = document.querySelector('input[name="psw"]').value;

		logInFetch(
			{
				inputValueName: inputValueName,
				inputValuePsw: inputValuePsw,
				rememberMe: rememberMe,
				aotoLogin: localStorage.getItem("rememberme"),
			},
			(data) => {
				if (data.status === "LOGGING IN") {
					history.push("/container");
					console.log(data);
					context.accountState.logIn(data);
				} else errorMessage(data.status);
			}
		);
	};
	// console.log();

	return (
		<Wrapper>
			{props.logged && history.push("/container")}

			<div className='InputDiv'>
				<h3>Log in</h3>
				<p className='subTitle'>
					Login to your account to manage contents of the container
				</p>
				<input
					className='input-field'
					type='text'
					name='name'
					required
					minLength='6'
					placeholder='User Name'></input>
				<br></br>

				<input type='password' name='psw' placeholder='Password'></input>
				<div>
					<p className='errorMessageLabel'></p>
				</div>
				<br></br>
				<Radio
					onChange={() => setRememberMe(!rememberMe)}
					checked={rememberMe}
					toggle
					label='Remember me'
				/>

				<button onClick={logInCheck}>Log In</button>
				<p className='register'>
					Dont have an account yet?{" "}
					<span onClick={() => history.push("/register")}>Register</span>
				</p>
			</div>
			<div className='bg'></div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	/* position: absolute; */
	display: grid;
	grid-template-columns: minmax(200px, 400px) minmax(100px, 300px);
	max-width: 700px;
	margin: auto;
	border: 1px solid black;
	border-radius: 20px;
	overflow: hidden;

	.InputDiv {
		padding: 40px;
		display: flex;
		flex-direction: column;
		/* padding: 50px; */
		h3 {
			font-size: 1.7rem;
			margin: 0 0 10px 0;
		}
		.subTitle {
			font-size: 0.85rem;
			margin: 0 0 20px 0;
		}
		input {
			height: 20px;
			margin: 5px 0;
			padding: 15px;
			font-size: 1rem;
			background-color: white !important;
			border: none;
			border-bottom: 1px solid grey;
		}
		div {
			position: relative;
			.errorMessageLabel {
				font-size: 0.9rem;
				color: red;
				position: absolute;
			}
		}
		button {
			height: 50px;
			margin: 40px 0;
			color: white;
			font-size: 1.2rem;
			background-color: #007fed;
			border: none;
		}
	}
	.register {
	}
	span {
		color: #007fed;
		font-weight: bold;
		cursor: pointer;
	}
	.bg {
		/* background-color: whitesmoke; */
		background-image: url(https://www.aar.org/wp-content/uploads/2017/12/Abstract-Intermodal-Stacks.jpg);
		background-size: cover;
		background-position: center;
	}
`;

export default Login;
