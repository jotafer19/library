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

const book1 = new Book("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 480, false);
const book2 = new Book("The Fellowship of the Ring", "J. R. R. Tolkien", 423, true);
const book3 = new Book("The Final Empire: Mistborn", "Brandon Sanderson", 544, true)

let myLibrary = [book1, book2, book3]


for (let i of myLibrary) {
    createCard(i);
}

let deleteButton = document.querySelectorAll(".delete-btn");
let readStatusButton = document.querySelectorAll(".read-status"); 

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

function updateNodeList() {
    deleteButton.forEach((button) => {
        button.removeEventListener('click', searchBookToDelete);
    });
    deleteButton = document.querySelectorAll(".delete-btn");
    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            console.log("hey");
            searchBookToDelete(myLibrary, button);
        })
    })

    
  }

function addBookToLibrary(myLibrary) {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    myLibrary.unshift(newBook);
    createCard(newBook);
    console.log(myLibrary);
    myForm.reset();
    updateNodeList();
    
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
    let readStatus = document.createElement("button");
    readStatus.textContent = book.read;
    readStatus.classList.add("read-status");
    readStatus.setAttribute("data-book", book.title);
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
    card.appendChild(readStatus)
    card.appendChild(deleteButton);
    card.setAttribute("data-book", book.title);
    container.prepend(card);
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

function searchBookToDelete(myLibrary, button) {
    for (let item of myLibrary) {
        if (item.title === button.dataset.book) {
            myLibrary.splice(myLibrary.indexOf(item), 1);
            console.log(myLibrary);
            button.parentElement.remove()
        }
    }
}

deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        console.log("hey");
        searchBookToDelete(myLibrary, button);
    })
})

readStatusButton.forEach(button => {
    button.addEventListener("click", () => {
        for (let item of myLibrary) {
            if (item.title === button.parentElement.dataset.book) {
                item.changeReadStatus();
                console.log(item.read);
                button.textContent = item.read;
            }
        }
    })
})