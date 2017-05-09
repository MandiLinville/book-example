function BookService() {
    var url = "http://localhost:3000/books"
    this.createBook = function (book) {
        $.post(url, book).then(function (res) {
            console.log(res) // show us what we got back
        })
    }
}