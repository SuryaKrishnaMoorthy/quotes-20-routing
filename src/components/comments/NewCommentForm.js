import { useRef, useEffect } from 'react';
import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
	const commentTextRef = useRef();
	const { sendRequest, status, error } = useHttp(addComment);
	const { onAddedComment } = props;

	useEffect(() => {
		if(status === 'completed' && !error) {
			onAddedComment()
		}
	}, [status, error, onAddedComment]);

	const submitFormHandler = (event) => {
		event.preventDefault();
		const enteredText = commentTextRef.current.value;
		sendRequest({commentData: {text: enteredText}, quoteId: props.quoteId});
	}
	return (
		<form className={classes.form} onSubmit={submitFormHandler}>
			{ status === 'pending' && (
				<div className='centered'>
					<LoadingSpinner />
				</div>
			)}
			<div className={classes.control}>
				<label htmlFor="comment">Your comment</label>
				<textarea ref={commentTextRef} name="comment" id="comment" rows="5" />
			</div>
			<div className={classes.actions}>
				<button className='btn'>Add Comment</button>
			</div>
		</form> 
	);
};

export default NewCommentForm;