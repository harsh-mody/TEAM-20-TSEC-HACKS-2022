
function validate(){  
    var name=document.f2.username.value;  
    // alert(name);
    var password=document.f2.password.value;  
    var status=false;  
    var unique = true;
    var firstpassword=document.f2.password.value;  
    var secondpassword=document.f2.Confpassword.value;  
    
    if(!unique){  
        document.getElementById("nameloc").innerHTML=  "Please enter your name";  
        
        // alert("false");
        status=false;  
    }
    else{  
        document.getElementById("nameloc").innerHTML=" ";  
        status=true;  
    }  
    if(password.length<8){  
        document.getElementById("passwordloc").innerHTML=  
        " Password must be at least 8 char long";  
        status=false;  
    }
    else{  
        document.getElementById("passwordloc").innerHTML=" Strong Password";  
    }  

   
    if(firstpassword==secondpassword){  
        status=true;  
    }  
    else{  
        document.getElementById("passerror").innerHTML = "password didnt match!";  
        status=false;  
    }  
    var x=document.f2.email.value;  
        var atposition=x.indexOf("@");  
        var dotposition=x.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
           document.getElementById("emailerror").innerHTML = "Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition;  
            return false;  
        }  
    return status;  
}  