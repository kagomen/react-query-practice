import axios from 'axios'
import { useEffect, useState } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'

function App() {
  const [books, setBooks] = useState(null)

  async function search(keyword) {
    const res = await axios.get(`/search/${keyword}`)
    setBooks(res.data.Items)
  }

  useEffect(() => {
    search('React')
  }, [])

  return (
    <>
      <SearchBar search={search} />
      {books ? <BookList books={books} /> : <p>Loading</p>}
    </>
  )
}

export default App