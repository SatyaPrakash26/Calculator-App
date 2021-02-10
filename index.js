// toggle between dark and light mode 
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

// check if dark mode is enabled,
// if it is enabled,turn it off
// if it is disables,turn it off

const enableDarkMode = () => {
    // add the darkMode class to the body
    document.body.classList.add('darkmode');
    //update darkmode in the localStorage
    localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
    // remove the darkMode class from the body
    document.body.classList.remove('darkmode');
    //update darkmode in the localStorage
    localStorage.setItem("darkMode", null);
};

if(darkMode === 'enabled'){
    enableDarkMode();
};

darkModeToggle.addEventListener('click',()=>{

    darkMode = localStorage.getItem('darkMode');
    if(darkMode!== 'enabled'){
        enableDarkMode();
    }else{
        disableDarkMode(); 
    }
    
});

// for members only
function subscription() {
    alert("Subscribe to access all functions")
}

// logic part of the calculator

//1) upper value or we can say the first value

function getHistory(){
    return document.getElementById('history-value').innerText;
};

function printHistory(num){
    document.getElementById('history-value').innerText = num;
};

//2) lower value or we can say the next value to be inputted

function getOutput(){
    return document.getElementById('output-value').innerText;
};

function printOutput(num){

    if(num ==""){
        document.getElementById('output-value').innerText=num;
    }else{
        document.getElementById('output-value').innerText = getFormattedNumber(num);
    }   
};

function getFormattedNumber(num){
    if(num == "-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString('en');
    return value;
}

function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName('operator');
for(var i =0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory('');
            printOutput('');
        }
        if(this.id=="backspace"){
            var output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }else{
            var output = getOutput();
            var history = getHistory();
            if(output==""&&history!=""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1)
                }
            }
            if(output!="" || history !=""){
                output=output==""?output:reverseNumberFormat(output);
                history = history+output;
                if(this.id =="="){
                    var result = eval(history);
                    printOutput(result);
                    printHistory('');
                }
                else{
                    history = history+this.id;
                    printHistory(history);
                    printOutput('');
                }
            }
            
        }
        
    })
}

var number = document.getElementsByClassName('number');
for(var i =0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output = reverseNumberFormat(getOutput());
        if(output != NaN){
            output = output +this.id;
            printOutput(output);
        }
    })
}

