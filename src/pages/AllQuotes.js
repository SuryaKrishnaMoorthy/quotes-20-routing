import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuote = () => {
	const { sendRequest, status, error, data: loadedQuotes } = useHttp(getAllQuotes, true);
	
	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	if(status === 'pending') {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div> 
		);
	};

	if(error) {
		return <p className='centered focussed'>hi {error}</p>;
	};

	if(status ==='completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
		return (
			<div className='centered focussed'>
				<NoQuotesFound />
			</div>
		)
	}

	return <QuoteList quotes={loadedQuotes}/>;
};

export default AllQuote;