import React from "react";
import "./css/Formike.css";
// import "./css/_scss-variables.scss";
import { Input, Icon, Button, Form, TextArea } from "semantic-ui-react";
import landingContext from "../context/landing/landingContext";
import MasterButton from "./MasterButton";

const Formike = (props) => {
	const contextLanding = React.useContext(landingContext);
	const [canAnimatePsw2, setCanAnimatePsw2] = React.useState({
		expand: false,
		collapse: false,
		display: false,
	});

	// SET AND CORRECT INPUTS
	const minLengthUser = 3;
	const minLengthPsw = 6;
	const userInputsChange = (e, type) => {
		const value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
		// dispatch({ type: SET_USER_INPUT, payload: { type: type, value: value } });
		contextLanding.set_user_input({ type: type, value: value });
	};

	return (
		<div className='form-wrapper'>
			{props.type === "LOGIN" && (
				<React.Fragment>
					<h1
						onClick={() =>
							contextLanding.toggle_focused({ type: "userName", value: true })
						}>
						{contextLanding.state.LR ? "Create new account" : "Log in"}
					</h1>
					<div className='inputs-wrapper'>
						{/*-------------          USER NAME        ---------------  */}

						<div
							className={`single-input-wrapper ${
								contextLanding.state.focused.userName
									? "icon-bright"
									: "icon-fade"
							}`}>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										contextLanding.state.userInputs.userName.length >=
										minLengthUser
											? { display: "block" }
											: { display: "none" }
									}
									className={
										contextLanding.state.focused.userName
											? "icon-bright"
											: "icon-fade"
									}
									name={"check"}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "userName")}
								value={contextLanding.state.userInputs.userName}
								onFocus={() =>
									contextLanding.toggle_focused({
										type: "userName",
										value: true,
									})
								}
								onBlur={() =>
									contextLanding.toggle_focused({
										type: "userName",
										value: false,
									})
								}
								icon={<Icon name='user' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='text'
								spellCheck='false'
								transparent></Input>
						</div>
						{/*-------------          PASSWORD 1       ---------------  */}
						<div
							className={`single-input-wrapper ${
								contextLanding.state.focused.psw1 ? "icon-bright" : "icon-fade"
							}`}>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										contextLanding.state.userInputs.psw1.length >= minLengthPsw
											? { display: "block" }
											: { display: "none" }
									}
									className={
										contextLanding.state.focused.psw1
											? "icon-bright"
											: "icon-fade"
									}
									name={
										contextLanding.state.userInputs.psw1.length >= minLengthPsw
											? "check"
											: "delete"
									}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "psw1")}
								value={contextLanding.state.userInputs.psw1}
								onFocus={() =>
									contextLanding.toggle_focused({ type: "psw1", value: true })
								}
								onBlur={() =>
									contextLanding.toggle_focused({ type: "psw1", value: false })
								}
								icon={<Icon className='icon-input' name='key' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='password'
								spellCheck='false'
								transparent></Input>
						</div>
						{/*-------------     PASSWORD 2  ---------------  */}
						{!contextLanding.state.initialRender ? (
							<div
								className={`single-input-wrapper ${
									contextLanding.state.LR ? "input-expand" : "input-collapse"
								} ${
									contextLanding.state.focused.psw2
										? "icon-bright"
										: "icon-fade"
								}`}>
								<div className='single-input-wrapper-subIcon'>
									<Icon
										style={
											contextLanding.state.userInputs.psw2.length >=
											minLengthPsw
												? { display: "block" }
												: { display: "none" }
										}
										className={
											contextLanding.state.focused.psw2
												? "icon-bright"
												: "icon-fade"
										} // add display one or opacity 0 depending on LR
										name={
											contextLanding.state.userInputs.psw2.length >=
												minLengthPsw &&
											contextLanding.state.userInputs.psw2 ===
												contextLanding.state.userInputs.psw1
												? "check"
												: "delete"
										}
										size='small'
									/>
								</div>
								<Input
									onChange={(e) => userInputsChange(e, "psw2")}
									value={contextLanding.state.userInputs.psw2}
									onFocus={() =>
										contextLanding.toggle_focused({ type: "psw2", value: true })
									}
									onBlur={() =>
										contextLanding.toggle_focused({
											type: "psw2",
											value: false,
										})
									}
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

						<MasterButton remember={0} stage1='SEND' stage2='send' />
						<MasterButton
							remember={1}
							stage1='Log in'
							stage2={contextLanding.state.LR ? "user plus" : "sign in"}
						/>
						<div className='log-reg-switch'>
							{contextLanding.state.LR
								? "Already a user? "
								: "Don't have an account? "}
							<span
								onClick={() => {
									contextLanding.toggle_lr();
									contextLanding.initial_render_off();
								}}>
								{contextLanding.state.LR ? " Log in" : " Register"}
							</span>
						</div>
					</div>
				</React.Fragment>
			)}
			{/*-----------------------------------             CONTACT MODE             ---------------------------------*/}
			{props.type === "CONTACT" && (
				<React.Fragment>
					<h1>Contact Me</h1>
					<div className='inputs-wrapper'>
						<div
							className={`single-input-wrapper ${
								contextLanding.state.focused.senderName
									? "icon-bright"
									: "icon-fade"
							}`}>
							<Input
								onFocus={() =>
									contextLanding.toggle_focused({
										type: "senderName",
										value: true,
									})
								}
								onBlur={() =>
									contextLanding.toggle_focused({
										type: "senderName",
										value: false,
									})
								}
								icon={<Icon name='user' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='text'
								spellCheck='false'
								transparent></Input>
						</div>
						<div
							className={`single-input-wrapper ${
								contextLanding.state.focused.senderMail
									? "icon-bright"
									: "icon-fade"
							}`}>
							<Input
								onFocus={() =>
									contextLanding.toggle_focused({
										type: "senderMail",
										value: true,
									})
								}
								onBlur={() =>
									contextLanding.toggle_focused({
										type: "senderMail",
										value: false,
									})
								}
								icon={<Icon name='mail outline' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='text'
								spellCheck='false'
								transparent></Input>
						</div>
						<Form className='forma'>
							<Icon
								className={
									contextLanding.state.focused.textArea
										? "iconas-white"
										: "iconas-grey"
								}
								name='pencil'
								size='large'
								color='grey'
							/>
							<div
								className={` ${
									contextLanding.state.focused.textArea
										? "icon-bright"
										: "icon-fade"
								}`}>
								<TextArea
									onFocus={() =>
										contextLanding.toggle_focused({
											type: "textArea",
											value: true,
										})
									}
									onBlur={() =>
										contextLanding.toggle_focused({
											type: "textArea",
											value: false,
										})
									}
									className='text-area'
									spellCheck='false'
								/>
							</div>
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
