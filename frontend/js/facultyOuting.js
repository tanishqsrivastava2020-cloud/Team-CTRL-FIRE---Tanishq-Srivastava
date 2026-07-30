const API = "http://localhost:5000/api/outings";

let outings = [];

const container = document.getElementById("outingContainer");

async function loadOutings(){

    try{

        const response = await fetch(API);

        outings = await response.json();

        displayOutings(outings);

    }

    catch(error){

        console.error(error);

        container.innerHTML="<h2>Unable to Load Requests</h2>";

    }

}

function displayOutings(data){

    container.innerHTML="";

    const pending = data.filter(
        outing => outing.status==="Pending"
    );

    if(pending.length===0){

        container.innerHTML="<h2>No Pending Requests</h2>";

        return;

    }

    pending.forEach(outing=>{

        container.innerHTML+=`

        <div class="card">

            <h2>${outing.studentName}</h2>

            <p><b>Registration :</b> ${outing.registrationNumber}</p>

            <p><b>Destination :</b> ${outing.destination}</p>

            <p><b>Reason :</b> ${outing.reason}</p>

            <p><b>Out Time :</b> ${outing.outTime}</p>

            <p><b>Return Time :</b> ${outing.returnTime}</p>

            <p><b>Emergency Contact :</b> ${outing.emergencyContact}</p>

            <p class="status">Status : ${outing.status}</p>

            <button
            class="approve"
            onclick="approve('${outing._id}')">

            Approve

            </button>

            <button
            class="reject"
            onclick="reject('${outing._id}')">

            Reject

            </button>

        </div>

        `;

    });

}

async function approve(id){

    const remark=prompt("Faculty Remark");

    if(remark===null) return;

    await fetch(API+"/"+id,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            status:"Approved",

            facultyRemark:remark

        })

    });

    alert("Approved Successfully");

    loadOutings();

}

async function reject(id){

    const remark=prompt("Reason for Rejection");

    if(remark===null) return;

    await fetch(API+"/"+id,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            status:"Rejected",

            facultyRemark:remark

        })

    });

    alert("Rejected Successfully");

    loadOutings();

}

function searchOutings(){

    const value=document.getElementById("search").value.toLowerCase();

    const filtered=outings.filter(

        outing=>

        outing.registrationNumber.toLowerCase().includes(value)

    );

    displayOutings(filtered);

}

loadOutings();