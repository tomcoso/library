// Tomas Dessy

// Book object constructor and a function that generates new books
// v
// Array of books (how to name each book object?)
// v
// Place in the dom according to specific properties (rating)

let library = [];


class Book {
    constructor(title, author, status, color, rating) {
        this.title = title;
        this.author = author;
        this.status = status;
        this.rating = rating;
        this.color = color
    }

    createElement() {

        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.setAttribute('data-title', this.title);
        bookElement.setAttribute('style', `background-color: ${this.color};`);
        bookElement.setAttribute('draggable', true);
    
        const initials = document.createElement('div');
        initials.textContent = `${this.title[0]} ${this.author[0]} ${this.status[0]}`;
        bookElement.append(initials);
    
        const wrapper = document.createElement('div');
        wrapper.classList.add('book-info');
    
        for (let i in this) {
    
            if (i === 'title' || i === 'author' || i === 'status') {
    
                const info = document.createElement('p');
                info.textContent = this[i];
    
                wrapper.append(info);
            }
        }
        bookElement.append(wrapper);
    
        return bookElement;
    }
    
    changeRating(newRating) {
    
        this.rating = newRating;
    
        updateLibrary();
        return `${this.title} is now ${this.rating} stars`
    };
    
    changeStatus(newStatus) {
        
        this.status = newStatus;
    
        updateLibrary();
        return `${this.title} was changed to ${this.status}`
    }
    
    delete() {
    
        library.splice(library.indexOf(this), 1);
    
        updateLibrary();
        return `${this.title} deleted`
    };
};


function updateLibrary() {

    const shelf = document.querySelectorAll('.books');

    for(let j in shelf) {

        while (shelf[j].firstChild) {

            shelf[j].removeChild(shelf[j].firstChild);
        }

    }

    for (let i in library) {

        for (let j in shelf) {

            if (library[i].rating == shelf[j].attributes[1].value) {

                shelf[j].append(library[i].createElement());
                break
            }

        }
    };

    const changeStatusBtn = document.querySelectorAll('.book-info > p:last-child');

    changeStatusBtn.forEach(btn => btn.addEventListener('click', changeStatusHandler))
    
}


function addToLibrary(title, author, status, color = 'peru', rating = 3) {

    const newBook = new Book(title, author, status, color, rating);

    library.push(newBook);

    updateLibrary();
};

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

// UI
const newBookBtn = document.querySelector('#add-btn-fnl');
newBookBtn.addEventListener('click', addToLibraryHandler)


function addToLibraryHandler() {

    let titleElement = document.querySelector('#title');
    title = titleElement.value;
    
    let authorElement = document.querySelector('#author');
    author = authorElement.value;

    let statusElement = document.querySelector(':checked');
    status = statusElement.value;

    let colorElement = document.querySelector('#color');
    color = colorElement.value;

    addToLibrary(title, author, status, color);
    displayForm();

    titleElement.value = "";
    authorElement.value = "";
}

document.addEventListener('dragover', event => {
    event.preventDefault();
})

const shelves = document.querySelectorAll('.books');
let dragged = null;

shelves.forEach((shelf) => {shelf.addEventListener('dragstart', (event) => {
    dragged = event.target;
}) });


shelves.forEach((shelf) => {shelf.addEventListener('drop', changeRatingHandler)});

const deleteBtn = document.querySelector('.delete-btn');
deleteBtn.addEventListener('drop', changeRatingHandler);


function changeRatingHandler(event) {
    let draggedObj = null
    
    for (let i in library) {

        if (library[i].title === dragged.attributes[1].value) {

            draggedObj = library[i];
            dragged = null;
            break

        }
    }

    if (event.path[0].classList == 'book') {

        draggedObj.changeRating(event.path[1].attributes[1].value);

    } else if (event.path[0].classList == 'books') {

        draggedObj.changeRating(event.path[0].attributes[1].value);

    } else if (event.path[0].classList == 'delete-btn') {

        draggedObj.delete();
    }
} 

function changeStatusHandler(event) {
    // console.log(event.path[2].attributes[1].value);

    for (let i in library) {

        if (library[i].title == event.path[2].attributes[1].value) {

            switch (library[i].status) {
                case 'Read' :
                    library[i].changeStatus('Not Read');
                    break;
                case 'Not Read' :
                    library[i].changeStatus('Reading');
                    break;
                case 'Reading' :
                    library[i].changeStatus('Read');
                    break;
            }
        }
    }
    event.path[2].attributes[1].value
}



function demoGenerator() {
    addToLibrary('The Name of the Wind', 'Patrick Rothfuss', 'Read', 'orange', '5');
    addToLibrary('The way of Kings', 'Brandon Sanderson', 'Read', 'Yellow', '5');
    addToLibrary('Dune', 'Frank Herbert', 'Reading');
    addToLibrary('Siddharta', 'Hermann Hesse', 'Read', 'peru', '3');
    addToLibrary('Demian', 'Hermann Hesse', 'Read', '#EEE', '4');
    addToLibrary('The Sailor Who Fell From Grace With The Sea', 'Yukio Mishima', 'Read', 'blue', '4');
}
demoGenerator();