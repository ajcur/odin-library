const myLibrary = [];

function Book(title, author, pagecount, read) {
  this.title = title;
  this.author = author;
  this.pagecount = pagecount;
  this.read = read;
}

function addBookToLibrary(title, author, pagecount, read) {
  let newBook = new Book(title, author, pagecount, read);
  myLibrary.push(newBook);
}

const newBookButton = document.querySelector('#add-book');
const newBookDialog = document.querySelector('.new-book-window');
const addButton = document.querySelector('.add-button');

newBookButton.addEventListener('click', () => {
    newBookDialog.showModal();
})

addButton.addEventListener('click', () => {
    newBookDialog.close();
})

/* addBookToLibrary('A', 'BB', 102, true);

addBookToLibrary('C', 'DD', 144, false);

console.log(myLibrary); */