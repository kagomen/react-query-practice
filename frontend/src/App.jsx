import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import { Suspense } from 'react'
import SearchResult from './SearchResult';

function App() {
  const [keyword, setKeyword] = useState('TypeScript')

  function search(word) {
    setKeyword(word)
  }

  return (
    <div className='my-8'>
      <SearchBar search={search} />
      <Suspense fallback={<Loading />}>
        <SearchResult keyword={keyword} />
      </Suspense>
    </div>
  )
}

export default App
