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
  const userName = document.querySelector("#userName");
  const user = JSON.parse(sessionStorage.getItem("userSession"));

  userName.innerHTML =
    `${user !== null ? user.name : "You"}` +
    ' <i class="fa fa-chevron-up" aria-hidden="true"></i>';

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
  const user = JSON.parse(sessionStorage.getItem("userSession"));
  console.log(user);
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
  if (user !== null) {
    dropDownList.innerHTML += `<li onclick="logoutYourself()" class="auth-item"><b><i  class="fa fa-sign-in" aria-hidden="true"></i>
                            </b> Logout</li>`;
  } else if (signup.length > 0) {
    dropDownList.innerHTML += `<li data-bs-target="#loginModal" class="auth-item"  data-bs-toggle="modal"><b><i onclick="loginYourself()" class="fa fa-sign-in" aria-hidden="true"></i>
                            </b> Login</li>`;
  } else {
    dropDownList.innerHTML += `<li data-bs-target="#signupModal" class="auth-item"   data-bs-toggle="modal"><b><i onclick="signupYourself()" class="fa fa-sign-in" aria-hidden="true"></i>
                            </b> Signup</li>`;
  }
}

//! Signup
const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
function signupYourself() {
  const signup = JSON.parse(localStorage.getItem("signup")) || [];

  const mobileInput = document.querySelector("#user_mobile");
  const emailInput = document.querySelector("#user_email");
  const passwordInput = document.querySelector("#user_password");
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
    document.querySelector("#user_password_error").innerHTML =
      "This field is required!";
    error++;
  } else {
    document.querySelector("#user_password_error").innerHTML = "";
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

  //* Check if mail address already exists
  const isExists = signup.some((user) => user.email === email);
  if (isExists) {
    Swal.fire(
      "Already Registered",
      "This email address already exists!",
      "info"
    );
    return;
  }

  //* Save data
  const sign = {
    id: Date.now(),
    name: name,
    email: email,
    mobile: mobile,
    password: password,
    confirm_password: confirmPassword,
  };

  signup.push(sign);
  localStorage.setItem("signup", JSON.stringify(signup));

  //* Success alert
  Swal.fire({
    title: "Signup Successful!",
    icon: "success",
    draggable: true,
  });

  nameInput.value = "";
  mobileInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  signupModal.hide();
  toggleDropdown();
}

//! Login
function loginYourself() {
  const email = document.querySelector("#login_email").value.trim();
  const password = document.querySelector("#login_password").value.trim();

  let error = 0;

  // Email validation
  if (!email) {
    document.querySelector("#login_email_error").innerHTML =
      "This is a required field";
    error++;
  } else {
    document.querySelector("#login_email_error").innerHTML = "";
  }

  // Password validation
  if (!password) {
    document.querySelector("#login_password_error").innerHTML =
      "This is a required field";
    error++;
  } else {
    document.querySelector("#login_password_error").innerHTML = "";
  }

  if (error !== 0) return;

  // Get signup data
  const signup = JSON.parse(localStorage.getItem("signup")) || [];

  // Find matching user
  const user = signup.find((u) => u.email === email && u.password === password);

  if (!user) {
    Swal.fire("Login Failed", "Invalid email or password", "error");
    return;
  }

  // Save session data (without password)
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  };

  sessionStorage.setItem("userSession", JSON.stringify(sessionUser));

  Swal.fire("Success", "Login successful", "success").then(() => {
    // redirect to dashboard
    window.location.reload();
  });
}

//! Logout
function logoutYourself() {
  sessionStorage.removeItem("userSession");

  Swal.fire("Logged Out", "You have been logged out", "success").then(() => {
    window.location.href = "login.html";
  });
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
// function showQueries() {
//   const queries = JSON.parse(localStorage.getItem("queries")) || [];
//   const accordions = document.querySelector(".accordions");

//   let accordion = "";

//   if (queries.length === 0) {
//     // accordion = `<p>No Queries Found!</p>`;
//   } else {
//     queries.forEach((q) => {
//       accordion += `
//         <div class="accordion">
//           <h4>
//             ${q.question}
//             <small onclick="toggleAccordions(this)">
//               <i class="fa fa-minus"></i>
//             </small>
//           </h4>
//           <p>${q.answer}</p>
//         </div>
//       `;
//     });
//   }

//   accordions.innerHTML = accordion;
// }

function showQueries(searchText = "") {
  const queries = JSON.parse(localStorage.getItem("queries")) || [];
  const accordions = document.querySelector(".accordions");

  let filtered = [...queries];

  if (searchText.trim() !== "") {
    filtered.sort((a, b) => {
      const aMatch =
        a.question.toLowerCase().includes(searchText.toLowerCase()) ||
        a.answer.toLowerCase().includes(searchText.toLowerCase());

      const bMatch =
        b.question.toLowerCase().includes(searchText.toLowerCase()) ||
        b.answer.toLowerCase().includes(searchText.toLowerCase());

      return bMatch - aMatch;
    });
  }

  let accordionHTML = "";

  filtered.forEach((q) => {
    accordionHTML += `
      <div class="accordion">
        <h4>
          ${highlightText(q.question, searchText)}
          <small onclick="toggleAccordions(this)">
            <i class="fa fa-minus"></i>
          </small>
        </h4>
        <p>${highlightText(q.answer, searchText)}</p>
      </div>
    `;
  });

  accordions.innerHTML = accordionHTML || `<p>No Queries Found!</p>`;
}

function highlightText(text, searchText) {
  if (!searchText) return text;

  const regex = new RegExp(`(${searchText})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

document.querySelector("#searchQuery").addEventListener("input", function () {
  showQueries(this.value);
});

showQueries();

//!-- Highlight Text
