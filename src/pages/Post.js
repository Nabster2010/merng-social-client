import { useQuery, useSubscription } from '@apollo/client';
import React, { useContext } from 'react';
import { Comment, Message, Segment, TransitionGroup } from 'semantic-ui-react';
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/AuthContext';
import { GET_POST } from '../graphql/queries';
import {
	ON_COMMENT_SUBSCRIPTION,
	ON_LIKE_SUBSCRIPTION,
} from '../graphql/subscribtions';
const Post = ({ match: { params } }) => {
	const { user } = useContext(AuthContext);
	//get post by id
	const { data, loading, error } = useQuery(GET_POST, {
		variables: {
			postId: params.id,
		},
	});
	// on like subscription
	useSubscription(ON_LIKE_SUBSCRIPTION, {
		variables: {
			postId: params.id,
		},
		onSubscriptionData({ client, subscriptionData }) {
			client.writeQuery({
				query: GET_POST,
				data: subscriptionData.data.onLike,
			});
		},
	});
	//on comment subscription
	useSubscription(ON_COMMENT_SUBSCRIPTION, {
		variables: {
			postId: params.id,
		},
		onSubscriptionData({ client, subscriptionData }) {
			client.writeQuery({
				query: GET_POST,
				data: subscriptionData.data.onComment,
			});
		},
	});

	return (
		<Segment loading={loading}>
			{error && (
				<Message negative>
					<Message.Header>{error?.graphQLErrors[0]?.message}</Message.Header>
				</Message>
			)}

			{data && (
				<>
					<PostCard post={data?.getPost} user={user} />
					{user && <CommentForm postId={params?.id} />}

					<Comment.Group>
						<TransitionGroup duration={1000}>
							{data &&
								data?.getPost?.comments.map((comment) => (
									<div key={comment.id}>
										<CommentCard
											comment={comment}
											postId={params?.id}
											user={user}
										/>
									</div>
								))}
						</TransitionGroup>
					</Comment.Group>
				</>
			)}
		</Segment>
	);
};

export default Post;
