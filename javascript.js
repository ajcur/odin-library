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

addBookToLibrary('A', 'BB', 102, true);

addBookToLibrary('C', 'DD', 144, false);

console.log(myLibrary);