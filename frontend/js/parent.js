function approveRequest(button){

let row = button.parentElement.parentElement;

row.cells[4].innerHTML =
"<span style='color:#22c55e;font-weight:bold;'>Approved ✅</span>";

document.getElementById("message").innerHTML =
"📧 Hostel Office has been notified. QR Pass can now be generated.";

}

function rejectRequest(button){

let row = button.parentElement.parentElement;

row.cells[4].innerHTML =
"<span style='color:#ef4444;font-weight:bold;'>Rejected ❌</span>";

document.getElementById("message").innerHTML =
"Outing request rejected by Parent.";

}