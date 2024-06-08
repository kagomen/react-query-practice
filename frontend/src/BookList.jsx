const BookList = ({ books }) => {
  const filteredBooks = books.filter(book => book.Item.label == "" && !book.Item.title.includes('POD'))
  return (
    <div>
      {filteredBooks.map(book => {
        return (
          <div key={book.Item.isbn} className="m-8 p-6 border border-stone-800 flex">
            <img src={book.Item.largeImageUrl
            } className="w-[100px] mr-6" />
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