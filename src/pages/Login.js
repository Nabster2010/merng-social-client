import { useContext, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { LOGIN_USER } from '../graphql/mutations';

const Login = (props) => {
	const context = useContext(AuthContext);
	const [input, setInput] = useState({
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState(null);
	const handleChange = (e) => {
		let name = e.target.name;
		setInput({ ...input, [name]: e.target.value });
	};
	const [loginFn, { loading, data }] = useMutation(LOGIN_USER, {
		variables: {
			username: input.username,
			password: input.password,
		},
		onCompleted(data) {
			context.login(data.login);
			props.history.push('/');
		},
		onError(err) {
			console.log(err?.graphQLErrors[0]?.extensions?.errors);
			setErrors(err?.graphQLErrors[0]?.extensions?.errors);
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(null);
		loginFn();
	};
	return (
		<Segment padded='very' loading={loading}>
			<div>
				<Form onSubmit={handleSubmit}>
					<h1>Login</h1>
					<Form.Input
						label='UserName'
						name='username'
						placeholder='User Name'
						value={input.username}
						onChange={handleChange}
						error={errors?.username}
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

					<Button type='submit'>Login</Button>
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

export default Login;
