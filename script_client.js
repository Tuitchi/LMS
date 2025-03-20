document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    function loadBooks(view = "grid") {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        bookList.innerHTML = "";

        books.forEach(book => {
            const bookElement = createBookElement(book, view);
            bookList.appendChild(bookElement);
        });

        updateLayout(view);
    }

    function createBookElement(book, view) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("bg-white", "p-4", "shadow", "rounded");

        let imgTag = book.imageSrc ? `<img src="${book.imageSrc}" class="w-full h-48 object-cover mb-2 rounded">` : "";

        if (view === "grid") {
            bookContainer.innerHTML = `
                ${imgTag}
                <h2 class="text-lg font-bold text-center">${book.title}</h2>
                <p class="text-sm text-gray-600 text-center">Author: ${book.author}</p>
            `;
        } else {
            bookContainer.classList.add("flex", "items-center", "gap-4", "p-2");
            bookContainer.innerHTML = `
                ${imgTag ? `<div class="w-[300px]">${imgTag}</div>` : ""}
                <div>
                    <h2 class="text-lg font-bold">${book.title}</h2>
                    <p class="text-sm text-gray-600">Author: ${book.author}</p>
                    <p class="text-sm text-gray-600">ISBN: ${book.isbn}</p>
                    <p class="text-sm text-gray-600">Description: ${book.description}</p>
                    <p class="text-sm text-gray-600">Availability: ${book.status}</p>
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
            bookList.classList.add("flex", "flex-col");
            bookList.classList.remove("grid", "grid-cols-1", "md:grid-cols-3", "gap-4");
        }
    }

    gridViewBtn.addEventListener("click", () => loadBooks("grid"));
    listViewBtn.addEventListener("click", () => loadBooks("list"));

    loadBooks("grid");
});
