import { useState } from 'react';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from './components/Loading';
import Error from './components/Error';
import MoreLoadBtn from './components/MoreLoadBtn';
import ReachingEndMessage from './components/ReachingEndMessage';

function App() {
  const [keyword, setKeyword] = useState('TypeScript')

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['bookSearch', keyword],
    queryFn: ({ pageParam }) => fetchBooks(keyword, pageParam),
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    // getNextPageParam:
    // 引数: 現在のページのデータ (lastPage) とこれまでのすべてのページのデータ (allPages)
    // 返り値: 次のページのパラメータ (次のページが存在しない場合は undefined )
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.pageCount ? nextPage : undefined
    }
  })

  async function fetchBooks(keyword, pageParam) {
    const url = `${import.meta.env.VITE_SERVER_URL}/search/${keyword}/${pageParam}`
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  function search(word) {
    setKeyword(word)
  }

  const books = data?.pages?.flatMap(page => page.Items) || []

  console.log(data)

  if (status === 'pending') {
    return <Loading />
  }
  if (status === 'error') {
    <Error error={error} />
  }

  return (
    <div className='my-8'>
      <SearchBar search={search} />
      <BookList books={books} />
      {isFetchingNextPage ? <Loading /> : hasNextPage ? <MoreLoadBtn loadMore={fetchNextPage} /> : <ReachingEndMessage />}
    </div>
  )
}

export default App
