const newBookButton = document.querySelector('#add-book');
const newBookDialog = document.querySelector('.new-book-window');
const addButton = document.querySelector('.add-button');
const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagecountField = document.querySelector('#pagecount');
const readCheckbox = document.querySelector('#read');
const bookshelfBox = document.querySelector('.bookshelf-box');

const myLibrary = [];

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
    bookshelfBox.replaceChildren();
    myLibrary.forEach(addBookDisplay);
}

function resetDialog() {
    titleField.value = '';
    authorField.value = '';
    pagecountField.value = '';
    readCheckbox.checked = false;
}

function addBookDisplay(book) {
    let bookDisplay = document.createElement('div');
    bookDisplay.classList = 'book-display';
    let titleDisplay = document.createElement('p');
    titleDisplay.classList = 'title-display';
    titleDisplay.textContent = `${book.title}`;
    bookDisplay.appendChild(titleDisplay);
    let authorDisplay = document.createElement('p');
    authorDisplay.classList = 'author-display';
    authorDisplay.textContent = `By ${book.author}`;
    bookDisplay.appendChild(authorDisplay);
    let pagecountDisplay = document.createElement('p');
    pagecountDisplay.classList = 'pagecount-display';
    pagecountDisplay.textContent = `${book.pagecount} pages`;
    bookDisplay.appendChild(pagecountDisplay);
    let readDisplay = document.createElement('p');
    if (book.read) {
        readDisplay.textContent = '☑️ Read';
    } else readDisplay.textContent = '❌ Not read';
    bookDisplay.appendChild(readDisplay);
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