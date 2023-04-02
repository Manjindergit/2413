function hideAllTable() {
  document.getElementById("allPatientTable").style.display = "none";
  document.getElementById("labTable").style.display = "none";
  document.getElementById("presTable").style.display = "none";
  document.getElementById("docTable").style.display = "none";
}

document.getElementById("editProfile").addEventListener("click", function () {
  fetch("/api/fetchPatient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: patientID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        patients = data.patient;
        populateTable(patients);
      } else {
        console.log(data);
      }
    });
});

document.getElementById("labExam").addEventListener("click", function () {
  fetch("/api/fetchLab", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: patientID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        const patients = data.patient;
        labpopulateTable(patients);
      } else {
        console.log(data);
      }
    });
});

document.getElementById("prescription").addEventListener("click", function () {
  fetch("/api/fetchPres", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: patientID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        
        patients = data.patient;
        prepopulateTable(patients);
      } else {
        alert("Could not fetch prescriptions");
        console.log(data);
      }
    });
});

document.getElementById("doctor").addEventListener("click", function () {
  fetch("/api/fetchDoctor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: patientID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        
        patients = data.patient;
        docpopulateTable(patients);
      } else {
        alert("Could not fetch doctors");
        console.log(data);
      }
    });
});

function populateTable(patients) {
  hideAllTable();
  document.getElementById("allPatientTable").style.display = "block";
  const patientTableBody = document.getElementById("patientVisitTableBody");
  patientTableBody.textContent = ""; // clear previous table rows

  // append rows to the table
  patients.forEach((patient) => {
    const row = `
                    <tr>
                    <td>${patient.id}</td>
                      <td contenteditable="true">${patient.name}</td>
                      <td contenteditable="true">${patient.email}</td>
                      <td contenteditable="true">${patient.address}</td>
      
                      
                      <td contenteditable="true">${patient.phone}</td>
                      <td contenteditable="true">${patient.health_card_number}</td>
                      
                      <td>
                          <button type="button" class="editPatient" data-id="${patientID}">
                              Update
                          </button>                
                      </td>
                    </tr>
                  `;

    patientTableBody.insertAdjacentHTML("beforeend", row);
  });

  const editPatient = document.querySelectorAll(".editPatient");
  editPatient.forEach((button) => {
    button.addEventListener("click", (event) => {
      const row = button.closest("tr");
      const cells = row.querySelectorAll("td");
      const updatedPatient = {
        id: button.dataset.id,
        name: cells[1].textContent,
        email: cells[2].textContent,
        address: cells[3].textContent,
        phone_number: cells[4].textContent,
        health_card_number: cells[5].textContent,
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

function labpopulateTable(arr) {
  hideAllTable();
  document.getElementById("labTable").style.display = "block";
  const patientTableBody = document.getElementById("labTableBody");
  patientTableBody.textContent = ""; // clear previous table rows

  // create table head row

  // append rows to the table
  arr.forEach((patient) => {
    const row = `
                      <tr>
                      <td>${patient.id}</td>
                        <td>${patient.doctor_id}</td>
                        <td>${patient.exam_item}</td>
                        <td>${patient.result}</td>
                        <td>${patient.normal_range}</td>
                        <td>${patient.date}</td>
                      </tr>
                    `;

    patientTableBody.insertAdjacentHTML("beforeend", row);
  });
}

function prepopulateTable(arr) {
  hideAllTable();
  document.getElementById("presTable").style.display = "block";
  const patientTableBody = document.getElementById("presTableBody");
  patientTableBody.textContent = ""; // clear previous table rows

  // create table head row

  // append rows to the table
  arr.forEach((patient) => {
    const row = `
                        <tr>
                        <td>${patient.visit_id}</td>
                          <td>${patient.medicine_name}</td>
                          <td>${patient.quantity}</td>
                          <td>${patient.dose}</td>
                          <td>${patient.refillable}</td>
                          <td>${patient.date}</td>
                        </tr>
                      `;

    patientTableBody.insertAdjacentHTML("beforeend", row);
  });
}

function docpopulateTable(arr) {
  hideAllTable();
  document.getElementById("docTable").style.display = "block";
  const patientTableBody = document.getElementById("docTableBody");
  patientTableBody.textContent = ""; // clear previous table rows

  // create table head row

  // append rows to the table
  arr.forEach((patient) => {
    const row = `
                        <tr>
                        <td>${patient.id}</td>
                        <td>${patient.name}</td>
                        <td>${patient.email}</td>
                        <td>${patient.phone}</td>
                        <td>${patient.specialty}</td>
                        </tr>
                      `;

    patientTableBody.insertAdjacentHTML("beforeend", row);
  });
}
