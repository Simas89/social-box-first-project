import React from "react";
import styled from "styled-components";
import { Input, Icon, Button, Form } from "semantic-ui-react";

function LoginRegister() {
	const [LR, setLR] = React.useState(0);
	const [rememberMe, setRememberMe] = React.useState(0);
	// console.log("LR:", LR);
	// console.log("rememberMe:", rememberMe);
	const inputMarginTop = () => {
		if (LR) return window.innerHeight / 70;
		else return window.innerHeight / 30;
	};

	console.log(inputMarginTop());

	return (
		<WrapperLoginRegister>
			<h1>{LR ? "Register new account" : "Log in"}</h1>
			<div className='input-fields'>
				<Input
					// icon='user'
					icon={<Icon name='user' size='large' />}
					style={{ marginTop: `${inputMarginTop()}px` }}
					iconPosition='left'
					className='txt-input'
					type='text'
					spellCheck='false'
					transparent></Input>

				<Input
					icon={<Icon name='key' size='large' />}
					style={{ marginTop: `${inputMarginTop()}px` }}
					iconPosition='left'
					className='txt-input'
					type='password'
					spellCheck='false'
					transparent></Input>
				<Input
					style={LR ? {} : { display: "none" }}
					icon={<Icon name='key' size='large' />}
					style={
						LR
							? { marginTop: `${inputMarginTop()}px` }
							: { display: "none", marginTop: `${inputMarginTop()}px` }
					}
					iconPosition='left'
					className='txt-input'
					type='password'
					spellCheck='false'
					transparent></Input>
				<div style={{ display: "flex" }}>
					<p className='forgot-password'>SOME ERROR MESSAGES?</p>
				</div>
			</div>

			<Form className='forma'>
				<div onClick={() => setRememberMe(!rememberMe)} className='radio'>
					<div
						className='radio-ring'
						style={rememberMe ? { border: "2px solid white" } : {}}>
						<div
							className='radio-ring-inside'
							style={
								rememberMe ? { backgroundColor: "white", opacity: 1 } : {}
							}></div>
					</div>
				</div>

				<Button className='batonas-log-reg' animated>
					<Button.Content visible>{LR ? "Register" : "Log in"}</Button.Content>
					<Button.Content hidden>
						<Icon size='large' name='sign in' />
					</Button.Content>
				</Button>
			</Form>
			<div className='log-reg-switch'>
				{LR ? "Already a user? " : "Dont have an account yet? "}
				<span onClick={() => setLR(!LR)}>{LR ? " Log in" : " Register"}</span>
			</div>
		</WrapperLoginRegister>
	);
}
const WrapperLoginRegister = styled.div`
	/* position: absolute; */
	* {
		font-weight: 100;
	}
	height: 100%;
	position: relative;
	transition: 0.4s;
	width: 50%;
	/* border: 1px solid white; */
	padding: 20px 50px 0 50px;
	display: flex;
	flex-direction: column;

	h1 {
		color: rgb(200, 200, 200);
		align-self: flex-start;
	}

	.input-fields {
		/* border: 1px solid blue; */
		height: 100%;

		.txt-input {
			width: 100%;
			height: 4rem;
			color: white !important;
			text-decoration: none;
			border-bottom: 1px solid white;
			/* margin-top: 30px; */
			transition: 0.3s;
		}
		.txt-input input {
			color: white !important;
			font-size: 1.5rem;
		}
		.forgot-password {
			color: white;
			margin: auto;
			margin-top: 10px;
			/* border: 1px solid white; */

			/* top: 0; */
			/* float: right; */
		}
	}
	.forma {
		position: relative;
		bottom: 0px;
		width: 100%;
		margin: auto auto 30px auto;
		/* border: 1px solid white; */

		.WHITE {
			color: white !important;
			opacity: 1 !important;
			border: 2px solid white !important;
		}

		.radio {
			position: absolute;

			border-bottom: 1px solid white;
			height: 100%;
			width: 50px;
			display: flex;
			justify-content: center;
			align-items: center;

			.radio-ring {
				border: 2px solid rgb(149, 150, 173);
				height: 25px;
				width: 25px;
				border-radius: 50%;
				transition: 0.1s;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					transition: 0.1s;
					cursor: pointer;
				}

				&:hover .radio-ring-inside {
					transition: 0.2s;
					opacity: 0.5;
				}
				.radio-ring-inside {
					opacity: 0;
					height: 11px;
					width: 11px;
					border-radius: 50%;
					background-color: rgb(149, 150, 173);
					transition: 0.2s;
				}
			}
		}

		.batonas-log-reg {
			background-color: rgba(0, 0, 0, 0) !important;
			color: rgb(190, 190, 190);
			font-size: 1.2rem;
			border-bottom: 1px solid white;
			border-radius: 0;
			width: 30%;
			padding: 20px;
			left: 50px;

			&:hover {
				color: white;
			}
			&:active {
				color: white;
			}
			&:focus {
				color: white;
			}
		}
	}
	.log-reg-switch {
		color: rgb(200, 200, 200);
		/* border: 1px solid white; */
		margin-bottom: 40px;
		span {
			font-weight: bold;
			cursor: pointer;
			color: #01a4e9;
		}
	}

	@media (max-width: 768px) {
		width: 100vw;
	}
	@media (max-height: 700px) {
		height: 100%;
		.txt-input {
			width: 50%;
			height: 4rem;
		}
	}
`;

export default LoginRegister;
