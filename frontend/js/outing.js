const API = "http://localhost:5000/api/outings";

async function submitOuting() {

    const studentName = document.getElementById("studentName").value.trim();
    const registrationNumber = document.getElementById("registrationNumber").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const outTime = document.getElementById("outTime").value;
    const returnTime = document.getElementById("returnTime").value;
    const emergencyContact = document.getElementById("emergencyContact").value.trim();

    if (
        !studentName ||
        !registrationNumber ||
        !destination ||
        !reason ||
        !outTime ||
        !returnTime ||
        !emergencyContact
    ) {

        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText =
            "Please fill all fields.";

        return;
    }

    const outing = {

        studentName,
        registrationNumber,
        destination,
        reason,
        outTime,
        returnTime,
        emergencyContact

    };

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(outing)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Request Failed");

        }

        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText =
            "✅ Outing Request Submitted Successfully";

        document.querySelectorAll("input, textarea").forEach(field => {
            field.value = "";
        });

        console.log(data);

    }

    catch (error) {

        console.error(error);

        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText =
            "❌ Unable to connect to backend.";

    }

}