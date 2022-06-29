// Tomas Dessy

let library = [];

function Book(title, author, status) {

    this.title = title;
    this.author = author;
    this.status = status;

}

function addToLibrary(title, author, status) {

    const newBook = new Book(title, author, status);

    library.push(newBook);
    console.log(library);

}