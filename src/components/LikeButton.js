import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { LIKE_POST } from '../graphql/mutations';

const LikeButton = ({ postId, likes, user }) => {
	const [isLiked, setIsLiked] = useState(
		likes.some((like) => like.username === user?.username)
	);
	const [likePost, { loading }] = useMutation(LIKE_POST, {
		variables: {
			postId,
		},
	});
	const handleLike = () => {
		likePost();
		setIsLiked(!isLiked);
	};
	const likeButton = user ? (
		<Button
			as='div'
			labelPosition='right'
			onClick={handleLike}
			floated='left'
			loading={loading}
		>
			<Button color='teal' basic={!isLiked}>
				<Icon name='heart' />
			</Button>
			<Label basic color='teal' pointing='left'>
				{likes.length || 0}
			</Label>
		</Button>
	) : (
		<Button as='div' labelPosition='right' floated='left' as={Link} to='/login'>
			<Button color='teal' basic>
				<Icon name='heart' />
			</Button>
			<Label basic color='teal' pointing='left'>
				{likes.length || 0}
			</Label>
		</Button>
	);
	return likeButton;
};

export default LikeButton;
