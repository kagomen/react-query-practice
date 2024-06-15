import axios from 'axios'
import { useState, useEffect } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import Loading from './Loading'
// import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import MoreLoadBtn from './MoreLoadBtn'
import ReachingEndMessage from './ReachingEndMessage'

async function fetcher(url) {
  const res = await axios.get(url)
  return res.data
}

function App() {
  const [keyword, setKeyword] = useState('React')
  const [pageCount, setPageCount] = useState(null)

  // const url = `${import.meta.env.VITE_SERVER_URL}/search/${keyword}`
  // const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  const getKey = (pageIndex, previousPageData) => {
    console.log('pageIndex:', pageIndex)
    console.log('previousPageData:', previousPageData)
    if (previousPageData && !previousPageData.Items.length) return null
    return `${import.meta.env.VITE_SERVER_URL}/search/${keyword}/${pageIndex + 1}`
  }

  const { data, error, size, setSize, isValidating, isLoading } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false, // フォーカスが戻ったときのリフェッチを無効にする
    onSuccess: (data) => {
      // ページ総数を取得
      if (data && pageCount === null) {  // 初回フェッチ時のみ実行
        console.log('ページ総数を取得')
        setPageCount(data[0]?.pageCount)
      }
    }
  })

  const isReachingEnd = pageCount !== null && size >= pageCount

  // useSWRInfiniteが返すdataは、通常のres.dataで受け取る形式とは異なるため、以下の作業が必要
  // 理由：ページ更新ごとにフェッチする→ページ更新ごとにオブジェクトに格納してる
  const books = data ? data.reduce((acc, page) => [...acc, ...page.Items], []) : []

  // データ構造がわからなくなったら以下をアクティブにして確認する
  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])

  // useEffect(() => {
  //   console.log('books', books)
  // }, [books])

  function loadMore() {
    if (!isValidating) {
      setSize(size + 1)
    }
  }

  function search(newKeyword) {
    setKeyword(newKeyword)
    setPageCount(null)
  }

  if (error) {
    return <div>error</div>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='my-8'>
      <SearchBar search={search} />
      {books.length > 0 && <BookList books={books} />}
      {isValidating ? (
        <Loading />
      ) : (
        isReachingEnd ? <ReachingEndMessage /> : <MoreLoadBtn loadMore={loadMore} />
      )}
    </div>
  )
}

export default App
