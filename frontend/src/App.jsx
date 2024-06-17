import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import SearchResult from './SearchResult';
import Error from './components/Error';

function App() {
  const [keyword, setKeyword] = useState('TypeScript')

  function search(word) {
    setKeyword(word)
  }

  return (
    <div className='my-8'>
      <SearchBar search={search} />
      <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => <Error error={error} resetErrorBoundary={resetErrorBoundary} />}>
        <Suspense fallback={<Loading />}>
          <SearchResult keyword={keyword} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
