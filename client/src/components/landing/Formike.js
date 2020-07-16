import React from "react";
import "./css/Formike.css";
import { Input, Icon, Button, Form, TextArea } from "semantic-ui-react";

const Formike = (props) => {
	const [LR, setLR] = React.useState(0);
	const [rememberMe, setRememberMe] = React.useState(0);
	const [textAreaFocused, setTextAreaFocused] = React.useState(false);
	console.log(textAreaFocused);
	return (
		<div className='form-wrapper'>
			{props.type === "LOGIN" && (
				<React.Fragment>
					<h1>{LR ? "Register new account" : "Log in"}</h1>
					<Input
						icon={<Icon name='user' size='large' />}
						iconPosition='left'
						className='txt-input'
						type='text'
						spellCheck='false'
						transparent></Input>
					<Input
						icon={<Icon name='key' size='large' />}
						iconPosition='left'
						className='txt-input'
						type='password'
						spellCheck='false'
						transparent></Input>
					{LR ? (
						<Input
							icon={<Icon name='key' size='large' />}
							iconPosition='left'
							className='txt-input'
							type='password'
							spellCheck='false'
							transparent></Input>
					) : (
						""
					)}
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
						{LR ? "Already a user? " : "Dont have an account yet? "}
						<span onClick={() => setLR(!LR)}>
							{LR ? " Log in" : " Register"}
						</span>
					</div>
				</React.Fragment>
			)}
			{props.type === "CONTACT" && (
				<React.Fragment>
					<h1>Contact Me</h1>
					<Input
						icon={<Icon name='user' size='large' />}
						iconPosition='left'
						className='txt-input'
						type='text'
						spellCheck='false'
						transparent></Input>
					<Input
						icon={<Icon name='mail outline' size='large' />}
						iconPosition='left'
						className='txt-input'
						type='text'
						spellCheck='false'
						transparent></Input>
					<Form className='forma'>
						<Icon
							className={textAreaFocused ? "iconas-white" : "iconas-grey"}
							name='pencil'
							size='large'
							color='grey'
						/>
						<TextArea
							onFocus={() => setTextAreaFocused(true)}
							onBlur={() => setTextAreaFocused(false)}
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
				</React.Fragment>
			)}
		</div>
	);
};

export default Formike;
