let patients = [];
console.log("doctor.js", docId);
document.getElementById("patientSearch").addEventListener("click", () => {
  fetch("/api/fetchPatient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: document.getElementById("health_card_number").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        patients = data.patient;
        if (patients.length > 0) {
          document.getElementById("patientSearcher").style.display = "none";
          document.getElementById("form").style.display = "block";

          document.getElementById("patient_name").value = patients[0].name;
        } else {
          console.log("No patients found");
        }
      } else {
        console.log(data);
      }
    });
});

document.getElementById("visitForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // const refillable = req.body.refillable === '1' ? 1 : 0;

  visit = {
    patient_id: patients[0].id,
    doctor_id: docId,
    date: document.getElementById("visit_date").value,
    description: document.getElementById("notes").value,
    exam: document.getElementById("exam").value,
    medicine_name: document.getElementById("medicine_name").value,
    quantity: document.getElementById("quantity").value,
    dosage: document.getElementById("dosage").value,
    refillable: document.getElementById("refillable").checked ? 1 : 0,
  };

  console.log(visit);

  fetch("/api/visit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(visit),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(data);
        // alert("Visit added");
      } else {
        console.log(data);
      }
    });
});
