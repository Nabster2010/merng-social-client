import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
	const { user } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					return <Redirect to='/' />;
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};

export default AuthRoute;
