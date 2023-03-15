const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");

document.addEventListener("click", (event) => {
  if (event.target === signupLink) {
    loginForm.style.display = "none";
    signupLink.style.display = "none";
    signupForm.style.display = "block";
    loginLink.style.display = "block";
  } else if (event.target === loginLink) {
    loginForm.style.display = "block";
    signupLink.style.display = "block";
    signupForm.style.display = "none";
    loginLink.style.display = "none";
  }
});


