let view = document.getElementById("view");
function inputValue(value) {
    view.value += value;
}
function result() {
    let result = eval(view.value);
    view.value = result;
}
function reset() {
    view.value="";
}