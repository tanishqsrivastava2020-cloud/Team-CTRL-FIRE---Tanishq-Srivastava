function generateVisitorPass(){

let visitor=document.getElementById("visitorName").value;
let student=document.getElementById("studentName").value;
let relation=document.getElementById("relation").value;
let date=document.getElementById("date").value;
let time=document.getElementById("time").value;

let qrData=`Visitor:${visitor}
Student:${student}
Relation:${relation}
Date:${date}
Time:${time}`;

document.getElementById("qrImage").src=
"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="+encodeURIComponent(qrData);

document.getElementById("vName").innerHTML=visitor;
document.getElementById("sName").innerHTML=student;
document.getElementById("vRelation").innerHTML=relation;
document.getElementById("vDate").innerHTML=date;
document.getElementById("vTime").innerHTML=time;

document.getElementById("visitorCard").style.display="block";

}