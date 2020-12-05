import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { POSTS } from '../graphql/queries';
import { ADD_POST } from '../graphql/mutations';

const PostForm = () => {
	const [body, setBody] = useState('');
	const [errors, setErrors] = useState(null);
	const [addPost, { error, loading }] = useMutation(ADD_POST, {
		variables: { body: body },
		onError: (err) => {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		update: (cache, { data: { createPost } }) => {
			const data = cache.readQuery({ query: POSTS });
			const newData = { getPosts: [createPost, ...data.getPosts] };
			cache.writeQuery({
				query: POSTS,
				data: newData,
			});
			setBody('');
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(null);
		addPost();
	};
	return (
		<Grid.Column>
			<Form
				onSubmit={handleSubmit}
				style={{ marginTop: 10 }}
				className={loading ? 'loading' : ''}
			>
				<Form.Field>
					<Form.Input
						placeholder='say somthing'
						type='text'
						value={body}
						onChange={(e) => setBody(e.target.value)}
						error={errors?.body}
					/>
				</Form.Field>
				<Button type='submit' color='teal'>
					Post
				</Button>
				{errors && (
					<div className='ui negative message'>
						<ul className='list'>
							{errors &&
								Object.values(errors).map((msg, indx) => (
									<li key={indx}>{msg}</li>
								))}
						</ul>
					</div>
				)}
			</Form>
		</Grid.Column>
	);
};

export default PostForm;
