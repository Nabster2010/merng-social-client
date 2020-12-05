import { gql } from '@apollo/client';

export const POSTS = gql`
	query {
		getPosts {
			id
			username
			body
			createdAt
			likes {
				id
				username
			}
			comments {
				id
				body
				username
				createdAt
			}
		}
	}
`;

export const GET_POST = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			username
			body
			createdAt
			comments {
				id
				body
				username
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
export const GET_USER = gql`
	query($userId: ID!) {
		getUser(userId: $userId) {
			id
			username
			email
			createdAt
			avatarUrl
		}
	}
`;
