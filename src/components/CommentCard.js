import { Button, Comment, GridColumn, GridRow } from 'semantic-ui-react';
import moment from 'moment';
import CommentDeleteBtn from './CommentDeleteBtn';

const CommentCard = ({
	comment: { id, username, body, createdAt },
	postId,
	user,
}) => {
	const owner = username === user?.username;
	const handleCommentDelete = () => {};
	return (
		<Comment>
			<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
			<Comment.Content>
				<Comment.Author as='a'>
					{username}
					{owner && <CommentDeleteBtn commentId={id} postId={postId} />}
				</Comment.Author>
				<Comment.Metadata>
					<div> {moment(createdAt).fromNow()} </div>
				</Comment.Metadata>
				<Comment.Text>{body}</Comment.Text>
			</Comment.Content>
		</Comment>
	);
};

export default CommentCard;
