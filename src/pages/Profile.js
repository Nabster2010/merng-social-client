import React, { useContext, useState } from 'react';
import { Button, Card, Form, Image, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { UPLAOD_MUTATION } from '../graphql/mutations';
const Profile = ({ match }) => {
	const [file, setFile] = useState([]);

	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};
	const { user } = useContext(AuthContext);

	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			userId: match.params.id,
		},
	});

	return (
		<Segment loading={loading}>
			{error && <Message negative>{error?.message}</Message>}
			{data && (
				<Card style={{ display: 'flex', flexDirection: 'row' }} fluid>
					<Image
						src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
						as='div'
						size='medium'
					/>
					<Card.Content>
						<Card.Header>{data.getUser.username}</Card.Header>
						<Card.Meta>
							<span className='date'>{data.getUser.createdAt}</span>
						</Card.Meta>
						<Card.Description>{data.getUser.email}</Card.Description>
					</Card.Content>
				</Card>
			)}
		</Segment>
	);
};

export default Profile;
