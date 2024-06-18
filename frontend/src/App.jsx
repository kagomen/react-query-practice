import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import SearchResult from './SearchResult';
import Error from './components/Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

function App() {
  const [keyword, setKeyword] = useState('JavaScript')

  function search(word) {
    setKeyword(word)
  }

  return (
    <div className='my-8'>
      <SearchBar search={search} />
      <QueryErrorResetBoundary >
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />
            )}>
            <Suspense fallback={<Loading />}>
              <SearchResult keyword={keyword} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  )
}

export default App
