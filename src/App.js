import QuoteList from "./components/quotes/QuoteList";

const QUOTES = [{
  id: 1,
  author: 'test author',
  text: 'test quote'
}];

function App() {
  return (
    <div>
      <QuoteList quotes={QUOTES} />
    </div>
  );
}

export default App;
