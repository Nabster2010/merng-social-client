import React, { useContext } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import PostCard from '../components/PostCard';
import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import { POSTS } from '../graphql/queries';
import { NEW_POST_SUBSCRIPTION } from '../graphql/subscribtions';
import { DELETE_POST_SUBSCRIPTION } from '../graphql/subscribtions';

const Home = () => {
	//get the all Posts
	const { loading, data } = useQuery(POSTS);
	//subscribe for new post
	useSubscription(NEW_POST_SUBSCRIPTION, {
		onSubscriptionData({ client, subscriptionData: { data } }) {
			const queryData = client.readQuery({ query: POSTS });
			const newData = { getPosts: [data.onNewPost, ...queryData.getPosts] };
			client.writeQuery({
				query: POSTS,
				data: newData,
			});
		},
	});
	//subscribe for post delete
	useSubscription(DELETE_POST_SUBSCRIPTION, {
		onSubscriptionData({ client, subscriptionData: { data } }) {
			const queryData = client.readQuery({ query: POSTS });
			const newData = {
				getPosts: queryData.getPosts.filter(
					(item) => item.id !== data.onPostDelete
				),
			};
			client.writeQuery({
				query: POSTS,
				data: newData,
			});
		},
	});

	const { user } = useContext(AuthContext);

	if (!data) return <h1>No posts</h1>;
	// TODO: if errors map throw it
	return (
		<Grid stackable columns={2}>
			{user && (
				<Grid.Column width='16'>
					<PostForm />
				</Grid.Column>
			)}
			{loading ? (
				<h1>loading...</h1>
			) : (
				<Transition.Group duration={1000}>
					{data.getPosts &&
						data.getPosts.map((post) => (
							<Grid.Column key={post.id}>
								<PostCard post={post} user={user} />
							</Grid.Column>
						))}
				</Transition.Group>
			)}
		</Grid>
	);
};

export default Home;
