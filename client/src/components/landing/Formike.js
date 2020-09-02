import React from "react";
import "./css/Formike.css";
import { Input, Icon, Form, TextArea } from "semantic-ui-react";
import landingContext from "../../context/landing/landingContext";
// import accountContext from "../context/account/myContext";
import MasterButtonLogin from "./MasterButtonLogin";
import MasterButtonSend from "./MasterButtonSend";
import LandingLogged from "./LandingLogged";

const Formike = (props) => {
	const contextLanding = React.useContext(landingContext);
	// const contextAccount = React.useContext(accountContext);

	const minLengthUser = 3;
	const minLengthPsw = 3;
	const userInputsChange = (e, type) => {
		// const value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
		const value = e.target.value.replace(/[^A-Za-z0-9~!@#$%^&()_|/]/gi, "");
		// const value = e.target.value;
		contextLanding.set_user_input({ type: type, value: value });
		console.log(value);
	};

	const isInputsValid = (type) => {
		const results = {
			userName:
				contextLanding.state.userInputs.userName.length >= minLengthUser
					? "OK"
					: `User name must contain atleast ${minLengthUser} characters`,
			psw1:
				contextLanding.state.userInputs.psw1.length >= minLengthPsw
					? "OK"
					: `Password must contain atleast ${minLengthPsw} characters`,
			psw2:
				contextLanding.state.userInputs.psw2.length >= minLengthPsw
					? "OK"
					: `Password must contain atleast ${minLengthPsw} characters`,
			pswMach:
				contextLanding.state.userInputs.psw1 ===
				contextLanding.state.userInputs.psw2
					? "OK"
					: "Passwords do not mach",
		};

		switch (type) {
			case "userName":
				return results.userName;

			case "psw1":
				return results.psw1;

			case "psw2":
				return results.psw2;

			case "pswMach":
				return results.pswMach;

			case "buttonProp": {
				if (results.userName !== "OK") {
					return results.userName;
				} else {
					if (results.psw1 !== "OK") {
						return results.psw1;
					} else {
						if (!contextLanding.state.LR) {
							return "OK";
						} else {
							if (results.pswMach !== "OK") {
								return results.pswMach;
							} else {
								return "OK";
							}
						}
					}
				}
			}
			default:
				break;
		}
	};
	// console.log(contextAccount.accountState);

	return (
		<div className='form-wrapper'>
			{props.type === "LOGIN" &&
				(!sessionStorage.getItem("MY_CONTAINER_STATE") ? (
					<React.Fragment>
						<h1
							onClick={() =>
								contextLanding.toggle_focused({ type: "userName", value: true })
							}>
							{contextLanding.state.LR ? `  Create new account` : "Log in"}
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
											isInputsValid("userName") === "OK"
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
									contextLanding.state.focused.psw1
										? "icon-bright"
										: "icon-fade"
								}`}>
								<div className='single-input-wrapper-subIcon'>
									<Icon
										style={
											isInputsValid("psw1") === "OK"
												? { display: "block" }
												: { display: "none" }
										}
										className={
											contextLanding.state.focused.psw1
												? "icon-bright"
												: "icon-fade"
										}
										name={isInputsValid("psw1") === "OK" ? "check" : "delete"}
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
										contextLanding.toggle_focused({
											type: "psw1",
											value: false,
										})
									}
									icon={<Icon className='icon-input' name='key' size='large' />}
									iconPosition='left'
									className='txt-input'
									type='password'
									spellCheck='false'
									transparent></Input>
							</div>
							{/*-------------     PASSWORD 2  --------------- !contextLanding.state.initialRender contextLanding.state.LR ? "input-expand" : "input-collapse"*/}
							{contextLanding.state.canAnimatePsw2.display ? (
								<div
									className={`single-input-wrapper ${
										contextLanding.state.canAnimatePsw2.expand && "input-expand"
									} 
									${contextLanding.state.canAnimatePsw2.collapse && "input-collapse"}
								 ${contextLanding.state.focused.psw2 ? "icon-bright" : "icon-fade"}`}>
									<div className='single-input-wrapper-subIcon'>
										<Icon
											style={
												isInputsValid("psw2") === "OK"
													? { display: "block" }
													: { display: "none" }
											}
											className={`${
												contextLanding.state.focused.psw2
													? "icon-bright"
													: "icon-fade"
											} ${
												contextLanding.state.canAnimatePsw2.expand &&
												"icon-no-opacity"
											}`}
											name={
												isInputsValid("psw2") === "OK" &&
												isInputsValid("pswMach") === "OK"
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
											contextLanding.toggle_focused({
												type: "psw2",
												value: true,
											})
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
							<MasterButtonLogin
								msg1={isInputsValid("buttonProp")}
								stage1={contextLanding.state.LR ? "Register" : "Log in"}
								stage2={contextLanding.state.LR ? "user plus" : "sign in"}
							/>

							<div className='log-reg-switch'>
								{contextLanding.state.LR
									? "Already a user? "
									: "Don't have an account? "}
								<span
									onClick={() => {
										if (contextLanding.state.LR) {
											contextLanding.can_animate_psw2({
												expand: false,
												collapse: true,
												display: true,
											});

											setTimeout(
												() =>
													contextLanding.can_animate_psw2({
														expand: false,
														collapse: false,
														display: false,
													}),
												400
											);
										} else {
											contextLanding.can_animate_psw2({
												expand: true,
												collapse: false,
												display: true,
											});
											setTimeout(
												() =>
													contextLanding.can_animate_psw2({
														expand: false,
														collapse: false,
														display: true,
													}),
												400
											);
										}

										contextLanding.toggle_lr();
									}}>
									{contextLanding.state.LR ? " Log in" : " Register"}
								</span>
							</div>
						</div>
					</React.Fragment>
				) : (
					<LandingLogged />
				))}
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
								value={contextLanding.state.msgInputs.guest}
								onChange={(e) =>
									contextLanding.set_msg_input({
										type: "guest",
										value: e.target.value,
									})
								}
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
								value={contextLanding.state.msgInputs.email}
								onChange={(e) =>
									contextLanding.set_msg_input({
										type: "email",
										value: e.target.value,
									})
								}
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
									value={contextLanding.state.msgInputs.msg}
									onChange={(e) =>
										contextLanding.set_msg_input({
											type: "msg",
											value: e.target.value,
										})
									}
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
								{navigator.appVersion.indexOf("Chrome/") !== -1 ? (
									<div className='text-area-resizer'>
										<div className='text-area-resizer-sub sub-1'></div>
										<div className='text-area-resizer-sub sub-2'></div>
										<div className='text-area-resizer-sub sub-3'></div>
										<div className='text-area-resizer-sub sub-4'></div>
										<div className='text-area-resizer-sub sub-5'></div>
										<div className='text-area-resizer-sub sub-6'></div>
									</div>
								) : null}
							</div>
						</Form>
						<MasterButtonSend msg1={"OK"} stage1='SEND' stage2='send' />
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Formike;
