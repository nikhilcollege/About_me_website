/* =====================================
   1. SELECT HTML ELEMENTS
===================================== */

const typingText = document.getElementById("typing-text");

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const themeToggle = document.getElementById("theme-toggle");

const backToTop = document.getElementById("back-to-top");

const currentYear = document.getElementById("current-year");


/* =====================================
   2. ANIMATED TYPING TEXT
===================================== */

const words = [
    "Student",
    "Developer",
    "Tech Enthusiast",
    "Lifelong Learner"
];

let wordIndex = 0;
let characterIndex = 0;

let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingText.textContent = currentWord.substring(
        0,
        characterIndex
    );

    let delay = deleting ? 55 : 100;

    if (!deleting && characterIndex === currentWord.length) {

        deleting = true;
        delay = 1300;

    } else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        delay = 350;

    }

    setTimeout(typeEffect, delay);

}

if (typingText) {
    typeEffect();
}


/* =====================================
   3. MOBILE NAVIGATION
===================================== */

function closeMenu() {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuToggle.textContent = "☰";

}


menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


/* Close the menu after clicking a navigation link */

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", closeMenu);

});


/* Close the menu when clicking outside it */

document.addEventListener("click", function (event) {

    const clickedInsideMenu = navLinks.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
    }

});


/* Close the mobile menu when returning to desktop */

window.addEventListener("resize", function () {

    if (window.innerWidth > 720) {
        closeMenu();
    }

});


/* =====================================
   4. DARK / LIGHT THEME
===================================== */

function updateThemeButton() {

    const isLight = document.body.classList.contains(
        "light-theme"
    );

    themeToggle.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
    );

    themeToggle.title = isLight
        ? "Switch to dark theme"
        : "Switch to light theme";

}


/* Load saved theme */

try {

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

    }

} catch (error) {

    console.warn("Theme preference could not be loaded.");

}

updateThemeButton();


/* Switch themes when the button is clicked */

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains(
        "light-theme"
    );

    try {

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

    } catch (error) {

        console.warn("Theme preference could not be saved.");

    }

    updateThemeButton();

});


/* =====================================
   5. ACTIVE NAVIGATION LINK
===================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationItems = document.querySelectorAll(
    ".nav-link"
);


function updateActiveLink() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 160;

    sections.forEach(function (section) {

        if (scrollPosition >= section.offsetTop) {

            currentSection = section.id;

        }

    });

    navigationItems.forEach(function (link) {

        const target = link.getAttribute("href");

        const isActive = target === "#" + currentSection;

        link.classList.toggle("active", isActive);

    });

}


/* =====================================
   6. BACK TO TOP BUTTON
===================================== */

function updateBackToTop() {

    if (window.scrollY > 400) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================
   7. SCROLL EVENT
===================================== */

let scrollScheduled = false;

window.addEventListener("scroll", function () {

    if (scrollScheduled) {
        return;
    }

    scrollScheduled = true;

    window.requestAnimationFrame(function () {

        updateActiveLink();

        updateBackToTop();

        scrollScheduled = false;

    });

});


/* =====================================
   8. COPYRIGHT YEAR
===================================== */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =====================================
   9. INITIAL PAGE STATE
===================================== */

updateActiveLink();

updateBackToTop();