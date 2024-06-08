import axios from 'axios'
import { useEffect, useState } from 'react'
import BookList from './BookList'

function App() {
  const [books, setBooks] = useState(null)

  async function search() {
    const res = await axios.get('/search')
    setBooks(res.data.Items)
    console.log(res)
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <>
      {books ? <BookList books={books} /> : <p>Loading</p>}
    </>
  )
}

export default App
