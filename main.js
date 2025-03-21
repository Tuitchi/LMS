
setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
}, 3000);
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const toast = document.getElementById("toast");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        toast.classList.remove("hidden");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 3000);

        form.reset();
    });
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");

        if (username === "admin" && password === "admin") {
            window.location.href = "library_admin.html";
        } else {
            errorMessage.classList.remove("hidden");
        }
    });

    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink(target) {
        navLinks.forEach(link => link.classList.remove("font-bold", "underline", "text-white"));
        const activeLink = [...navLinks].find(link => link.dataset.target === target);
        if (activeLink) {
            activeLink.classList.add("font-bold", "underline", "text-white");
        }
    }
    function onScroll() {
        let currentSection = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        setActiveLink(currentSection);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
});