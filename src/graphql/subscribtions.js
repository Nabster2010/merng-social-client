import { gql } from '@apollo/client';

export const NEW_POST_SUBSCRIPTION = gql`
	subscription {
		onNewPost {
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
export const DELETE_POST_SUBSCRIPTION = gql`
	subscription {
		onPostDelete
	}
`;

export const ON_LIKE_SUBSCRIPTION = gql`
	subscription($postId: ID!) {
		onLike(postId: $postId) {
			id
			body
			username
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

export const ON_COMMENT_SUBSCRIPTION = gql`
	subscription($postId: ID!) {
		onComment(postId: $postId) {
			id
			body
			username
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
