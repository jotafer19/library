const myForm = document.querySelector("#book-information");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookRead = document.querySelector("#book-read");
const submitButton = document.querySelector("#submit-info");
const newBookButton = document.querySelector("#new-book-button");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeDialog = document.querySelector("#close-dialog");
const container = document.querySelector("#container");
const totalBooksCount = document.querySelector("#total-books");
const totalReadBooksCount = document.querySelector("#books-read");
const totalBooksBackloggedCount = document.querySelector("#not-read");

function countBooks(myLibrary) {
    let totalBooks = 0;
    let totalReadBooks = 0;
    let totalBackloggedBooks = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        totalBooks += 1;
        if (myLibrary[i].read === "Read") {
            totalReadBooks += 1;
        } else {
            totalBackloggedBooks += 1;
        }
    }
    totalBooksCount.textContent = totalBooks;
    totalReadBooksCount.textContent = totalReadBooks;
    totalBooksBackloggedCount.textContent = totalBackloggedBooks;
}

const book1 = new Book("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 480, false);
const book2 = new Book("The Fellowship of the Ring", "J. R. R. Tolkien", 423, true);
const book3 = new Book("The Final Empire: Mistborn", "Brandon Sanderson", 544, true)

let myLibrary = [book1, book2, book3]


for (let i = myLibrary.length - 1; i >= 0; i--) {
    createCard(myLibrary[i]);
}
countBooks(myLibrary);

let deleteButton = document.getElementsByClassName("delete-btn");
let readStatusButtonButton = document.querySelectorAll(".read-status"); 

// ------- BOOK OBJECT -------

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read) ? "Read" : "Not read";
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}

Book.prototype.changeReadStatus = function() {
    if (this.read === "Read") {
        this.read = "Not read";
    } else if (this.read === "Not read") {
        this.read = "Read";
    }
}

// ------- FUNCTIONS -------

function addBookToLibrary(myLibrary) {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    myLibrary.unshift(newBook);
    createCard(newBook);
    console.log(myLibrary);
    countBooks(myLibrary);
    myForm.reset();
   
}

function createCard(book) {
    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = book.title;

    let author = document.createElement("div");
    author.classList.add("author");
    author.textContent = `by ${book.author}`;

    let pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `${book.pages} pages`;

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    let readStatusButton = document.createElement("button");
    readStatusButton.textContent = book.read;
    readStatusButton.classList.add("read-status");
    readStatusButton.setAttribute("data-book", book.title);
    if (book.read === "Read") {
        if (readStatusButton.classList.contains("btn-light-red")) {
            readStatusButton.classList.remove("btn-light-red")
        }
        readStatusButton.classList.add("btn-light-green");
    } else {
        if (readStatusButton.classList.contains("btn-light-green")) {
            readStatusButton.classList.remove("btn-light-green")
        }
        readStatusButton.classList.add("btn-light-red");
    }

    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-book", book.title);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.classList.add("delete-btn");
    deleteButton.classList.add("material-symbols-outlined");
    deleteButton.setAttribute("data-book", book.title);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    buttonContainer.appendChild(readStatusButton)
    buttonContainer.appendChild(deleteButton);
    card.appendChild(buttonContainer);  
    card.setAttribute("data-book", book.title);
    container.prepend(card);

    readStatusButton.addEventListener("click", () => {
        book.changeReadStatus();
        readStatusButton.textContent = book.read;
        if (book.read === "Read") {
            if (readStatusButton.classList.contains("btn-light-red")) {
                readStatusButton.classList.remove("btn-light-red")
            }
            readStatusButton.classList.add("btn-light-green");
        } else {
            if (readStatusButton.classList.contains("btn-light-green")) {
                readStatusButton.classList.remove("btn-light-green")
            }
            readStatusButton.classList.add("btn-light-red");
        }
    })

    readStatusButton.addEventListener("click", () => {
        countBooks(myLibrary);
    })

    deleteButton.addEventListener("click", () => {
        card.remove();
        for (let item of myLibrary) {
            if (item.title === deleteButton.dataset.book){
                myLibrary.splice(myLibrary.indexOf(item), 1);
            }
        }
        console.log(myLibrary);
    })

    deleteButton.addEventListener("click", () => {
        countBooks(myLibrary);  
    })
}

// ------- EVENTS -------

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
})

myForm.addEventListener("submit", (event) => {
    addBookToLibrary(myLibrary);
    event.preventDefault();
    newBookDialog.close();
})

newBookDialog.addEventListener("click", (event) => {
    if (event.target.className !== "add-book-input") { // If click outside the form, close the dialog
        newBookDialog.close();
    }
})

closeDialog.addEventListener("click", () => {
    newBookDialog.close();
})