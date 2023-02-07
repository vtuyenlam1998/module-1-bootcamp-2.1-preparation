let number1;
let number2;
function convert(){
   number1 = parseInt(document.getElementById("number1").value);
   number2 = parseInt(document.getElementById("number2").value);
   console.log(typeof document.getElementById("number1").value);
}
function Add(){
    convert();
    // let number1=document.getElementById("number1").value;
    // let number2=document.getElementById("number2").value;
    let result= number1 + number2;
    document.getElementById("result").innerHTML = result;
}
function Sub(){
    convert()
    // let number1=document.getElementById("number1").value;
    // let number2=document.getElementById("number2").value;
    let result= number1 - number2;
    document.getElementById("result").innerHTML = result;
}
function Mul(){
    let number1=document.getElementById("number1").value;
    let number2=document.getElementById("number2").value;
    let result =parseInt(number1) * parseInt(number2);
    document.getElementById("result").innerHTML = result;
}
function Div(){
    let number1=document.getElementById("number1").value;
    let number2=document.getElementById("number2").value;
    let result= parseInt(number1) / parseInt(number2);
    document.getElementById("result").innerHTML = result;
}