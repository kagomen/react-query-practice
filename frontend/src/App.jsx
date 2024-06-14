import axios from 'axios'
import { useState } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import Loading from './Loading'
import useSWR from 'swr'

async function fetcher(url) {
  const res = await axios.get(url)
  return res.data
}

function App() {
  const [keyword, setKeyword] = useState('React')
  const url = `${import.meta.env.VITE_SERVER_URL}/search/${keyword}`
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  function search(newKeyword) {
    setKeyword(newKeyword)
    mutate()
  }

  if (error) {
    return <div>error</div>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <SearchBar search={search} />
      {data && <BookList books={data?.Items} />}
    </>
  )
}

export default App
