//* Open/Close Sidebar
function toggleSidebar() {
  const aside = document.querySelector("aside");
  const hamburger = document.querySelector("#hamburger");
  const sidebar_img = document.querySelector(".sidebar-img");
  const accordions = document.querySelector(".accordions");
  aside.classList.toggle("open");
  sidebar_img.classList.toggle("open");
  accordions.style.display = "none";

  if (aside.classList.contains("open")) {
    hamburger.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  } else {
    hamburger.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
  }
}

//* Open/Close Accordions
function toggleAccordions() {
  const icons = document.querySelectorAll("small");
  icons.forEach((icon) => {
    let accordion = icon.closest(".accordion");
    // console.log(accordion, "ashkar");
    // const para = accordion.querySelector("p");
    // console.log(para)
    accordion.classList.toggle("close");
    if (accordion.classList.contains("close")) {
      icon.innerHTML = '<i class="fa fa-plus"></i>';
    } else {
      icon.innerHTML = '<i class="fa fa-minus"></i>';
    }
  });
}

//* Active/Inactive Navigation
function getActiveNavigation() {
  const nav = document.querySelector("#navLi");

  nav.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    nav.querySelectorAll("li").forEach(item =>
      item.classList.remove("active")
    );

    li.classList.add("active");
  });
}

getActiveNavigation();



//!-- Highlight Text

