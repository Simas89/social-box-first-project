import React from "react";
import { Button, Card, Form, TextArea } from "semantic-ui-react";

const CreatePost = () => (
	<Card.Group centered>
		<Card style={{ width: "990px" }}>
			<Card.Content>
				<Form>
					<TextArea as='textarea' placeholder='' style={{ minHeight: 50 }} />
				</Form>
				<Button
					content='Create Post'
					labelPosition='left'
					icon='write'
					color='blue'
				/>
			</Card.Content>
		</Card>
	</Card.Group>
);

export default CreatePost;
