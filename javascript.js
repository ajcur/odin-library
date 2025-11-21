const newBookButton = document.querySelector("#add-book");
const newBookDialog = document.querySelector(".new-book-window");
const newBookForm = document.querySelector(".new-book-form");
const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagecountField = document.querySelector("#pagecount");
const readCheckbox = document.querySelector("#read");
const bookshelfBox = document.querySelector(".bookshelf-box");

let myLibrary = [];

class Book {
    constructor(id, title, author, pagecount, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pagecount = pagecount;
        this.read = read;
    }
}

Book.prototype.switchReadStatus = function () {
    if (this.read) {
        this.read = false;
    } else this.read = true;
};

Book.prototype.deleteBook = function () {
    i = myLibrary.indexOf(this);
    myLibrary = myLibrary.filter((item) => {
        return myLibrary.indexOf(item) != i;
    });
    updateBookDisplays();
};

function addBookToLibrary(id, title, author, pagecount, read) {
    let newBook = new Book(id, title, author, pagecount, read);
    myLibrary.push(newBook);
    updateBookDisplays();
}

function updateBookDisplays() {
    bookshelfBox.replaceChildren();
    myLibrary.forEach(addBookDisplay);
}

function displayReadStatus(book, readDisplay, markReadButton) {
    readDisplay.replaceChildren();
    let symbol = document.createElement("span");
    let displayText = document.createElement("span");
    if (book.read) {
        symbol.textContent = "☑";
        symbol.classList = "checkbox-marked";
        displayText.textContent = "Read";
        readDisplay.appendChild(symbol);
        readDisplay.appendChild(displayText);
        markReadButton.textContent = "Mark Unread";
    } else {
        symbol.textContent = "☒";
        symbol.classList = "checkbox-crossed-out";
        displayText.textContent = "Unread";
        readDisplay.appendChild(symbol);
        readDisplay.appendChild(displayText);
        markReadButton.textContent = "Mark Read";
    }
}

function resetDialog() {
    titleField.value = "";
    authorField.value = "";
    pagecountField.value = "";
    readCheckbox.checked = false;
}

function addBookDisplay(book) {
    let bookDisplay = document.createElement("div");
    let titleDisplay = document.createElement("p");
    let authorDisplay = document.createElement("p");
    let pagecountDisplay = document.createElement("p");
    let readDisplay = document.createElement("div");
    let buttonsBox = document.createElement("div");
    let markReadButton = document.createElement("button");
    let deleteBookButton = document.createElement("button");

    bookDisplay.classList = "book-display";
    titleDisplay.classList = "title-display";
    authorDisplay.classList = "author-display";
    pagecountDisplay.classList = "pagecount-display";
    readDisplay.classList = "read-display";
    buttonsBox.classList = "buttons-box";
    markReadButton.classList = "mark-read";
    deleteBookButton.classList = "delete-book";

    titleDisplay.textContent = `${book.title}`;
    authorDisplay.textContent = `By ${book.author}`;
    pagecountDisplay.textContent = `${book.pagecount} pages`;
    deleteBookButton.textContent = "Delete Book";

    displayReadStatus(book, readDisplay, markReadButton);

    markReadButton.addEventListener("click", () => {
        book.switchReadStatus();
        displayReadStatus(book, readDisplay, markReadButton);
    });
    deleteBookButton.addEventListener("click", () => {
        book.deleteBook();
    });

    buttonsBox.appendChild(markReadButton);
    buttonsBox.appendChild(deleteBookButton);

    bookDisplay.appendChild(titleDisplay);
    bookDisplay.appendChild(authorDisplay);
    bookDisplay.appendChild(pagecountDisplay);
    bookDisplay.appendChild(readDisplay);
    bookDisplay.appendChild(buttonsBox);

    bookshelfBox.appendChild(bookDisplay);
}

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

newBookForm.addEventListener("submit", () => {
    let id = crypto.randomUUID();
    let title = titleField.value;
    let author = authorField.value;
    let pagecount = parseInt(pagecountField.value);
    let read = readCheckbox.checked;
    addBookToLibrary(id, title, author, pagecount, read);
    resetDialog();
});

addButton.addEventListener("click", () => {
    validateFieldNotEmpty("title");
    validateFieldNotEmpty("author");
    validateFieldNotEmpty("pagecount");
});

titleField.addEventListener("change", () => {
    validateFieldNotEmpty("title");
});

authorField.addEventListener("change", () => {
    validateFieldNotEmpty("author");
});

pagecountField.addEventListener("change", () => {
    validateFieldNotEmpty("pagecount");
});

cancelButton.addEventListener("click", () => {
    newBookDialog.close();
    resetDialog();
});

function validateFieldNotEmpty(fieldName) {
    let field = document.querySelector(`#${fieldName}`);

    if (field.value === "") {
        field.setCustomValidity(`The ${fieldName} field cannot be empty.`);
    } else {
        field.setCustomValidity("");
    }
}
