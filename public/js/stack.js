var img = 'images/book1';
var arr = [1, 2, 3]
var arr1 = []
var cont = document.getElementById('container1');
var cont2 = document.getElementById('container2');

var ul = document.createElement('ul');
ul.setAttribute('style', 'padding: 0; margin: 0;');
ul.setAttribute('id', 'theList');

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var ul1 = document.createElement('ul');
for (i = 0; i <= arr.length - 1; i++) {
    var li = document.createElement('li');     // create li element.
    li.innerHTML = `<div class="st_book" style="display:inline"><img src="images/book${i+1}.png"></div>`;      // assigning text to li using array value.
    li.setAttribute('style', 'display: inline; margin: 10px');    // remove the bullets.
    li.setAttribute('draggable', 'true');
    li.setAttribute('ondragstart', 'drag(event)')
    li.setAttribute('id', arr[i]);
    ul.appendChild(li);     // append li to ul.
}

for (i = 0; i <= arr1.length - 1; i++) {
    var li = document.createElement('li');     // create li element.
    li.innerHTML = arr1[i];      // assigning text to li using array value.
    li.setAttribute('style', 'display: inline; margin: 10px');    // remove the bullets.
    li.setAttribute('draggable', 'true');
    li.setAttribute('ondragstart', 'dragstack(event)')
    ul1.appendChild(li);     // append li to ul.
}
cont.appendChild(ul); 
cont2.appendChild(ul1); 
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragstack(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    if(ev.target.previousElementSibling != null){
        alert('Pop operation can be only done at the top of the stack')
    }
}

function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    console.log(data)

    ul1.innerHTML = `<div class="st_book" style = 'display: block; ' draggable='true' ondragstart='dragstack(event)'><img src=${data}></div>` + ul1.innerHTML;
}

function dropStack(ev){
    ul1.removeChild(ul1.firstChild)
    document.getElementById('classname').innerText = document.getElementById('pop').innerText
    const timeout = document.getElementById('classname')
    timeout.style.display = 'block'
    setTimeout(hideElement, 3000) //milliseconds until timeout//
    function hideElement() {
        console.log(timeout)
        timeout.style.display = 'none'
    }
}

function push(){
    var l = ul.firstChild
    ul1.innerHTML = `<div class="st_book" style = 'display: block; ' draggable='true' ondragstart='dragstack(event)'><img src=${l.firstChild.firstChild.src}></div>` + ul1.innerHTML;
    document.getElementById('classname').innerText = document.getElementById('push').innerText
    const timeout = document.getElementById('classname')
    timeout.style.display = 'block'
    setTimeout(hideElement, 5000) //milliseconds until timeout//
    function hideElement() {
        console.log(timeout)
        timeout.style.display = 'none'
    }
}
