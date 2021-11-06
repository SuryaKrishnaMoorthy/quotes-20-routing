import { useEffect } from "react";
import { useParams, Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
	const params = useParams();
	const { quoteId } = params;

	const { sendRequest, status, error, data: loadedQuote } = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId)
	}, [sendRequest, quoteId]);

	if(status === 'pending') {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div> 
		);
	};

	if (error) {
		return <p className='centered'>{error}</p>;
	};

	if(!loadedQuote.text) {
		return <p>No quote found!</p>;
	};

	const loadComments = (
		<div className="centered">
			<Link className="btn--flat" to='comments'>Load Comments</Link>
		</div>
	);
	
	return (
		<>
			<HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
			<Routes>
				<Route path='' element={loadComments}/>
				<Route path='/comments' element={<Comments />} />
			</Routes>
		</>
	);
};

export default QuoteDetail;