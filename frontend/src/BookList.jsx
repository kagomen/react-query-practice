const BookList = ({ books }) => {
  return (
    <div>
      {books?.map(book => {
        return (
          <div key={book.Item.isbn} className="m-8 p-6 border border-stone-800 flex">
            <img src={book.Item.largeImageUrl
            } className="w-[100px] h-[127px] mr-6" />
            <div>
              <h2 className="text-lg">{book.Item.title}</h2>
              <p>{book.Item.author}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookList