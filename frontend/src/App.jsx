import axios from 'axios'
import { useEffect, useState } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'

function App() {
  const [books, setBooks] = useState(null)

  async function search(keyword) {
    try {
      const res = await axios.get(`https://rakuten-api-proxy-practice-backend.kagome.workers.dev/search/${keyword}`)
      setBooks(res.data.Items)
      console.log('search', res.data.Items)
    } catch (error) {
      console.error('Error: ', error)
    }
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
