// ===============================
// Typing Animation
// ===============================
const typingText = document.getElementById("typingText");

const words = [
  "IT Support Specialist",
  "Technical Support",
  "Freelancer",
  "ERP Support",
  "Technology Solutions"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

if (typingText) {
  typeEffect();
}


// ===============================
// Dark Mode Toggle
// ===============================
const darkModeToggle = document.getElementById("darkModeToggle");

if (darkModeToggle) {
  const darkModeIcon = darkModeToggle.querySelector("i");

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.classList.remove("bi-moon-stars");
      darkModeIcon.classList.add("bi-sun");
      localStorage.setItem("theme", "dark");
    } else {
      darkModeIcon.classList.remove("bi-sun");
      darkModeIcon.classList.add("bi-moon-stars");
      localStorage.setItem("theme", "light");
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      darkModeIcon.classList.remove("bi-moon-stars");
      darkModeIcon.classList.add("bi-sun");
    }
  });
}


// ===============================
// Smooth Scroll + Fade In Section
// ===============================
const menuLinks = document.querySelectorAll(
  ".nav-link, .footer-links a, .hero-buttons a"
);

menuLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      event.preventDefault();

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbar = document.querySelector(".custom-navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const sectionPosition = targetSection.offsetTop - navbarHeight + 5;

        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth"
        });

        targetSection.classList.remove("active");

        setTimeout(() => {
          targetSection.classList.add("active");
        }, 250);
      }
    }
  });
});


// ===============================
// Reveal Animation on Scroll Direction
// Scroll Down : Fade in from bottom
// Scroll Up   : Fade in from top
// ===============================
const revealElements = document.querySelectorAll(".reveal-section, .reveal-card");

let lastScrollY = window.scrollY;
let scrollDirection = "down";

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    scrollDirection = "down";
  } else if (currentScrollY < lastScrollY) {
    scrollDirection = "up";
  }

  lastScrollY = currentScrollY;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        element.classList.remove("from-top", "from-bottom");

        if (scrollDirection === "down") {
          element.classList.add("from-bottom");
        } else {
          element.classList.add("from-top");
        }

        setTimeout(() => {
          element.classList.add("active");
        }, 40);
      } else {
        element.classList.remove("active");

        if (scrollDirection === "down") {
          element.classList.remove("from-top");
          element.classList.add("from-bottom");
        } else {
          element.classList.remove("from-bottom");
          element.classList.add("from-top");
        }
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -35px 0px"
  }
);

revealElements.forEach((element) => {
  element.classList.add("from-bottom");
  revealObserver.observe(element);
});


// ===============================
// Project Filtering
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === "all" || itemCategory === filterValue) {
        item.classList.remove("hide");

        setTimeout(() => {
          item.classList.add("active");
        }, 80);
      } else {
        item.classList.add("hide");
      }
    });
  });
});


// ===============================
// Back To Top Button
// ===============================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// ===============================
// Navbar Active State on Scroll
// ===============================
const sections = document.querySelectorAll("header[id], section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// ===============================
// Navbar Effect on Scroll
// ===============================
const customNavbar = document.querySelector(".custom-navbar");

if (customNavbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      customNavbar.classList.add("scrolled");
    } else {
      customNavbar.classList.remove("scrolled");
    }
  });
}


// ===============================
// Close Mobile Navbar After Click
// ===============================
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});


// ===============================
// Light Parallax Effect
// ===============================
const profileWrapper = document.querySelector(".profile-wrapper");
const shapeOne = document.querySelector(".shape-one");
const shapeTwo = document.querySelector(".shape-two");
const shapeThree = document.querySelector(".shape-three");

window.addEventListener("scroll", () => {
  const scrollValue = window.scrollY;

  if (profileWrapper) {
    profileWrapper.style.transform = `translateY(${scrollValue * 0.035}px)`;
  }

  if (shapeOne) {
    shapeOne.style.transform = `translateY(${scrollValue * 0.06}px)`;
  }

  if (shapeTwo) {
    shapeTwo.style.transform = `translateY(-${scrollValue * 0.04}px)`;
  }

  if (shapeThree) {
    shapeThree.style.transform = `translateY(${scrollValue * 0.025}px)`;
  }
});


// ===============================
// Contact Form Validation
// ===============================
const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");

if (contactForm && formAlert) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
      formAlert.textContent = "Please fill in all fields.";
      formAlert.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      formAlert.textContent = "Please enter a valid email address.";
      formAlert.style.color = "red";
      return;
    }

    formAlert.textContent =
      "Message successfully prepared. Please contact me through email or WhatsApp.";
    formAlert.style.color = "#2563EB";

    contactForm.reset();
  });
}

function validateEmail(email) {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  return emailPattern.test(email.toLowerCase());
}