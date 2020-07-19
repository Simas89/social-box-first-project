import React from "react";
import "./css/Formike.css";
import { Input, Icon, Button, Form, TextArea } from "semantic-ui-react";

const TOGGLE_LR = "TOGGLE_LR";
const TOGGLE_REMEMBER_ME = "TOGGLE_REMEMBER_ME";
const SET_USER_INPUT = "SET_USER_INPUT";
const TOGGLE_FOCUSED = "TOGGLE_FOCUSED";

const Formike = (props) => {
	const initialState = {
		LR: 0,
		rememberMe: 0,
		userInputs: { userName: "", psw1: "", psw2: "" },
		focused: {
			userName: false,
			psw1: false,
			psw2: false,
			senderName: false,
			senderMail: false,
			textArea: false,
		},
	};

	const formikeReducer = (state, action) => {
		switch (action.type) {
			case TOGGLE_LR: {
				return { ...state, LR: !state.LR };
			}

			case TOGGLE_REMEMBER_ME: {
				return { ...state, rememberMe: !state.rememberMe };
			}

			case SET_USER_INPUT: {
				if (action.payload.value.length <= 18)
					return {
						...state,
						userInputs: {
							...state.userInputs,
							[action.payload.type]: action.payload.value,
						},
					};
				break;
			}

			case TOGGLE_FOCUSED: {
				return {
					...state,
					focused: {
						...state.focused,
						[action.payload.type]: action.payload.value,
					},
				};
			}
			default:
				return state;
		}
	};

	const [state, dispatch] = React.useReducer(formikeReducer, initialState);
	// console.log(state);
	//

	// SET AND CORRECT INPUTS
	const minLengthUser = 3;
	const minLengthPsw = 6;
	const userInputsChange = (e, type) => {
		const value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
		dispatch({ type: SET_USER_INPUT, payload: { type: type, value: value } });
	};
	// dispatch({ type: TOGGLE_FOCUSED, payload: { type: type, value: value } });

	return (
		<div className='form-wrapper'>
			{props.type === "LOGIN" && (
				<React.Fragment>
					<h1
						onClick={() =>
							dispatch({
								type: TOGGLE_FOCUSED,
								payload: { type: "userName", value: true },
							})
						}>
						{state.LR ? "Create new account" : "Log in"}
					</h1>
					<div className='inputs-wrapper'>
						{/*-------------          USER NAME        ---------------  */}

						<div
							className={`single-input-wrapper ${
								state.focused.userName ? "icon-bright" : "icon-fade"
							}`}>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										state.userInputs.userName.length >= minLengthUser
											? { display: "block" }
											: { display: "none" }
									}
									className={
										state.focused.userName ? "icon-bright" : "icon-fade"
									}
									name={"check"}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "userName")}
								value={state.userInputs.userName}
								onFocus={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "userName", value: true },
									})
								}
								onBlur={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "userName", value: false },
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
								state.focused.psw1 ? "icon-bright" : "icon-fade"
							}`}>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										state.userInputs.psw1.length >= minLengthPsw
											? { display: "block" }
											: { display: "none" }
									}
									className={state.focused.psw1 ? "icon-bright" : "icon-fade"}
									name={
										state.userInputs.psw1.length >= minLengthPsw
											? "check"
											: "delete"
									}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "psw1")}
								value={state.userInputs.psw1}
								onFocus={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "psw1", value: true },
									})
								}
								onBlur={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "psw1", value: false },
									})
								}
								icon={<Icon className='icon-input' name='key' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='password'
								spellCheck='false'
								transparent></Input>
						</div>
						{/*-------------     PASSWORD 2  ---------------  */}
						<div
							className={`single-input-wrapper ${
								state.LR ? "input-expand" : "input-collapse"
							} ${state.focused.psw2 ? "icon-bright" : "icon-fade"}`}>
							<div className='single-input-wrapper-subIcon'>
								<Icon
									style={
										state.userInputs.psw2.length >= minLengthPsw
											? { display: "block" }
											: { display: "none" }
									}
									className={state.focused.psw2 ? "icon-bright" : "icon-fade"}
									name={
										state.userInputs.psw2.length >= minLengthPsw &&
										state.userInputs.psw2 === state.userInputs.psw1
											? "check"
											: "delete"
									}
									size='small'
								/>
							</div>
							<Input
								onChange={(e) => userInputsChange(e, "psw2")}
								value={state.userInputs.psw2}
								onFocus={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "psw2", value: true },
									})
								}
								onBlur={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "psw2", value: false },
									})
								}
								icon={<Icon name='key' size='large' />}
								iconPosition='left'
								className='txt-input'
								type='password'
								spellCheck='false'
								transparent></Input>
						</div>

						<Form className='forma'>
							<div
								onClick={() => dispatch({ type: TOGGLE_REMEMBER_ME })}
								className='radio'>
								<div
									className='radio-ring'
									style={state.rememberMe ? { opacity: 0.8 } : {}}>
									<div
										className='radio-ring-inside'
										style={state.rememberMe ? { opacity: 0.8 } : {}}></div>
								</div>
							</div>

							<Button className='batonas left35' animated>
								<Button.Content visible>
									{state.LR ? "Register" : "Log in"}
								</Button.Content>
								<Button.Content hidden>
									<Icon
										size='large'
										name={state.LR ? "user plus" : "sign in"}
									/>
								</Button.Content>
							</Button>
						</Form>
						<div className='log-reg-switch'>
							{state.LR ? "Already a user? " : "Don't have an account? "}
							<span onClick={() => dispatch({ type: TOGGLE_LR })}>
								{state.LR ? " Log in" : " Register"}
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
								state.focused.senderName ? "icon-bright" : "icon-fade"
							}`}>
							<Input
								onFocus={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "senderName", value: true },
									})
								}
								onBlur={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "senderName", value: false },
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
								state.focused.senderMail ? "icon-bright" : "icon-fade"
							}`}>
							<Input
								onFocus={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "senderMail", value: true },
									})
								}
								onBlur={() =>
									dispatch({
										type: TOGGLE_FOCUSED,
										payload: { type: "senderMail", value: false },
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
									state.focused.textArea ? "iconas-white" : "iconas-grey"
								}
								name='pencil'
								size='large'
								color='grey'
							/>
							<div
								className={` ${
									state.focused.textArea ? "icon-bright" : "icon-fade"
								}`}>
								<TextArea
									onFocus={() =>
										dispatch({
											type: TOGGLE_FOCUSED,
											payload: { type: "textArea", value: true },
										})
									}
									onBlur={() =>
										dispatch({
											type: TOGGLE_FOCUSED,
											payload: { type: "textArea", value: false },
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
