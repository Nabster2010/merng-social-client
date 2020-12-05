import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//apollo imports
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = new WebSocketLink({
	//uri: `ws://localhost:5000/graphql`,
	uri: `//merng-social.herokuapp.com/`,
	options: {
		reconnect: true,
	},
});

const authLink = setContext((_, { headers }) => {
	let userData;
	let token = '';
	if (localStorage.getItem('userData')) {
		userData = JSON.parse(localStorage.getItem('userData'));
		token = userData.token;
	}

	return {
		headers: {
			...headers,
			authorization: `Bearer ${token}`,
		},
	};
});
const httpLink = createUploadLink({
	uri: 'https://merng-social.herokuapp.com/',
});
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},

	authLink.concat(wsLink),
	authLink.concat(httpLink)
);
const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
