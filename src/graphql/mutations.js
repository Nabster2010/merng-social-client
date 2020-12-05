import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation LoginUser($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			username
			email
			token
			createdAt
		}
	}
`;

export const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			username
			email
			token
		}
	}
`;
export const DELETE_COMMENT = gql`
	mutation($postId: String!, $commentId: String!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			username
			comments {
				id
				body
				username
				createdAt
			}
		}
	}
`;
export const ADD_COMMENT = gql`
	mutation($body: String!, $postId: String!) {
		createComment(body: $body, postId: $postId) {
			id
			username
			body
			createdAt
			comments {
				id
				username
				body
				createdAt
			}
			likes {
				id
				username
				createdAt
			}
		}
	}
`;
export const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;
export const LIKE_POST = gql`
	mutation likePost($postId: String!) {
		likePost(postId: $postId) {
			id
			username
			body
			likes {
				id
				username
			}
		}
	}
`;
export const ADD_POST = gql`
	mutation($body: String!) {
		createPost(body: $body) {
			id
			username
			body
			createdAt
			comments {
				id
				username
				body
				createdAt
			}
			likes {
				id
				username
				createdAt
			}
		}
	}
`;
export const UPLAOD_MUTATION = gql`
	mutation($file: Upload!) {
		upload(file: $file) {
			filename
			mimetype
			encoding
			avatarUrl
		}
	}
`;
