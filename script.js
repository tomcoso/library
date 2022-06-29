// Tomas Dessy

let library = [
    star5 = [],
    star4 = [],
    star3 = [],
    star2 = [],
    star1 = [],
];

function Book(title, author, status) {

    this.title = title;
    this.author = author;
    this.status = status;

}

function addToLibrary(title, author, status) {

    const newBook = new Book(title, author, status);

    library[star3].push(newBook);
    console.log(library);

}

Book.prototype.changeRating = function(book, target) {
    
}


const form = document.querySelector('#book-form');
const container = document.querySelector('.container');

function displayForm() {
    if (form.classList.contains("hidden"))
    {
        form.classList.remove('hidden');
        container.classList.add('dark');
    }
    else
    {
        form.classList.add('hidden');
        container.classList.remove('dark');
    }
}

const showFormBtn = document.querySelector('.display-form');
showFormBtn.addEventListener('click', displayForm)

const hideFormBtn = document.querySelector('#cancel-btn');
hideFormBtn.addEventListener('click', displayForm)