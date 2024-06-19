


const divs = "erFNM,erLNM,erEML,erPSW,erCNF".split(","); 
const errs = [
    "<span id ='mark'>: Πρέπει να είναι από δύο χαρακτήρες έως 20</span>",
    "<span id ='mark'>: Πρέπει να είναι από δύο χαρακτήρες έως 20</span>",
    "<span id ='mark'>: Η διεύθυνση ηλ.ταχυδρομείου δεν είναι αποδεκτή</span>",
    "<span id ='mark'>: Ο κωδικός πρέπει να είναι από 8 χαρακτήρες ως 15 και να έχει τουλάχιστον έναν αριθμό και ειδικό χαρακτήρα </span>",
    "<span id ='mark'>: Οι κωδικοί που δηλώσατε δεν ειναι ίδιοι ή δεν πληροί τις προϋποθέσεις</span>"
    ];

const tp = document.getElementById("togglePassword");
const password = document.getElementById("password");



tp.addEventListener("click", function () {
            // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

            // toggle the icon
    this.classList.toggle("bi-eye");
});



function checkName(str){
    return (str === "" || (str.length < 2 || str.length > 20 ));
} 



function checkEmail(str){
    let atpos = str.indexOf("@");  // -1 if not found
    let dotpos = str.lastIndexOf(".");  // -1 if not found
    return (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= str.length);
}



function checkPass(str){
    let rule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return !str.match(rule);
}


function checkConf(str1, str2){
    let rule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return !str1.match(rule) || str1 != str2;
}

function check(i) {

    const inputs = [], errors = [];
    const ids = ['first', 'last', 'email', 'password', 'confirm'];
    const errorMsgs =['Όνομα χρήστη', 'Επώνυμο χρήστη', 'Email', 'Κωδικός πρόσβασης', 'Επαλήθευση κωδικού'];
    let msg = "OK!";

    for(let i = 0; i < 5; i++){
        inputs.push(document.getElementById(ids[i]).value);
        errors.push(`<span style='color:red'>${errorMsgs[i]}</span>`)
    }



    switch(i){
    case 0:
    case 1:
        msg = (checkName(inputs[i]))? errors[i] + errs[i]: msg; break;
    case 2:
        msg = (checkEmail(inputs[i]))? errors[i] + errs[i]: msg; break;
    case 3: 
        msg = (checkPass(inputs[i]))? errors[i] + errs[i]: msg; break;
    case 4:
        msg = (checkConf(inputs[i - 1], inputs[i]))? errors[i] + errs[i]: msg; break;
    }
    
    document.getElementById(divs[i]).innerHTML = msg;
    
}



function finalcheck() {
    var count = 0;
    for (i = 0; i < 5; i++) {
        var div = divs[i];
        if (document.getElementById(div).innerHTML == "OK!")
            count = count + 1;
    }
    try{
        if (count == 5){
            document.getElementById("erFIN").innerHTML = "Τα δηλωθέντα στοιχεία είναι αποδεκτά ";
            document.body.style.background = 'white';
        } else{
            document.body.style.background = 'lightblue';
            throw "<span style = 'color: red' >Τα δηλωθέντα στοιχεία δεν είναι αποδεκτά. Παρακαλώ συμπληρώστε σωστά όλα τα πεδία！ </span>";
        }  
    }
    catch (error){
        document.getElementById("erFIN").innerHTML = error;
    }
    
}
