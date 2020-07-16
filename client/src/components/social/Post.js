import React from "react";
import { Button, Card, Image, Form, TextArea } from "semantic-ui-react";

const SemanticUI = () => (
	<Card.Group centered>
		<Card style={{ width: "990px" }}>
			<Card.Content>
				<Image
					floated='left'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
				/>

				<Card.Header>Steve Sanders</Card.Header>
				<Card.Meta>Online</Card.Meta>
				<Card.Description>
					Steve wants to add you to the group <strong>best friends</strong>{" "}
					Steve wants to add you to the group Steve wants to add you to the
					group Steve wants to add you to the group Steve wants to add you to
					the group
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Form>
					<TextArea rows={1} placeholder='' style={{ minHeight: 30 }} />
				</Form>
				<Button
					content='Add Comment'
					labelPosition='left'
					icon='comment'
					color='green'
				/>
			</Card.Content>
		</Card>
	</Card.Group>
);

export default SemanticUI;
