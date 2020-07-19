import React from "react";
import "./css/Formike.css";
import { Input, Icon, Button, Form, TextArea } from "semantic-ui-react";

const Formike = (props) => {
	const [LR, setLR] = React.useState(1);
	const [rememberMe, setRememberMe] = React.useState(0);
	const [focused, setFocused] = React.useState({
		userName: false,
		psw1: false,
		psw2: false,
		senderName: false,
		senderMail: false,
		textArea: false,
	});
	const [userInputs, setUserInputs] = React.useState({
		userName: "",
		psw1: "",
		psw2: "",
	});

	// SET AND CORRECT INPUTS
	const minLengthUser = 3;
	const minLengthPsw = 6;
	const userInputsChange = (e, type) => {
		const value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");

		if (value.length <= 18) setUserInputs({ ...userInputs, [type]: value });
	};

	return (
		<div className='form-wrapper'>
			{props.type === "LOGIN" && (
				<React.Fragment>
					<h1>{LR ? "Create new account" : "Log in"}</h1>
					<div className='inputs-wrapper'>
						{/*-------------          USER NAME        ---------------  */}
						<div className='single-input-wrapper'>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										userInputs.userName.length >= minLengthUser
											? { display: "block" }
											: { display: "none" }
									}
									className={focused.userName ? "icon-bright" : "icon-fade"}
									name={"check"}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "userName")}
								value={userInputs.userName}
								onFocus={() => setFocused({ ...focused, userName: true })}
								onBlur={() => setFocused({ ...focused, userName: false })}
								icon={<Icon name='user' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='text'
								spellCheck='false'
								transparent></Input>
						</div>
						{/*-------------          PASSWORD 1       ---------------  */}
						<div className='single-input-wrapper'>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										userInputs.psw1.length >= minLengthPsw
											? { display: "block" }
											: { display: "none" }
									}
									className={focused.psw1 ? "icon-bright" : "icon-fade"}
									name={
										userInputs.psw1.length >= minLengthPsw ? "check" : "delete"
									}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "psw1")}
								value={userInputs.psw1}
								onFocus={() => setFocused({ ...focused, psw1: true })}
								onBlur={() => setFocused({ ...focused, psw1: false })}
								icon={<Icon className='icon-input' name='key' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='password'
								spellCheck='false'
								transparent></Input>
						</div>
						{/*-------------     PASSWORD 2  ---------------  */}
						{LR ? (
							<div className='single-input-wrapper'>
								<div className='single-input-wrapper-subIcon'>
									<Icon
										style={
											userInputs.psw2.length >= minLengthPsw
												? { display: "block" }
												: { display: "none" }
										}
										className={focused.psw2 ? "icon-bright" : "icon-fade"}
										name={
											userInputs.psw2.length >= minLengthPsw &&
											userInputs.psw2 === userInputs.psw1
												? "check"
												: "delete"
										}
										size='small'
									/>
								</div>
								<Input
									onChange={(e) => userInputsChange(e, "psw2")}
									value={userInputs.psw2}
									onFocus={() => setFocused({ ...focused, psw2: true })}
									onBlur={() => setFocused({ ...focused, psw2: false })}
									icon={<Icon name='key' size='large' />}
									iconPosition='left'
									className='txt-input'
									type='password'
									spellCheck='false'
									transparent></Input>
							</div>
						) : (
							""
						)}
						<Form className='forma'>
							<div onClick={() => setRememberMe(!rememberMe)} className='radio'>
								<div
									className='radio-ring'
									style={rememberMe ? { opacity: "1" } : {}}>
									<div
										className='radio-ring-inside'
										style={rememberMe ? { opacity: 1 } : {}}></div>
								</div>
							</div>

							<Button className='batonas left35' animated>
								<Button.Content visible>
									{LR ? "Register" : "Log in"}
								</Button.Content>
								<Button.Content hidden>
									<Icon size='large' name={LR ? "user plus" : "sign in"} />
								</Button.Content>
							</Button>
						</Form>
						<div className='log-reg-switch'>
							{LR ? "Already a user? " : "Don't have an account? "}
							<span onClick={() => setLR(!LR)}>
								{LR ? " Log in" : " Register"}
							</span>
						</div>
					</div>
				</React.Fragment>
			)}
			{props.type === "CONTACT" && (
				<React.Fragment>
					<h1>Contact Me</h1>
					<div className='inputs-wrapper'>
						<Input
							onFocus={() => setFocused({ ...focused, senderName: true })}
							onBlur={() => setFocused({ ...focused, senderName: false })}
							icon={<Icon name='user' size='large' />}
							iconPosition='left'
							className='txt-input'
							type='text'
							spellCheck='false'
							transparent></Input>
						<Input
							onFocus={() => setFocused({ ...focused, senderMail: true })}
							onBlur={() => setFocused({ ...focused, senderMail: false })}
							icon={<Icon name='mail outline' size='large' />}
							iconPosition='left'
							className='txt-input'
							type='text'
							spellCheck='false'
							transparent></Input>
						<Form className='forma'>
							<Icon
								className={focused.textArea ? "iconas-white" : "iconas-grey"}
								name='pencil'
								size='large'
								color='grey'
							/>
							<TextArea
								onFocus={() => setFocused({ ...focused, textArea: true })}
								onBlur={() => setFocused({ ...focused, textArea: false })}
								className='text-area'
								spellCheck='false'
							/>
							<Button className='batonas' animated>
								<Button.Content visible>SEND</Button.Content>
								<Button.Content hidden>
									<Icon size='large' name='send' />
								</Button.Content>
							</Button>
							{/* <Button className='batonas'>SEND</Button> */}
						</Form>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Formike;
