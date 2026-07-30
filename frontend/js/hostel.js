function assignComplaint(button){

button.innerHTML="Assigned ✅";

button.style.background="#22c55e";

document.getElementById("message").innerHTML=
"🤖 AI Complaint assigned to the concerned department.";

}

function generatePass(button){

button.innerHTML="Generated ✅";

button.style.background="#22c55e";

document.getElementById("message").innerHTML=
"📧 QR Pass generated and sent to the student.";

document.getElementById("qrCard").style.display="block";

}