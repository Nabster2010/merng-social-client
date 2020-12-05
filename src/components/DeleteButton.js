import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Button, Confirm } from 'semantic-ui-react';
import { POSTS } from '../graphql/queries';
import { DELETE_POST } from '../graphql/mutations';

const DeleteButton = ({ post }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const history = useHistory();
	let match = useRouteMatch('/').isExact;

	const [deletePost, { loading }] = useMutation(DELETE_POST, {
		variables: {
			postId: post.id,
		},
		update(cache, { data }) {
			setConfirmOpen(false);
			const queryData = cache.readQuery({
				query: POSTS,
			});
			const filteredPosts = queryData.getPosts.filter(
				(item) => item.id !== post.id
			);

			cache.writeQuery({
				query: POSTS,
				data: { ...queryData, getPosts: filteredPosts },
			});
			!match && history.push('/');
		},
	});
	const handlePostDelete = () => {
		deletePost();
	};
	return (
		<>
			<Button
				color='red'
				icon='trash'
				floated='right'
				loading={loading}
				onClick={() => setConfirmOpen(true)}
			/>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={handlePostDelete}
			/>
		</>
	);
};

export default DeleteButton;
