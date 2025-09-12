const newBookButton = document.querySelector('#add-book');
const newBookDialog = document.querySelector('.new-book-window');
const addButton = document.querySelector('.add-button');
const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagecountField = document.querySelector('#pagecount');
const readCheckbox = document.querySelector('#read');
const bookshelfBox = document.querySelector('.bookshelf-box');

let myLibrary = [];

function Book(id, title, author, pagecount, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pagecount = pagecount;
    this.read = read;
}

function addBookToLibrary(id, title, author, pagecount, read) {
    let newBook = new Book(id, title, author, pagecount, read);
    myLibrary.push(newBook);
    updateBookDisplays();
}

function deleteBook(book) {
    i = myLibrary.indexOf(book);
    myLibrary = myLibrary.filter((item) => {
        return myLibrary.indexOf(item) != i;
    })
    updateBookDisplays();
}

function updateBookDisplays() {
    bookshelfBox.replaceChildren();
    myLibrary.forEach(addBookDisplay);
}

function switchReadStatus(book) {
    if (book.read) {
        book.read = false;
    } else book.read = true;
}

function displayReadStatus(book, readDisplay, markReadButton) {
    if (book.read) {
        readDisplay.textContent = '☑️ Read';
        markReadButton.textContent = 'Mark Unread';
    } else {
        readDisplay.textContent = '❌ Not read';
        markReadButton.textContent = 'Mark Read';
}}

function resetDialog() {
    titleField.value = '';
    authorField.value = '';
    pagecountField.value = '';
    readCheckbox.checked = false;
}

function addBookDisplay(book) {
    let bookDisplay = document.createElement('div');
    let titleDisplay = document.createElement('p');
    let authorDisplay = document.createElement('p');
    let pagecountDisplay = document.createElement('p');
    let readDisplay = document.createElement('p');
    let buttonsBox = document.createElement('div');
    let markReadButton = document.createElement('button');
    let deleteBookButton = document.createElement('button');

    bookDisplay.classList = 'book-display';
    titleDisplay.classList = 'title-display';
    authorDisplay.classList = 'author-display';
    pagecountDisplay.classList = 'pagecount-display'
    readDisplay.classList = 'read-display';
    buttonsBox.classList = 'buttons-box';
    markReadButton.classList = 'mark-read';
    deleteBookButton.classList = 'delete-book';
    
    titleDisplay.textContent = `${book.title}`;
    authorDisplay.textContent = `By ${book.author}`;
    pagecountDisplay.textContent = `${book.pagecount} pages`;
    deleteBookButton.textContent = 'Delete Book';

    displayReadStatus(book, readDisplay, markReadButton);

    markReadButton.addEventListener('click', () => {
        switchReadStatus(book);
        displayReadStatus(book, readDisplay, markReadButton);
    })
    deleteBookButton.addEventListener('click', () => {
        deleteBook(book);
    })

    buttonsBox.appendChild(markReadButton);
    buttonsBox.appendChild(deleteBookButton);

    bookDisplay.appendChild(titleDisplay);
    bookDisplay.appendChild(authorDisplay);;
    bookDisplay.appendChild(pagecountDisplay);
    bookDisplay.appendChild(readDisplay);
    bookDisplay.appendChild(buttonsBox);

    bookshelfBox.appendChild(bookDisplay);
}

newBookButton.addEventListener('click', () => {
    newBookDialog.showModal();
})

newBookDialog.addEventListener('close', () => {
    let id = crypto.randomUUID();
    let title = titleField.value;
    let author = authorField.value;
    let pagecount = parseInt(pagecountField.value);
    let read = readCheckbox.checked;
    addBookToLibrary(id, title, author, pagecount, read);
    resetDialog();
})