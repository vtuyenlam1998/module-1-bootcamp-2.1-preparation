function Add(){
    let number1=document.getElementById("number1").value;
    let number2=document.getElementById("number2").value;
    let result= parseInt(number1) + parseInt(number2);
    document.getElementById("result").innerHTML = result;
}
function Sub(){
    let number1=document.getElementById("number1").value;
    let number2=document.getElementById("number2").value;
    let result= parseInt(number1) - parseInt(number2);
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