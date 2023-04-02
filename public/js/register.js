form.addEventListener("submit", (event) => {
  
  const username = form.elements.username.value;
  const email = form.elements.email.value;
  const password = form.elements.password.value;
  const name=form.elements.name.value;
  const address=form.elements.address.value;
  const phoneNumber=form.elements.phone_number.value;
  const accountType='patient';
  const healthCardNumber=form.elements.health_card_number.value;
  
  const info = { username, name, email, password, address, phoneNumber, accountType, healthCardNumber };


  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(`success ${data}`);
      } else {
        console.log(data);
      }
    });
});
