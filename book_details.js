document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookIsbn = urlParams.get("isbn");

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books.find(b => b.isbn === bookIsbn);

    if (book) {
        document.getElementById("book-image").src = book.imageSrc || "placeholder.jpg";
        document.getElementById("book-title").textContent = book.title;
        document.getElementById("book-author").textContent = `Author: ${book.author}`;
        document.getElementById("book-isbn").textContent = `ISBN: ${book.isbn}`;
        document.getElementById("book-description").textContent = book.description;
        document.getElementById("book-status").textContent = `Status: ${book.status}`;
        document.getElementById("book-status").classList.add(
            book.status === "Completed" ? "text-green-600" : "text-red-600"
        );
    } else {
        document.getElementById("book-details").innerHTML = "<p class='text-red-500'>Book not found!</p>";
    }
});
