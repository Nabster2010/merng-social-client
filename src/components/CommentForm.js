import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { ADD_COMMENT } from '../graphql/mutations';

const CommentForm = ({ postId }) => {
	const [body, setBody] = useState('');
	const [commentPost, { data, error, loading }] = useMutation(ADD_COMMENT, {
		variables: {
			body,
			postId,
		},
		onError(err) {
			return;
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		commentPost();
		setBody('');
	};
	return (
		<Form reply style={{ marginTop: 10 }} onSubmit={handleSubmit}>
			<Form.TextArea
				placeholder='Add comment'
				value={body}
				onChange={(e) => setBody(e.target.value)}
				error={error ? error.graphQLErrors[0].message : false}
			/>
			<Button
				content='Add Reply'
				labelPosition='left'
				icon='edit'
				primary
				loading={loading}
			/>
		</Form>
	);
};

export default CommentForm;
