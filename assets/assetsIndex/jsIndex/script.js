// 🔹 Hamburger Menu Toggle

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger input");
  const navLinks = document.querySelector(".header-list-link");

  if (hamburger && navLinks) {
    hamburger.addEventListener("change", function () {
      navLinks.classList.toggle("show", this.checked);
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".header-list-link a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.checked = false;
        navLinks.classList.remove("show");
      });
    });
  }
});

// 🔹 Typing Effect in Home Section

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("typing-effect");
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
});

// 🔹 Dynamic Projects Section
document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.getElementById("projectsContainer");
  const toggleBtn = document.getElementById("toggleProjects");

  const projects = [
    {
      img: "assets/assetsIndex/imagesIndex/freshcart-image.png",
      title: " FreshCart – Grocery Website",
      desc: "Responsive grocery website clone with modern UI, mobile optimization, and clean design built using HTML, CSS, and JavaScript.",
      live: "https://freshcart-demo-site.netlify.app/",
      download:
        "https://github.com/codewithharshsingh/freshcart-demo-site/archive/refs/heads/main.zip",
    },
    {
      img: "assets/assetsIndex/imagesIndex/skillsImage.jpg",
      title: "Harsh Harsh ",
      desc: "This is project 2 description.",
      live: "#",
      download: "assets/projects/project2.zip",
    },
    {
      img: "assets/assetsIndex/imagesIndex/skillsImage.jpg",
      title: "Harsh Harsh ",
      desc: "This is project 2 description.",
      live: "#",
      download: "assets/projects/project2.zip",
    },
    {
      img: "assets/assetsIndex/imagesIndex/skillsImage.jpg",
      title: "Harsh Harsh ",
      desc: "This is project 2 description.",
      live: "#",
      download: "assets/projects/project2.zip",
    },
    {
      img: "assets/assetsIndex/imagesIndex/skillsImage.jpg",
      title: "Harsh Harsh ",
      desc: "This is project 2 description.",
      live: "#",
      download: "assets/projects/project2.zip",
    },
    {
      img: "assets/assetsIndex/imagesIndex/skillsImage.jpg",
      title: "Harsh Harsh Harsh Harsh Harsh Harsh ",
      desc: "This is project 2 description. Harsh Harsh Harsh Harsh HarshHarsh Harsh Harsh Harsh Harsh",
      live: "#",
      download: "assets/projects/project2.zip",
    },
  ];

  let showAll = false;

  function renderProjects() {
    projectsContainer.innerHTML = "";

    const projectsToShow = showAll
      ? projects.length
      : Math.min(4, projects.length);
    const rows = Math.ceil(projectsToShow / 4) * 4;

    for (let i = 0; i < rows; i++) {
      if (projects[i]) {
        const project = document.createElement("div");
        project.classList.add("project");

        project.innerHTML = `
          <img src="${projects[i].img}" alt="${projects[i].title}">
          <div class="project-title">${projects[i].title}</div>
          <div class="project-desc">${projects[i].desc.substring(0, 150)}</div>
          <div class="project-buttons">
            <button class="btn-primary" data-live="${
              projects[i].live
            }">Live Demo</button>
            <button class="btn-secondary" data-download="${
              projects[i].download
            }">Download</button>
          </div>
        `;

        projectsContainer.appendChild(project);
      }
    }

    toggleBtn.innerText = showAll ? "See Less Projects" : "See More Projects";

    // Add event listeners for buttons
    const downloadButtons =
      projectsContainer.querySelectorAll(".btn-secondary");
    downloadButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const file = this.getAttribute("data-download");
        downloadProject(file);
      });
    });

    const liveButtons = projectsContainer.querySelectorAll(".btn-primary");
    liveButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const liveUrl = this.getAttribute("data-live");
        window.open(liveUrl, "_blank");
      });
    });
  }

  function downloadProject(file) {
    const a = document.createElement("a");
    a.href = file;
    a.setAttribute("download", file.split("/").pop()); // Extract filename correctly
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  toggleBtn.addEventListener("click", function () {
    showAll = !showAll;
    renderProjects();
  });

  renderProjects();
});

// 🔹 Contact Form Submission with Redirect
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var form = event.target;
      var formData = new FormData(form);
      var submitButton = form.querySelector(".submit-button");

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfZs7tGrlFcuQP8KB5GH5kuMbVthli3Mu_fPtYuIor4mS5XOA/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
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
});

// 🔹 Scroll to Top Button
document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
