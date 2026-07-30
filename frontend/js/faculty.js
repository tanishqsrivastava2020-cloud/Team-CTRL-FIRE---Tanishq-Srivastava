function approveRequest(button){

let row = button.parentElement.parentElement;

row.cells[4].innerHTML =
"<span style='color:#22c55e;font-weight:bold;'>Approved ✅</span>";

document.getElementById("message").innerHTML =
"📧 Parent has been notified for approval.";

}

function rejectRequest(button){

let row = button.parentElement.parentElement;

row.cells[4].innerHTML =
"<span style='color:#ef4444;font-weight:bold;'>Rejected ❌</span>";

document.getElementById("message").innerHTML =
"Request Rejected.";

}