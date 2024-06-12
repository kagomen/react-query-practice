import axios from 'axios'
import { useEffect, useState } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import Loading from './Loading'

function App() {
  const [books, setBooks] = useState(null)
  // const url = 'https://rakuten-api-proxy-practice-backend.kagome.workers.dev'

  async function search(keyword) {
    try {
      const res = await axios.get(`/search/${keyword}`)
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
      {books ? <BookList books={books} /> : <Loading />}
    </>
  )
}

export default App
