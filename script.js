const myForm = document.querySelector("#book-information");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookRead = document.querySelector("#book-read");
const submitButton = document.querySelector("#submit-info");
const newBookButton = document.querySelector("#new-book");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeDialog = document.querySelector("#close-dialog");
const container = document.querySelector("#container");

const book1 = {
    title: "Harry Potter",
    author: "Rowling",
    pages: "350",
    read: "not read yet",
};
const book2 = {
    title: "The Lord of the Rings",
    author: "Tolkien",
    pages: "323",
    read: "already read",
};

const myLibrary = [book1, book1, book2, book1, book1, book1]

for (let i of myLibrary) {
    createCard(i);
}

const deleteButton = document.querySelectorAll(".delete-btn");

// ------- BOOK OBJECT -------

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read) ? true : false;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}

// ------- FUNCTIONS -------

function addBookToLibrary(myLibrary) {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    myLibrary.unshift(newBook);
    createCard(newBook);
    setBookPosition(myLibrary);
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
    let card = document.createElement("div");
    card.classList.add("card");
    let button = document.createElement("button");
    button.textContent = "DELETE";
    button.classList.add("delete-btn")
    button.setAttribute("data-book", book.title);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(button);
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

closeDialog.addEventListener("click", (event) => {
    newBookDialog.close();
    myForm.reset();
})

deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        for (let item of myLibrary) {
            if (item.title === button.dataset.book) {
                myLibrary.splice(myLibrary.indexOf(item), 1);
                console.log(myLibrary);
                button.parentElement.remove()
            }
        }
    })
})