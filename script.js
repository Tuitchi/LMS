let books = JSON.parse(localStorage.getItem("books")) || [];
if (books.length === 0) {
    books = [
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            isbn: "9780743273565",
            description: "A novel about wealth and tragedy in the Jazz Age.",
            status: "Available",
            imageSrc: "https://via.placeholder.com/150"
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            isbn: "9780061120084",
            description: "A story of racial injustice and moral growth.",
            status: "Checked Out",
            imageSrc: "https://via.placeholder.com/150"
        },
        {
            title: "1984",
            author: "George Orwell",
            isbn: "9780451524935",
            description: "A dystopian novel about government surveillance.",
            status: "Available",
            imageSrc: "https://via.placeholder.com/150"
        },
        {
            title: "Moby-Dick",
            author: "Herman Melville",
            isbn: "9781503280786",
            description: "A whaling adventure with philosophical themes.",
            status: "Available",
            imageSrc: "https://via.placeholder.com/150"
        }
    ];
    saveBooksToLocalStorage();
}
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
        books.push({ title, author, isbn, description, status, imageSrc }); document.addEventListener("DOMContentLoaded", function () {
            let books = JSON.parse(localStorage.getItem("books")) || [];
            let editIndex = null;

            if (books.length === 0) {
                books = [
                    {
                        title: "The Great Gatsby",
                        author: "F. Scott Fitzgerald",
                        isbn: "9780743273565",
                        description: "A novel about wealth and tragedy in the Jazz Age.",
                        status: "Available",
                        imageSrc: "https://via.placeholder.com/150"
                    },
                    {
                        title: "To Kill a Mockingbird",
                        author: "Harper Lee",
                        isbn: "9780061120084",
                        description: "A story of racial injustice and moral growth.",
                        status: "Checked Out",
                        imageSrc: "https://via.placeholder.com/150"
                    },
                    {
                        title: "1984",
                        author: "George Orwell",
                        isbn: "9780451524935",
                        description: "A dystopian novel about government surveillance.",
                        status: "Available",
                        imageSrc: "https://via.placeholder.com/150"
                    },
                    {
                        title: "Moby-Dick",
                        author: "Herman Melville",
                        isbn: "9781503280786",
                        description: "A whaling adventure with philosophical themes.",
                        status: "Available",
                        imageSrc: "https://via.placeholder.com/150"
                    }
                ];
                saveBooksToLocalStorage();
            }

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

                let imageSrc = editIndex !== null ? books[editIndex].imageSrc : ""; // Keep existing image when editing

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
                        <button onclick="editBook(${index})" class="bg-green-500 text-white px-4 py-2 rounded">
                            <i class='bx bxs-edit-alt'></i>
                        </button>
                        <button onclick="deleteBook(${index})" class="bg-red-500 text-white px-4 py-2 rounded">
                            <i class='bx bxs-trash'></i>
                        </button>
                    </div>
                `;

                return bookContainer;
            }

            function deleteBook(index) {
                if (confirm("Are you sure you want to delete this book?")) {
                    books.splice(index, 1);
                    saveBooksToLocalStorage();
                    updateBookList();
                }
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
        });

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
        <button onclick="editBook(${index})" 
    class="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600 hover:scale-105">
    <i class='bx bxs-edit-alt'></i>
</button>

<button onclick="deleteBook(${index})" 
    class="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600 hover:scale-105">
    <i class='bx bxs-trash'></i>
</button>

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