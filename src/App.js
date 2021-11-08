import React, { Suspense} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// import AllQuotes from './pages/AllQuotes';
// import NewQuote from './pages/NewQuote';
// import QuoteDetail from './pages/QuoteDetail';
// import NotFound from './pages/NotFound';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Layout from './components/layout/Layout';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense 
      fallback={
        <div className='centered'>
          <LoadingSpinner />
        </div>
      }
    >
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate replace to='/quotes' />} /> {/* redirect */}
          <Route path='/quotes/:quoteId/*' element={<QuoteDetail />} />
          <Route path='/quotes' element={<AllQuotes />} />
          <Route path='/new-quote' element={<NewQuote />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
