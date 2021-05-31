function getHistory(){
   return document.getElementById('history-value').innerText;
}

function printHistory(num){
    document.getElementById('history-value').innerText=num;
}
 


function getOutput(){
    return document.getElementById('output-value').innerText;
}

function PrintOutput(num){
 
    if(num==""){
        document.getElementById('output-value').innerText=num;
    }
    else{
        document.getElementById("output-value").innerText=geFormattedNumber(num);
    }
    }
      
    

function geFormattedNumber(num){
    if(num=='-'){
          return '';
    }
    var n=Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseformtedNumber(num){
    return Number(num.replace(/,/g,''));

}

var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener("click",function(){
      if(this.id=='clear'){
          PrintOutput('')
          printHistory('')
      }

      else if(this.id=='backspace'){
          var output= reverseformtedNumber(getOutput()).toString();
          if(output) {  //if output has a value
            output=output.substr(0,output.length-1);
            PrintOutput(output);

          }         
      }
      else{
          var output= getOutput();
          var history=getHistory();
          if(output!=""){
              output=reverseformtedNumber(output)
              history=history+output;
              if(this.id=='='){
                  var result=eval(history);
                  PrintOutput(result);
                  printHistory('');
              }
              else{
                  history=history+this.id;
                  printHistory(history);
                  PrintOutput('');
              }
          }
      }
    })
}

var number = document.getElementsByClassName(" number");
for(var i=0;i< number.length;i++){
    number[i].addEventListener("click",function(){
        var output=reverseformtedNumber(getOutput());

        if(output!=NaN){  //if output is a number
            output=output+this.id;
            PrintOutput(output);
        }
    })
}


var microphone= document.getElementById('microphone');

microphone.onclick=function(){
    microphone.classList.add("record");
    var recognition= new(window.SpeechRecognition || 
        window.webkitSpeechRecognition || window.nozSpeechRecognition 
        || window.nsSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();
        operations = {
            "plus":"+",
            "add":"+",
            "minus":"-",
            "substract":"-",
            "multiply":"*",
        "divide":"/",
        "divided":"/",
        "remainder":"%",
        "rem":"%",
        
        }

       recognition.onresult = function(event){
           var input = event.results[0][0].transcript;
           for(property in operations){
               input=input.replace(property,operations[property]);
           }
           document.getElementById("output-value").innerText=input;
           setTimeout(function(){
               evaluate(input);
           },2000);
          microphone.classList.remove( "record");
        }
    }
    function evaluate(input) {

        try{
          var result = eval(input);
          document.getElementById("output-value").innerText = result;
        }

        catch{

            console.log(e);
            document.getElementById("output-vaue").innerText=''
        }
    }

     // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at position 0.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object