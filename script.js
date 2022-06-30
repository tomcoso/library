// Tomas Dessy

// Book object constructor and a function that generates new books
// v
// Array of books (how to name each book object?)
// v
// Place in the dom according to specific properties (rating)

let library = [];


function Book(title, author, status, rating, color) {

    this.title = title;
    this.author = author;
    this.status = status;
    this.rating = rating;
    this.color = color

};


function updateLibrary() {

    const shelf = document.querySelectorAll('.books');

    for(let j in shelf) {
        // console.log(shelf[j]);
        while (shelf[j].firstChild) {
            // console.log(shelf[j].firstChild);
            shelf[j].removeChild(shelf[j].firstChild);
        }

    }

    for (let i in library) {

        for (let j in shelf) {

            // console.log(library[i].rating, shelf[j].attributes[1].value);
            if (library[i].rating === shelf[j].attributes[1].value) {

                shelf[j].append(library[i].createElement());
                break
            }

        }
    };
}


function addToLibrary(title, author, status, rating = 3, color = 'peru') {

    const newBook = new Book(title, author, status, rating, color);

    library.push(newBook);

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-title', title);
    bookElement.setAttribute('style', `content-visibility: hidden; background-color: ${color};`);
    bookElement.textContent = `${title}<br>${author}<br>${status}`;

    updateLibrary(bookElement);
    console.log(library);

};

Book.prototype.createElement = function() {

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-title', this.title);
    bookElement.setAttribute('style', `content-visibility: hidden; background-color: ${this.color};`);
    bookElement.textContent = `${this.title}<br>${this.author}<br>${this.status}`;

    return bookElement;
}

Book.prototype.changeRating = function(newRating) {

    this.rating = newRating;
    
    updateLibrary();
    return `${this.title} is now ${this.rating} stars`
};

Book.prototype.delete = function() {

    library.splice(library.indexOf(this), 1);

    updateLibrary();
    return `${this.title} deleted`;
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
};

const showFormBtn = document.querySelector('.display-form');
showFormBtn.addEventListener('click', displayForm);

const hideFormBtn = document.querySelector('#cancel-btn');
hideFormBtn.addEventListener('click', displayForm);