import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';

const CommentButton = ({ comments, user, postId }) => {
	return (
		<Button as='div' labelPosition='right' as={Link} to={`post/${postId}`}>
			<Button basic color='teal'>
				<Icon name='comments' />
			</Button>
			<Label basic color='teal' pointing='left'>
				{comments.length || 0}
			</Label>
		</Button>
	);
};

export default CommentButton;
