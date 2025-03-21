document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const searchBar = document.getElementById("search-bar");
    
    let books = JSON.parse(localStorage.getItem("books")) || [];
    console.log(books);
    function loadBooks(view = "grid", filteredBooks = null) {
        bookList.innerHTML = "";
        const displayBooks = filteredBooks || books;

        if (displayBooks.length === 0) {
            bookList.innerHTML = `<p class='text-gray-500 text-center'>No books found.</p>`;
            return;
        }

        displayBooks.forEach((book) => {
            const bookElement = createBookElement(book, view);
            bookList.appendChild(bookElement);
        });

        updateLayout(view);
    }

    function createBookElement(book, view) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("bg-white", "p-4", "shadow", "rounded-lg", "transition", "duration-300", "hover:shadow-lg");

        let imgTag = book.imageSrc ? `<img src="${book.imageSrc}" class="w-full h-48 object-cover mb-2 rounded">` : "";

        if (view === "grid") {
            bookContainer.classList.add("text-center");
            bookContainer.innerHTML = `
                ${imgTag}
                <h2 class="text-lg font-bold">${book.title}</h2>
                <p class="text-xs text-gray-600">Author: ${book.author}</p>
                <p class="text-sm text-gray-600 my-3">${book.description}</p>
                <p class="text-sm text-${book.status === 'Completed' ? 'green' : 'red'}-500 font-semibold">${book.status}</p>
            `;
        } else {
            bookContainer.classList.add("flex", "items-center", "gap-4", "p-2");
            bookContainer.innerHTML = `
                ${imgTag ? `<div class="w-[150px]">${imgTag}</div>` : ""}
                <div>
                    <h2 class="text-lg font-bold">${book.title}</h2>
                    <p class="text-sm text-gray-600">Author: ${book.author}</p>
                    <p class="text-sm text-gray-600">ISBN: ${book.isbn}</p>
                    <p class="text-sm text-gray-600">Description: ${book.description}</p>
                    <p class="text-sm text-${book.status === 'Completed' ? 'green' : 'red'}-500 font-semibold">${book.status}</p>
                </div>
            `;
        }

        return bookContainer;
    }

    function updateLayout(view) {
        if (view === "grid") {
            bookList.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-4");
            bookList.classList.remove("flex", "flex-col");
        } else {
            bookList.classList.add("flex", "flex-col", "gap-2");
            bookList.classList.remove("grid", "grid-cols-1", "md:grid-cols-3", "gap-4");
        }
    }

    searchBar.addEventListener("input", function () {
        const query = searchBar.value.toLowerCase().trim();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.isbn.includes(query)
        );
        loadBooks(getCurrentView(), filteredBooks);
    });

    function getCurrentView() {
        return bookList.classList.contains("grid") ? "grid" : "list";
    }

    gridViewBtn.addEventListener("click", () => loadBooks("grid"));
    listViewBtn.addEventListener("click", () => loadBooks("list"));

    loadBooks("grid");
});
