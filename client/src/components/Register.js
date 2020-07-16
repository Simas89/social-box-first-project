import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import registerFetch from "../functions/registerFetch";
import logInFetch from "../functions/logInFetch";

function Register(props) {
	const [stateGoLog, setStateGoLog] = React.useState(false);
	const history = useHistory();

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

	const registerCheck = () => {
		const inputValueName = document.querySelector('input[name="name"]').value;
		const inputValuePsw = document.querySelector('input[name="psw"]').value;
		const inputValuePsw2 = document.querySelector('input[name="psw2"]').value;

		if (inputValueName.length < 3 || inputValuePsw.length < 3) {
			errorMessage(
				"User Name and Password must be at least 3 characters long."
			);
		} else if (inputValuePsw !== inputValuePsw2) {
			errorMessage("Passwords do not match");
		} else
			registerFetch(
				{
					inputValueName: inputValueName,
					inputValuePsw: inputValuePsw,
				},
				(data) => {
					console.log(data);
					if (data.status === "USER REGISTERED")
						logInFetch(
							{
								inputValueName: inputValueName,
								inputValuePsw: inputValuePsw,
							},
							(data) => {
								if (data.status === "LOGGING IN") {
									props.logIn(data);
									console.log(props);
									history.push("/container");
								} else errorMessage(data.status.toLowerCase());
							}
						);
					else errorMessage(data.status.toLowerCase());
				}
			);
	};

	return (
		<Wrapper>
			<div className='InputDiv'>
				<h3>Register new account</h3>
				<p className='subTitle'>Create your container manager account</p>
				<input type='text' name='name' placeholder='User Name'></input>
				<br></br>
				<input
					className='input-field'
					type='password'
					name='psw'
					placeholder='Password'></input>
				<br></br>
				<input
					type='password'
					name='psw2'
					placeholder='Repeat password'></input>
				<br></br>
				<div>
					<p className='errorMessageLabel'></p>
				</div>
				<button onClick={registerCheck}>Register</button>
				<p>
					Already a user?{" "}
					<span onClick={() => setStateGoLog(true)}>Log In</span>
				</p>
				{stateGoLog && <Redirect to='/login' />}
			</div>
			<div className='bg'></div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
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
			height: 15px;
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
				top: -20px;
				font-size: 0.9rem;
				color: red;
				position: absolute;
			}
		}
		button {
			height: 50px;
			margin: 40px 0 10px;
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

export default Register;
