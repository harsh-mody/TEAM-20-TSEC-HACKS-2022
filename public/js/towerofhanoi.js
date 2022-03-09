var rod1disks = [7, 6, 5, 4, 3, 2, 1]
var colors= ['#eb08cb', '#961fe1', '#471864', '#32172c', '#857793', '#c26aad', '#bc9697']
var rod2disks = []
var rod3disks = []
console.log(rod1disks)
var rod1 = document.getElementById('col1')
var rod2 = document.getElementById('col2')
var rod3 = document.getElementById('col3')
var count = 0

for(var disk in rod1disks){
    var diskelement = document.createElement('div')
    diskelement.setAttribute('style', 'border: thin solid black; height: 30px; color:white; background-color:' + colors[disk])
    diskelement.setAttribute('draggable', 'true')
    diskelement.setAttribute('ondragstart', 'drag(event)')
    diskelement.setAttribute('id', rod1disks[disk])
    diskelement.innerText = rod1disks[disk];
    rod1.appendChild(diskelement)
}


function drag(ev){
    console.log(ev.target)
    if(ev.target.nextElementSibling != null) {
        alert('Only pop from the bottom of the stack');
        return;
    }
    ev.dataTransfer.setData("text", ev.target.innerText);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev){
    var data = ev.dataTransfer.getData("text");
    var l = document.getElementById(data)
    var rod = ev.target
    rod.appendChild(l)
    count ++
}

function Check(){
    var element = document.getElementById('col2');
    var children = element.children;
    var index = 7;
    var i = 0;
    for(var i=0; i<children.length; i++){
        var child = children[i];
        if(child.innerText != index){
            i = 1
        }
        index -= 1;
    }
    var element = document.getElementById('col3');
    var children = element.children;
    var index = 7;
    for(var i=0; i<children.length; i++){
        var child = children[i];
        if(child.innerText != index){
            i = 1
        }
        index -= 1
    }
    if (i == 0){
        alert('You win!! with '+ count+' turns')
    } else{
        alert('Try again!! :(')
    }
}