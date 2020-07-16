import React from "react";
import styled from "styled-components";
import { Input, Icon, TextArea, Form, Button } from "semantic-ui-react";

function Contact() {
	const [textAreaFocused, setTextAreaFocused] = React.useState(false);
	return (
		<WrapperContact>
			<h1>Contact Me</h1>
			<Input
				// icon='user'
				icon={<Icon name='user' size='large' />}
				iconPosition='left'
				className='txt-input'
				type='text'
				transparent></Input>
			<br></br>
			<Input
				icon={<Icon name='mail outline' size='large' />}
				iconPosition='left'
				className='txt-input'
				transparent></Input>
			<br></br>

			<Form className='forma'>
				<Icon
					className='iconas-grey'
					name='pencil'
					size='large'
					color='grey'
					className={textAreaFocused ? "color='grey'" : "iconas-grey"}
				/>
				<TextArea
					onFocus={() => setTextAreaFocused(true)}
					onBlur={() => setTextAreaFocused(false)}
					style={{ maxHeight: 250, minHeight: 140 }}
					transparent='true'
					className='text-area'
				/>
				<Button className='batonas' animated>
					<Button.Content visible>SEND</Button.Content>
					<Button.Content hidden>
						<Icon size='large' name='send' />
					</Button.Content>
				</Button>
				{/* <Button className='batonas'>SEND</Button> */}
			</Form>
		</WrapperContact>
	);
}
const WrapperContact = styled.div`
	/* position: absolute; */
	height: 100%;
	position: relative;
	transition: 0.4s;
	width: 50%;
	/* border: 1px solid white; */
	padding: 20px 50px 0 50px;
	h1 {
		color: white;
		font-weight: 100;
	}
	.txt-input {
		width: 100%;
		height: 4rem;
		color: white !important;

		border-bottom: 1px solid white;
		padding: 15px;
	}

	.txt-input input {
		color: white !important;
		font-size: 1.5rem;
	}

	.forma {
		width: 100%;

		.iconas-grey {
			position: absolute;
			top: 20px;
			color: rgb(149, 150, 173) !important;
		}
		.iconas-white {
			position: absolute;
			top: 20px;
			color: white !important;
		}

		.text-area {
			color: white !important;
			font-size: 1.5rem !important;
			background-color: rgba(0, 0, 0, 0) !important;
			width: 100%;

			padding: 15px 15px 10px 60px;
			border: none;
			overflow: auto;
			outline: none;
			border-bottom: 1px solid white;
			border-radius: 0;

			&:focus {
				border-bottom: 1px solid white;
				border-radius: 0;
			}
			&:focus .iconas {
				color: red !important;
			}
		}
		.batonas {
			background-color: rgba(0, 0, 0, 0) !important;
			color: rgb(190, 190, 190);
			font-size: 1.2rem;
			border-bottom: 1px solid white;
			border-radius: 0;
			width: 30%;
			padding: 20px;

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
	@media (max-width: 768px) {
		width: 100vw;
	}
`;

export default Contact;
