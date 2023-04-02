form.addEventListener("submit", (event) => {
  const userId = form.elements.userId.value;
  const password = form.elements.password.value;
  const info = { userId, password };

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(data);
        if(data.userType === "patient"){
        window.location.href = "/profile";
        }
        if(data.userType === "doctor"){
          window.location.href = "/doctor";
        }
        if(data.userType === "staff"){
          window.location.href = "/staff";
        }
      }
      if(data.status === "error"){
        alert("Your account has not been aproved yet");
      }

      if(data.status === "errorP"){
        alert("Invalid Username or password");
      }

      else {
        console.log(data);
      }
    });
});
