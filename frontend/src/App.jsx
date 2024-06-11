import axios from 'axios'
import { useEffect, useState } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'

function App() {
  const [books, setBooks] = useState(null)

  async function search(keyword) {
    const res = await axios.get(`/search/${keyword}`)
    setBooks(res.data.Items)
    console.log('search', res.data.Items)
  }

  async function search2() {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=React')
    console.log('search2', res.data)
  }

  useEffect(() => {
    console.log('^. _ . ^ ')
    search2()
    search('React')
  }, [])

  return (
    <>
      <h1 className='text-xl m-8'>書籍検索</h1>
      <SearchBar search={search} />
      {books ? <BookList books={books} /> : <p>Loading</p>}

    </>
  )
}

export default App
