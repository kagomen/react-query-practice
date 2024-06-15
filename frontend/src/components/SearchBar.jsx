import { useRef } from "react"

const SearchBar = (props) => {
  const inputRef = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    props.search(inputRef.current.value)
  }
  return (
    <div className="m-8">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="border border-stone-700 mr-2 px-1"
        />
        <button className="border border-stone-700 px-2">検索</button>
      </form>
    </div>
  )
}

export default SearchBar