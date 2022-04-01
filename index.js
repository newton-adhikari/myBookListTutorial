// creating a book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static addBook(book) {
        // get the table body
        let tbody = document.querySelector("tbody");
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>`;
        let del = document.createElement("button");
        del.className = "btn btn-danger my-auto btn-sm delete";
        del.appendChild(document.createTextNode("X"));
        let td = document.createElement("td");
        td.appendChild(del);
        tr.appendChild(td);
        tbody.appendChild(tr);
        UI.display("Book added successfully", "success");
        UI.clearFields();

        // add the book to the local storage as well
        Store.addBook(book);
    }

    static removeBook(e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.parentElement.remove();
        }
        UI.display("Book removed successfully", "success");
        
        // remove from local storage
        let isbn = e.target.getPreviousElementSibling().textContent;
        let author = 
    }

    static display(msg, msgClass) {
        let mainSection = document.getElementById("main");
        let alertDiv = document.createElement("div");
        alertDiv.appendChild(document.createTextNode(msg));
        alertDiv.className = `alert alert-${msgClass} mb-3`;
        document.body.insertBefore(alertDiv, mainSection);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000)
    }

    static clearFields() {
        (document.getElementById("title")).value = "";
        (document.getElementById("author")).value = "";
        (document.getElementById("isbn")).value = "";
    }
}

// the store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("book") === null) {
            books = [];
        }
        else books = JSON.parse(localStorage.getItem("book"));
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem("book", JSON.stringify(books));
    }

    static removeBook(book) {
        let books = JSON.parse(localStorage.getItem("book"));
        books.forEach((b, index) => {
            if (b.title === book.title && b.author === book.author) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("book", JSON.stringify(books));
    }
}

// adding event listener
let inputForm = document.getElementById("input-form");
inputForm.addEventListener("submit", (e) => {
    // prevent the default behaviour of submit
    e.preventDefault();

    let title = (document.getElementById("title")).value;
    let author = (document.getElementById("author")).value;
    let isbn = (document.getElementById("isbn")).value;

    if (title !== "" && author !== "" && isbn !== "") {
        UI.addBook(new Book(title, author, isbn));
        return;
    }

    if (title === "") UI.display("The title must be present", "danger");
    if (author === "") UI.display("The author must be present", "danger");
    if (isbn === "") UI.display("The book isbn can't be missing", "danger");
})

// add an event listener for removing book
let table = document.querySelector("table");
table.addEventListener("click", UI.removeBook);