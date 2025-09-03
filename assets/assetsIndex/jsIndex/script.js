document.addEventListener("DOMContentLoaded", () => {
  // This is the main function that runs all other scripts
  initHamburgerMenu();
  initTypingEffect();
  initProjectsSection();
  initContactForm();
  initScrollToTop();
});

// 🔹 Hamburger Menu Toggle
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger input");
  const navLinks = document.querySelector(".header-list-link");

  if (hamburger && navLinks) {
    hamburger.addEventListener("change", function () {
      navLinks.classList.toggle("show", this.checked);
    });

    document.querySelectorAll(".header-list-link a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.checked = false;
        navLinks.classList.remove("show");
      });
    });
  }
}

// 🔹 Typing Effect in Home Section
function initTypingEffect() {
  const typingElement = document.getElementById("typing-effect");
  if (!typingElement) return;

  const texts = ["A Web Designer.", "A Frontend Developer.", "A Video Editor."];
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < texts[textIndex].length) {
      typingElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    }
  }

  type(); // Start typing effect
}

// 🔹 Dynamic Projects Section
function initProjectsSection() {
  const projectsContainer = document.getElementById("projectsContainer");
  const toggleBtn = document.getElementById("toggleProjects");

  if (!projectsContainer || !toggleBtn) return;

  const projects = [
    {
      imgs: [
        "assets/assetsIndex/imagesIndex/qr-fusion/qrfusion-1.png",
        "assets/assetsIndex/imagesIndex/qr-fusion/qrfusion-2.png",
        "assets/assetsIndex/imagesIndex/qr-fusion/qrfusion-3.png",
      ],
      title: "QR Fusion - Free & Advanced QR Code Generator",
      desc: "Generate, customize, and download professional QR codes instantly — free, private, and hassle-free.",
      live: "https://qrfusion.netlify.app/",
    },
    {
      imgs: [
        "assets/assetsIndex/imagesIndex/typrush/typrush-1.png",
        "assets/assetsIndex/imagesIndex/typrush/typrush-2.png",
        "assets/assetsIndex/imagesIndex/typrush/typrush-3.png",
      ],
      title: "TypRush – Test Your Typing Speed Online",
      desc: "Achieve typing excellence with TypeRush — simple, professional, and sound-powered.",
      live: "https://typrush.netlify.app/",
    },
    {
      imgs: [
        "assets/assetsIndex/imagesIndex/quickdrivelink/quickdrivelink-1.png",
        "assets/assetsIndex/imagesIndex/quickdrivelink/quickdrivelink-2.png",
        "assets/assetsIndex/imagesIndex/quickdrivelink/quickdrivelink-3.png",
      ],
      title: "QuickDriveLink – Instant Google Drive Links",
      desc: "Generate instant direct download links from Google Drive — fast, private, and hassle-free.",
      live: "https://quickdrivelink.netlify.app/",
    },
    {
      imgs: [
        "assets/assetsIndex/imagesIndex/freshcart/freshcart-1.png",
        "assets/assetsIndex/imagesIndex/freshcart/freshcart-2.png",
        "assets/assetsIndex/imagesIndex/freshcart/freshcart-3.png",
      ],
      title: "FreshCart – Frontend Shopping Experience",
      desc: "Responsive grocery website frontend built with HTML, CSS, and JS — clean design and mobile-ready.",
      live: "https://codewithharshsingh-freshcart.netlify.app/",
    },
    {
      imgs: [
        "assets/assetsIndex/imagesIndex/weather-app/weather-app-1.png",
        "assets/assetsIndex/imagesIndex/weather-app/weather-app-2.png",
        "assets/assetsIndex/imagesIndex/weather-app/weather-app-3.png",
      ],
      title: "Weather App",
      desc: "Live weather app with light/dark theme, using OpenWeatherMap API and responsive design.",
      live: "https://codewithharshsingh-weather-app.netlify.app/",
    },
    {
      imgs: [
        "assets/assetsIndex/imagesIndex/calculator/calculator-1.png",
        "assets/assetsIndex/imagesIndex/calculator/calculator-2.png",
        "assets/assetsIndex/imagesIndex/calculator/calculator-3.png",
      ],
      title: "Calculator",
      desc: "A simple, responsive calculator built with HTML, CSS, and JavaScript for basic arithmetic operations.",
      live: "https://codewithharshsingh-calculator.netlify.app/",
    },
  ];

  let showAll = false;

  function renderProjects() {
    projectsContainer.innerHTML = "";
    const projectsToShow = showAll ? projects : projects.slice(0, 4);

    projectsToShow.forEach((projectData) => {
      const projectEl = document.createElement("div");
      projectEl.classList.add("project");
      const imagesHTML = projectData.imgs
        .map((imgSrc) => `<img src="${imgSrc}" alt="${projectData.title}">`)
        .join("");
      const dotsHTML = projectData.imgs
        .map((_, index) => `<span class="dot" data-slide="${index}"></span>`)
        .join("");

      projectEl.innerHTML = `
        <div class="slider-container">
          <div class="slider-wrapper">${imagesHTML}</div>
          <div class="slider-dots">${dotsHTML}</div>
        </div>
        <div class="project-info">
          <div class="project-title">${projectData.title}</div>
          <div class="project-desc">${projectData.desc.substring(0, 150)}</div>
          <div class="project-buttons">
            <a href="${
              projectData.live
            }" target="_blank" class="btn-primary">Live Demo</a>
          </div>
        </div>
      `;
      projectsContainer.appendChild(projectEl);
      initSlider(projectEl);
    });
    toggleBtn.innerText = showAll ? "See Less Projects" : "See More Projects";
  }

  function initSlider(projectCard) {
    const wrapper = projectCard.querySelector(".slider-wrapper");
    const dots = projectCard.querySelectorAll(".dot");
    const images = projectCard.querySelectorAll(".slider-wrapper img");
    if (images.length <= 1) return; // Don't initialize slider if only one image

    const slideCount = images.length;
    let currentIndex = 0;
    let autoSwipeInterval;

    function goToSlide(index) {
      if (!wrapper) return;
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot) => dot.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
      currentIndex = index;
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % slideCount);
    }

    function startAutoSwipe() {
      stopAutoSwipe();
      autoSwipeInterval = setInterval(nextSlide, 2000); // 2-second interval
    }

    function stopAutoSwipe() {
      clearInterval(autoSwipeInterval);
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        goToSlide(parseInt(e.target.dataset.slide));
        startAutoSwipe(); // Reset timer on manual click
      });
    });

    goToSlide(0);
    startAutoSwipe();
  }

  toggleBtn.addEventListener("click", () => {
    showAll = !showAll;
    renderProjects();
  });

  renderProjects(); // Initial render
}

// 🔹 Contact Form Submission with Redirect
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector(".submit-button");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    fetch(
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfZs7tGrlFcuQP8KB5GH5kuMbVthli3Mu_fPtYuIor4mS5XOA/formResponse",
      { method: "POST", body: new FormData(form), mode: "no-cors" }
    )
      .then(() => {
        window.location.href = "thankyou.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      });
  });
}

// 🔹 Scroll to Top Button
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (!scrollToTopBtn) return;

  window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
