
// Add an event listener to the "Convert" button
console.log('hello');

document.getElementById('convert-btn').addEventListener('click', () => {
    const codeOutput = document.getElementById('code-output');
    const convertCodeButton = document.getElementById('convert-btn');
   
    convertCodeButton.addEventListener('click',async()=>{
        console.log("button cliked");
        const sourceLang = document.getElementById('source-lang').value;
        const targetLang = document.getElementById('target-lang').value;
        const codeInput = document.getElementById('code-input').value;
       
        if (!codeInput) {
            alert("Please enter some code to convert.");
        }
       try {
        console.log("connecting to server");
        
        const response = await fetch("http://localhost:3000/convert/" , 
            {
            // mode : "no-cors",
            method : "post",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({code: codeInput , fromLang: sourceLang ,toLang : targetLang}  ),
        }
    );

        const data = await response.json();
        if(data.convertedCode){
            codeOutput.value=data.convertedCode;
            console.log("converted the code succesfully");
            
        }else{
            alert("error in converting");
        }
       } 
       catch (error) {
       
        alert("failed to convert to server");
        
       }

    });

});