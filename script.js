const myForm = document.querySelector("#book-information");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const choiceRead = document.querySelectorAll("[name='book-read']");
const submitButton = document.querySelector("#submit-info");
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read) ? "already read" : "not read yet";
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}

function addBookToLibrary(newBook, myLibrary) {
    myLibrary.push(newBook);
}

function checkBookRead(choiceRead) {
    for (let i = 0; i < choiceRead.length; i++) {
        if (choiceRead[i].checked) {
            if (choiceRead[i].value === "1") {
                return true;
            } else {
                return false;
            }
        }
    }
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, checkBookRead(choiceRead));
    console.log(newBook.info())
    addBookToLibrary(newBook, myLibrary);
    console.log(myLibrary);
    myForm.reset();
})
