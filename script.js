let books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = null;

function clearModalInputs() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-isbn").value = "";
    document.getElementById("book-description").value = "";
    document.getElementById("book-status").value = "available";
    document.getElementById("book-image").value = "";
    editIndex = null;
}

function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

document.getElementById("add-modal").addEventListener("click", function () {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal-title").textContent = "Add New Book";
    clearModalInputs();
});

document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("modal").classList.add("hidden");
});

document.getElementById("save-book").addEventListener("click", function () {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const isbn = document.getElementById("book-isbn").value;
    const description = document.getElementById("book-description").value;
    const status = document.getElementById("book-status").value;
    const imageFile = document.getElementById("book-image").files[0];
    
    if (title.trim() === "" || author.trim() === "" || isbn.trim() === "") {
        alert("Please fill in all required fields.");
        return;
    }

    let imageSrc = "";
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageSrc = e.target.result;
            saveBookData(title, author, isbn, description, status, imageSrc);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveBookData(title, author, isbn, description, status, editIndex !== null ? books[editIndex].imageSrc : "");
    }
});

function saveBookData(title, author, isbn, description, status, imageSrc) {
    if (editIndex !== null) {
        books[editIndex] = { title, author, isbn, description, status, imageSrc };
    } else {
        books.push({ title, author, isbn, description, status, imageSrc });
    }
    saveBooksToLocalStorage();
    updateBookList();
    document.getElementById("modal").classList.add("hidden");
    clearModalInputs();
}

function updateBookList() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const bookElement = createBookElement(book, index);
        bookList.appendChild(bookElement);
    });
}

function createBookElement(book, index) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("bg-white", "p-4", "shadow", "rounded", "book-item");
    let imgTag = book.imageSrc ? `<img src="${book.imageSrc}" class="w-full h-48 object-cover mb-2 rounded">` : "";
    bookContainer.innerHTML = `
        ${imgTag}
        <h2 class="text-lg font-bold text-center">${book.title}</h2>
        <p class="text-sm text-gray-600 text-center">Author: ${book.author}</p>
        <div class="float-right">
        <button onclick="editBook(${index})" class="bg-green-500 text-white px-4 py-2 rounded"><i class='bx bxs-edit-alt' style='color:#fffefe'  ></i></button>
        <button onclick="deleteBook(${index})" class="border border-solid border-red-500 text-white px-4 py-2 rounded"><i class='bx bxs-trash' style='color:#f30000'  ></i></button>
        </div>
    `;
    return bookContainer;
}

function deleteBook(index) {
    books.splice(index, 1);
    saveBooksToLocalStorage();
    updateBookList();
}

function editBook(index) {
    const book = books[index];
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal-title").textContent = "Edit Book";
    document.getElementById("book-title").value = book.title;
    document.getElementById("book-author").value = book.author;
    document.getElementById("book-isbn").value = book.isbn;
    document.getElementById("book-description").value = book.description;
    document.getElementById("book-status").value = book.status;
    editIndex = index;
}

updateBookList();

document.getElementById('dropdownBtn').addEventListener('click', function () {
    document.getElementById('dropdownMenu').classList.toggle('hidden');
});