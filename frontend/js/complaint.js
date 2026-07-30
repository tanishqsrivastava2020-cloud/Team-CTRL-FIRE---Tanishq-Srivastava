const title = document.getElementById("title");
const description = document.getElementById("description");

const department = document.getElementById("department");
const priority = document.getElementById("priority");
const reason = document.getElementById("reason");
const status = document.getElementById("status");

async function analyzeComplaint() {

    const complaint = {

        studentName: document.getElementById("studentName").value,

        registrationNumber: document.getElementById("registrationNumber").value,

        title: title.value,

        description: description.value

    };

    try {

        const response = await fetch("http://localhost:5000/api/complaints", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(complaint)

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        document.getElementById("result").style.display = "block";

        department.textContent = data.department;
        priority.textContent = data.priority;
        reason.textContent = data.reason;
        status.textContent = data.status;

        if(data.priority.toLowerCase()=="high")
            priority.className="high";

        else if(data.priority.toLowerCase()=="medium")
            priority.className="medium";

        else
            priority.className="low";

    }

    catch(err){

        console.error(err);

        alert("Unable to connect to backend.");

    }

}

function submitComplaint(){

    alert("Complaint Submitted Successfully!");

}