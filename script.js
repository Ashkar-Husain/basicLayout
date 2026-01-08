//* Open/Close Sidebar
function toggleSidebar() {
  const aside = document.querySelector("aside");
  const hamburger = document.querySelector("#hamburger");
  const sidebar_img = document.querySelector(".sidebar-img");
  const accordions = document.querySelector(".accordions");
  aside.classList.toggle("open");
  sidebar_img.classList.toggle("open");

  if (aside.classList.contains("open")) {
    hamburger.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    accordions.style.display = "none";
  } else {
    hamburger.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
    accordions.style.display = "block";
  }
}

//* Open/Close Accordions
function toggleAccordions(el) {
  const accordion = el.closest(".accordion");
  accordion.classList.toggle("close");

  if (accordion.classList.contains("close")) {
    el.innerHTML = '<i class="fa fa-plus"></i>';
  } else {
    el.innerHTML = '<i class="fa fa-minus"></i>';
  }
}

//* Active/Inactive Navigation
function getActiveNavigation() {
  const nav = document.querySelector("#navLi");

  nav.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    nav
      .querySelectorAll("li")
      .forEach((item) => item.classList.remove("active"));

    li.classList.add("active");
  });
}

getActiveNavigation();

function toggleDropdown() {
  const profile = document.querySelector(".profile");
  profile.classList.toggle("close");
  if (profile.classList.contains("close")) {
    document
      .querySelector(".fa-chevron-up")
      .classList.remove("fa-chevron-down");
  } else {
    document.querySelector(".fa-chevron-up").classList.add("fa-chevron-down");
  }
}

//!-- Highlight Text
