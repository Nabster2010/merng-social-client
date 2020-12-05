import { createContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

let userData = null;
if (localStorage.getItem('userData')) {
	try {
		const decoded = jwt_decode(
			JSON.parse(localStorage.getItem('userData')).token
		);

		const expired = Date.now() >= decoded.exp * 1000;
		if (!expired) {
			userData = JSON.parse(localStorage.getItem('userData'));
		} else {
			localStorage.removeItem('userData');
		}
	} catch (err) {
		console.log(err);
	}
}

const initialState = {
	user: userData,
	login: (userData) => {},
	logout: () => {},
};

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			window.localStorage.setItem('userData', JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			window.localStorage.removeItem('userData');
			return {
				...state,
				user: null,
			};

		default:
			return state;
	}
};

const AuthContext = createContext(initialState);
const AuthProvider = (props) => {
	const [authState, dispatch] = useReducer(authReducer, initialState);

	const login = (userData) => {
		if (userData)
			dispatch({
				type: 'LOGIN',
				payload: userData,
			});
	};
	const logout = () => {
		dispatch({
			type: 'LOGOUT',
		});
	};

	return (
		<AuthContext.Provider
			value={{ user: authState.user, login: login, logout: logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
