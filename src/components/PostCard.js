import React from 'react';
import moment from 'moment';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, Grid, Image } from 'semantic-ui-react';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';
const PostCard = ({ post, user }) => {
	const { id, username, body, createdAt, likes, comments } = post;

	const handleComment = () => console.log('comment a post');
	let match = useRouteMatch('/').isExact;
	return (
		<Grid.Column>
			<Card fluid style={{ marginTop: 10 }}>
				<Card.Content>
					<Image
						floated='right'
						size='mini'
						src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
					/>
					<Card.Header>{username}</Card.Header>
					<Card.Meta as={Link} to={`/post/${id}`}>
						{moment(createdAt).fromNow()}
					</Card.Meta>
					<Card.Description>{body}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<LikeButton likes={likes} user={user} postId={id} />
					{match && (
						<CommentButton comments={comments} user={user} postId={id} />
					)}
					{user && user?.username === username && <DeleteButton post={post} />}
				</Card.Content>
			</Card>
		</Grid.Column>
	);
};

export default PostCard;
