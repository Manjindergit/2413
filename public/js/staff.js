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
  hideAll()
  await loadData(false);
});

document
  .getElementById("loadInactivePatient")
  .addEventListener("click", async () => {
    hideAll()
    loadData(true);
  });

function displayReports(medicineArr, visitArr) {
  document.getElementById("reportSection").style.display = "block";
  const doctorVisitTable = document.getElementById("doctorVisitTableBody");
  doctorVisitTable.textContent = "";

  const patientVisitTable = document.getElementById("patientVisitTableBody");
  patientVisitTable.textContent = "";

  const medicineTable = document.getElementById("medicineTableBody");
  medicineTable.textContent = "";

  const patients = visitArr
  .filter((obj) => obj.ownerType === "patient")
  .map(({ ownerId, totalNumberOfVisits }) => ({ ownerId, totalNumberOfVisits }));


  const doctors = visitArr
  .filter((obj) => obj.ownerType === "doctor")
  .map(({ ownerId, totalNumberOfVisits }) => ({ ownerId, totalNumberOfVisits }));




createTable(doctorVisitTable, doctors);
createTable(patientVisitTable, patients);
createTable(medicineTable, medicineArr);

}

function createTable(table, arr) {
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement('tr');
    for (const prop in arr[i]) {
      const cell = document.createElement('td');
      cell.textContent = arr[i][prop];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function hideAll(){
  document.getElementById("reportForm").style.display = "none";
document.getElementById("reportSection").style.display = "none";
document.getElementById("allPatientTable").style.display = "none";
document.getElementById("createDoc").style.display = "none";

}


function populateTable(patients, showInactiveOnly) {
  hideAll();
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
  hideAll();
  document.getElementById("createDoc").style.display = "block";
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the default form submission
  createDoctor(); // call the "create" function
});

function createDoctor() {
  const doctor = {
    username: document.getElementById("username").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone_number").value,
    accountType: "doctor",
    password: document.getElementById("password").value,
    speciality: document.getElementById("speciality").value,
  };

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
        alert("Doctor Created");
      } else {
        alert("Failed to create Doctor Account");
        console.log("noot created");
      }
    });
}

function showFields() {
  var reportType = document.getElementById("report-type").value;
  if (reportType == "monthly") {
    document.getElementById("month-field").style.display = "block";
    document.getElementById("year-field").style.display = "none";
  } else if (reportType == "annual") {
    document.getElementById("month-field").style.display = "none";
    document.getElementById("year-field").style.display = "block";
  }
}

document.getElementById("createReport").addEventListener("click", () => {
  hideAll();
  document.getElementById("reportForm").style.display = "block";
  document.getElementById("generateReportBtn").style.display = "block";
  document.getElementById("viewReportBtn").style.display = "none";
});

document.getElementById("generateReportBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const reportType = document.getElementById("report-type").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const date = reportType == "monthly" ? month : year;

  const report = {
    reportType: reportType,
    date: date,
  };

  fetch("/api/generateReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("success");
        alert("Report Generated");
      } else if (data.status === "unsuccessful") {
        console.log("error");
        alert("Report Not Generated");
      } else {
        console.log("noot created");
      }
    });

  console.log(report);
});

document.getElementById("viewReport").addEventListener("click", () => {
  //hideAll();
  document.getElementById("reportForm").style.display = "block";
  document.getElementById("generateReportBtn").style.display = "none";
  document.getElementById("viewReportBtn").style.display = "block";
});

document.getElementById("viewReportBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const reportType = document.getElementById("report-type").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const date = reportType == "monthly" ? month : year;

  const report = {
    reportType: reportType,
    date: date,
  };

  fetch("/api/fetchReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        displayReports(data.topPrescribedMedicines, data.totalVisits);
        console.log("success");
      } else {
        console.log("noot created");
      }
    });
});
