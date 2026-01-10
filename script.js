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
  const dropDownList = document.querySelector("#dropDownList");
  profile.classList.toggle("close");
  if (profile.classList.contains("close")) {
    document
      .querySelector(".fa-chevron-up")
      .classList.remove("fa-chevron-down");
  } else {
    document.querySelector(".fa-chevron-up").classList.add("fa-chevron-down");
  }

  //* Signup/Login Button
  // Remove old auth item if exists
  const oldAuthItem = dropDownList.querySelector(".auth-item");
  if (oldAuthItem) oldAuthItem.remove();
  const signup = JSON.parse(localStorage.getItem("signup")) || [];
  if (signup.length > 0) {
    dropDownList.innerHTML += `<li data-bs-target="#loginModal" class="auth-item"  data-bs-toggle="modal"><b><i onclick="loginYourself()" class="fa fa-sign-in" aria-hidden="true"></i>
                            </b> Login</li>`;
  } else {
    dropDownList.innerHTML += `<li data-bs-target="#signupModal" class="auth-item"   data-bs-toggle="modal"><b><i onclick="signupYourself()" class="fa fa-sign-in" aria-hidden="true"></i>
                            </b> Signup</li>`;
  }
}

//! Signup
function signupYourself() {
  const signup = JSON.parse(localStorage.getItem("signup")) || [];

  const mobileInput = document.querySelector("#user_mobile");
  const emailInput = document.querySelector("#user_email");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm_password");
  const nameInput = document.querySelector("#user_name");

  const mobile = mobileInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  let error = 0;
  if (!name) {
    document.querySelector("#user_name_error").innerHTML =
      "This field is required!";
    error++;
  } else {
    document.querySelector("#user_name_error").innerHTML = "";
  }

  if (!email) {
    document.querySelector("#user_email_error").innerHTML =
      "This field is required!";
    error++;
  } else {
    document.querySelector("#user_email_error").innerHTML = "";
  }

  if (!mobile) {
    document.querySelector("#user_mobile_error").innerHTML =
      "This field is required!";
    error++;
  } else {
    document.querySelector("#user_mobile_error").innerHTML = "";
  }

  if (!password) {
    document.querySelector("#password_error").innerHTML =
      "This field is required!";
    error++;
  } else {
    document.querySelector("#password_error").innerHTML = "";
  }

  if (!confirmPassword) {
    document.querySelector("#confirm_password_error").innerHTML =
      "This field is required!";
    error++;
  } else {
    document.querySelector("#confirm_password_error").innerHTML = "";
  }

  if (password && confirmPassword && password !== confirmPassword) {
    document.querySelector("#confirm_password_error").innerHTML =
      "Password and confirmation password do not match!";
    error++;
  }

  if (error != 0) {
    return;
  }

  //* Mobile number validation (10-digit)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    Swal.fire(
      "Invalid Number",
      "Enter a valid 10-digit mobile number",
      "warning"
    );
    return;
  }

  //* Email Validation
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!mailRegex.test(email)) {
    Swal.fire("Invalid Email", "Enter a valid email address", "warning");
    return;
  }

  //* Check if mobile already exists
  const isExists = signup.some((user) => user.mobile === mobile);
  if (isExists) {
    Swal.fire(
      "Already Registered",
      "This mobile number already exists",
      "info"
    );
    return;
  }

  //* Save data
  const sign = {
    id: Date.now(),
    name: name,
    mobile: mobile,
    password: password,
  };

  signup.push(sign);
  localStorage.setItem("signup", JSON.stringify(signup));

  //* Success alert
  Swal.fire({
    title: "Signup Successful!",
    icon: "success",
    draggable: true,
  });

  mobileInput.value = "";
  passwordInput.value = "";
}

const queriesModal = new bootstrap.Modal(
  document.getElementById("queriesModal")
);

//? Add New Query
function addNewQuery() {
  const question = document.querySelector("#question").value.trim();
  const answer = document.querySelector("#answer").value.trim();

  if (!question || !answer) {
    if (!question || !answer) {
      Swal.fire("Warning", "All fields are required", "error");
      return;
    }
  }

  const queries = JSON.parse(localStorage.getItem("queries")) || [];

  const query = {
    id: Date.now(),
    question: question,
    answer: answer,
  };

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      queries.push(query);
      localStorage.setItem("queries", JSON.stringify(queries));
      Swal.fire("Success", "Request completed successfully!", "success");
      queriesModal.hide();
      showQueries();
      document.querySelector("#question").value = "";
      document.querySelector("#answer").value = "";
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

//! Show Queries
function showQueries() {
  const queries = JSON.parse(localStorage.getItem("queries")) || [];
  const accordions = document.querySelector(".accordions");

  let accordion = "";

  if (queries.length === 0) {
    // accordion = `<p>No Queries Found!</p>`;
  } else {
    queries.forEach((q) => {
      accordion += `
        <div class="accordion">
          <h4>
            ${q.question}
            <small onclick="toggleAccordions(this)">
              <i class="fa fa-minus"></i>
            </small>
          </h4>
          <p>${q.answer}</p>
        </div>
      `;
    });
  }

  accordions.innerHTML = accordion;
}

showQueries();

//!-- Highlight Text
