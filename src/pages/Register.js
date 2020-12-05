import React, { useContext, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { REGISTER_USER } from '../graphql/mutations';

const Register = (props) => {
	const context = useContext(AuthContext);
	const [input, setInput] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState(null);
	const handleChange = (e) => {
		let name = e.target.name;
		setInput({ ...input, [name]: e.target.value });
	};
	const [register, { loading }] = useMutation(REGISTER_USER, {
		variables: input,
		onCompleted(data) {
			console.log(data.register);
			context.login(data.register);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
			console.log(err?.graphQLErrors[0]?.extensions?.errors);
		},
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors(null);
		register();
	};
	return (
		<Segment padded='very' loading={loading}>
			<div>
				<Form onSubmit={handleSubmit}>
					<h1>Register</h1>
					<Form.Input
						name='username'
						placeholder='User Name'
						value={input.username}
						onChange={handleChange}
						error={errors?.username}
						label='User Name'
					/>

					<Form.Input
						label='Email'
						name='email'
						placeholder='Email'
						value={input.email}
						onChange={handleChange}
						error={errors?.email}
					/>

					<Form.Input
						label='Password'
						name='password'
						type='password'
						placeholder='Password'
						value={input.password}
						onChange={handleChange}
						error={errors?.password}
					/>

					<Form.Input
						label='ConfirmPassword'
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password'
						value={input.confirmPassword}
						onChange={handleChange}
						error={errors?.confirmPassword}
					/>

					<Button type='submit' loading={loading}>
						Register
					</Button>
				</Form>
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
			</div>
		</Segment>
	);
};

export default Register;
