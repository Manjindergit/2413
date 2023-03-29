let patients = [];
function loadData(fil) {
  fetch("/api/fetchPatient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        patients = data.patient;
        populateTable(patients, fil);
      } else {
        console.log(data);
      }
    });
}

document.getElementById("loadPatient").addEventListener("click", async () => {
  await loadData(false);
});

document
  .getElementById("loadInactivePatient")
  .addEventListener("click", async () => {
    loadData(true);
  });

function populateTable(patients, showInactiveOnly) {
  console.log(patients);
  document.getElementById("allPatientTable").style.display = "block";
  const patientTableBody = document.getElementById("patient-table-body");
  patientTableBody.textContent = ""; // clear previous table rows
  let filteredPatients = patients;
  if (showInactiveOnly) {
    filteredPatients = patients.filter((patient) => !patient.approved);
    console.log(filteredPatients);
  }

  // append rows to the table
  filteredPatients.forEach((patient) => {
    const row = `
              <tr>
                <td contenteditable="true">${patient.name}</td>
                <td contenteditable="true">${patient.email}</td>
                <td contenteditable="true">${patient.address}</td>

                
                <td contenteditable="true">${patient.phone}</td>
                <td contenteditable="true">${patient.health_card_number}</td>
                <td contenteditable="true"><select class="active-select">
                <option value="1"${
                  patient.approved ? " selected" : ""
                }>Active</option>
                <option value="0"${
                  !patient.approved ? " selected" : ""
                }>Inactive</option>
            </select></td>
                <td>
                  
                    <button type="button" class="editPatient" data-id="${
                      patient.id
                    }">
                        Update
                    </button>

                    <button type="button" class="deletePatient" data-id="${
                      patient.id
                    }">
                          Delete User
                      </button>
                    
                
                </td>
              </tr>
            `;

    patientTableBody.insertAdjacentHTML("beforeend", row);
  });

  const deletePatient = document.querySelectorAll(".deletePatient");
  deletePatient.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log(button.dataset.id);
      fetch("/api/deletePatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: button.dataset.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const row = button.closest("tr");
            row.remove();
            console.log("deleted");
          } else {
            console.log("noot deleted");
          }
        });
    });
  });

  const editPatient = document.querySelectorAll(".editPatient");
  editPatient.forEach((button) => {
    button.addEventListener("click", (event) => {
      const row = button.closest("tr");
      const cells = row.querySelectorAll("td");
      const updatedPatient = {
        id: button.dataset.id,
        name: cells[0].textContent,
        email: cells[1].textContent,
        address: cells[2].textContent,
        phone_number: cells[3].textContent,
        health_card_number: cells[4].textContent,
        active: cells[5].querySelector(".active-select").value,
      };

      fetch("/api/updatedPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatient),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert("Patient Updated");
            console.log("success");
          } else {
            console.log("noot updated");
          }
        });
    });
  });
}

document.getElementById("createDoctor").addEventListener("click", () => {
  const doctor = {
    username: document.getElementById("username").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone_number").value,
    accountType: "doctor",
    password: document.getElementById("password").value,
    speciality: document.getElementById("speciality").value,
  };

  console.log(doctor);

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("success");
      } else {
        console.log("noot created");
      }
    });
});
