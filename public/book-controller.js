function BookController(){
    var bookService = new BookService()

    this.createBook = function createBook(event){ // event function first param is always the event
        e.preventDefault() // prevents page from reloading
        var book= {
        title : event.target.title.value,
        author : event.target.author.value,
        rating : event.target.rating.value,
        published : event.target.published.value
    }
    bookService.createBook(book)
    }






}