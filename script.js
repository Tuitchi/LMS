let books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = null;
let bookToDelete = null;

function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

function clearModalInputs() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-isbn").value = "";
    document.getElementById("book-description").value = "";
    document.getElementById("book-status").value = "Available";
    document.getElementById("book-image").value = "";
    editIndex = null;
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
        <p class="text-sm text-gray-600 text-center">ISBN: ${book.isbn}</p>
        <p class="text-sm text-gray-600 text-center">Description: ${book.description}</p>
        <p class="text-sm text-gray-600 text-center">Availability: ${book.status}</p>
        <div class="flex justify-center mt-2 space-x-2">
            <button onclick="editBook(${index})" class="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600 hover:scale-105">
                <i class='bx bxs-edit-alt'></i>
            </button>
            <button onclick="showDeleteModal(${index})" class="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600 hover:scale-105">
                <i class='bx bxs-trash'></i>
            </button>
        </div>
    `;
    return bookContainer;
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

function showDeleteModal(index) {
    bookToDelete = index;
    document.getElementById("delete-modal").classList.remove("hidden");
}

function hideDeleteModal() {
    document.getElementById("delete-modal").classList.add("hidden");
}

document.getElementById("cancel-delete").addEventListener("click", hideDeleteModal);

document.getElementById("confirm-delete").addEventListener("click", function () {
    if (bookToDelete !== null) {
        deleteBook(bookToDelete);
        hideDeleteModal();
    }
});

function deleteBook(index) {
    books.splice(index, 1);
    saveBooksToLocalStorage();
    updateBookList();
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
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const isbn = document.getElementById("book-isbn").value.trim();
    const description = document.getElementById("book-description").value.trim();
    const status = document.getElementById("book-status").value;
    const imageFile = document.getElementById("book-image").files[0];

    if (!title || !author || !isbn) {
        alert("Please fill in all required fields.");
        return;
    }

    let imageSrc = editIndex !== null ? books[editIndex].imageSrc : "";

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageSrc = e.target.result;
            saveBookData(title, author, isbn, description, status, imageSrc);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveBookData(title, author, isbn, description, status, imageSrc);
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

document.getElementById('dropdownBtn').addEventListener('click', function () {
    document.getElementById('dropdownMenu').classList.toggle('hidden');
});

updateBookList();