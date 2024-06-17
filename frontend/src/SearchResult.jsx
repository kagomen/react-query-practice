import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import BookList from "./components/BookList"
import MoreLoadBtn from "./components/MoreLoadBtn"
import ReachingEndMessage from "./components/ReachingEndMessage"
import Loading from "./components/Loading"

const SearchResult = (props) => {

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['bookSearch', props.keyword],
    queryFn: ({ pageParam }) => fetchBooks(props.keyword, pageParam),
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

    // エラーバウンダリのテスト
    if (keyword == 'error') {
      throw new Error('🎤 < エラーチェックワンツー');
    }

    return data
  }

  const books = data?.pages?.flatMap(page => page.Items) || []

  return (
    <div>
      <BookList books={books} />
      {isFetchingNextPage && <Loading />}
      {hasNextPage ? (
        <MoreLoadBtn loadMore={fetchNextPage} />
      ) : (
        <ReachingEndMessage />
      )}
    </div>
  )
}

export default SearchResult