import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import { DELETE_COMMENT } from '../graphql/mutations';

const CommentDeleteBtn = ({ postId, commentId }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
		variables: {
			postId,
			commentId,
		},
		update(_, __) {
			setConfirmOpen(false);
		},
	});

	return (
		<>
			<Button
				floated='right'
				icon='trash'
				color='red'
				onClick={() => setConfirmOpen(true)}
			/>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deleteComment}
			/>
		</>
	);
};

export default CommentDeleteBtn;
