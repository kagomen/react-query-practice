const MoreLoadBtn = (props) => {
  return (
    <button
      onClick={props.loadMore}
      className='block w-fit mx-auto px-4 py-2 border border-stone-800'
    >
      もっと見る
    </button>
  )
}

export default MoreLoadBtn