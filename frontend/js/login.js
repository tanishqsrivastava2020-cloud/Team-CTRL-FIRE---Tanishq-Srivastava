document.getElementById("loginForm").addEventListener("submit",function(e){

e.preventDefault();

let role=document.getElementById("role").value;

if(role==="student"){

window.location.href="student.html";

}

else if(role==="parent"){

window.location.href="parent.html";

}

else if(role==="faculty"){

window.location.href="faculty.html";

}

else if(role==="hostel"){

window.location.href="hostel.html";

}

else{

alert("Please select a role.");

}

});