import { useEffect, useState } from 'react';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';

function App() {
  const [books, setBooks] = useState([])
  const [keyword, setKeyword] = useState('')

  async function fetchBooks(keyword = 'React', page = 1) {
    const url = `${import.meta.env.VITE_SERVER_URL}/search/${keyword}/${page}`
    const res = await fetch(url)
    const data = await res.json()
    setBooks(data.Items)
    console.log(data.Items)
  }

  function search(text) {
    setKeyword(text)
  }

  useEffect(() => {
    if (keyword === '') {
      fetchBooks('React')
    } else {
      fetchBooks(keyword)
    }
  }, [keyword])

  return (
    <div className='my-8'>
      <SearchBar search={search} />
      {books && <BookList books={books} />}
    </div>
  );
}

export default App
