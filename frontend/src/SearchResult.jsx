import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import BookList from "./components/BookList"
import { useEffect } from "react"

const SearchResult = (props) => {

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['bookSearch', props.keyword],
    queryFn: ({ pageParam }) => {
      console.log('フェッチしました');
      return fetchBooks(props.keyword, pageParam)
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    // getNextPageParam:
    // 引数: 現在のページのデータ (lastPage) とこれまでのすべてのページのデータ (allPages)
    // 返り値: 次のページのパラメータ (次のページが存在しない場合は undefined ) => hasNextPageに反映される
    getNextPageParam: (lastPage, allPages) => {
      console.log('getNextPageParamが実行されました');
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.pageCount ? nextPage : undefined
    }
  })

  const { ref, inView } = useInView()

  async function fetchBooks(keyword, pageParam) {
    const url = `${import.meta.env.VITE_SERVER_URL}/search/${keyword}/${pageParam}`
    const res = await fetch(url)
    const data = await res.json()

    // エラーバウンダリのテスト
    if (keyword == 'error') {
      throw new Error('エラーチェックワンツー');
    }

    return data
  }

  const books = data?.pages?.flatMap(page => page.Items) || []

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  return (
    <div>
      <BookList books={books} />

      {/* スクロールで無限ローディング */}
      <div ref={ref} className="w-fit mx-auto">
        {isFetchingNextPage
          ? 'ローディング中...'
          : hasNextPage
            ? 'もっと見る'
            : 'すべてのアイテムを表示しました'}
      </div>

      {/* ボタン操作で無限ローディング */}
      {/* <button
        onClick={fetchNextPage}
        disabled={isFetchingNextPage || !hasNextPage}
        className='block w-fit mx-auto px-4 py-2 border border-stone-800 disabled:opacity-50'
      >
        {isFetchingNextPage
          ? 'ローディング中...'
          : hasNextPage
            ? 'もっと見る'
            : 'すべてのアイテムを表示しました'}
      </button> */}

    </div>
  )
}

export default SearchResult