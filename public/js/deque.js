var arr = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
var arr1 = []
var cont = document.getElementById('container1');
var cont2 = document.getElementById('container2');

var ul = document.createElement('ul');
ul.setAttribute('style', 'padding: 0; margin: 0;');
ul.setAttribute('id', 'theList');

var ul1 = document.createElement('ul');
for (i = 0; i <= arr.length - 1; i++) {
    var li = document.createElement('li');     // create li element.
    li.innerHTML = arr[i];      // assigning text to li using array value.
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
    if(ev.target.previousElementSibling != null && ev.target.nextElementSibling != null){
        alert('Dequeue operation can be only done at the rear end and front end of the queue')
    }
}

function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    var l = document.getElementById(data);
    ul1.innerHTML += "<li style = 'display: block; ' draggable='true' ondragstart='dragstack(event)'>" + l.innerText + '</li>'
    ul.removeChild(l)
}


function dropStack(){
    ul1.removeChild(ul1.firstChild)
}

function push(){
    var l = ul.firstChild
    ul1.innerHTML += "<li style = 'display: block; ' draggable='true' ondragstart='dragstack(event)'>" + l.innerText + '</li>'
    ul.removeChild(ul.firstChild)
}

function pushFront(){
    var l = ul.firstChild
    ul1.innerHTML = "<li style = 'display: block; ' draggable='true' ondragstart='dragstack(event)'>" + l.innerText + '</li>' + ul1.innerHTML 
    ul.removeChild(ul.firstChild)
}

function dropStackBack(){
    ul1.removeChild(ul1.lastChild)
}