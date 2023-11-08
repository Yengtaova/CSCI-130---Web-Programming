let currentSequence = '';
let currentResult = null;

    function appendToSequence(value){
    debugger;
    if(currentResult !== null && value == '.'){
        currentSequence = '0.';
        document.getElementById('sequence').value = currentSequence;
        currentResult = null;
        document.getElementById('currentValue').value = currentResult;
    }
    else if(currentResult !== null){
        if(!isNaN(value)){
            currentSequence = value;
            currentResult = null;
            document.getElementById('currentValue').value = currentResult;
            document.getElementById('sequence').value = currentSequence;
        }
        else{
            currentSequence = currentResult;
            currentSequence += value;
            document.getElementById('sequence').value = currentSequence;
            currentResult = null;
            document.getElementById('currentValue').value = currentResult;
        }
    }
    else{
        currentSequence += value;
        document.getElementById('sequence').value = currentSequence;
    }
    /*if(value !== '+' && value !== '-' && value !== '*' && value !== '/'){
        document.getElementById('currentValue').value += value;
    }*/
}

    function calculateSquareRoot(){
        if(currentResult !== null){
            currentSequence = '';
            document.getElementById('sequence').value = currentSequence;
            currentResult = Math.sqrt(parseFloat(currentResult));
            document.getElementById('currentValue').value = currentResult;
        }
        else if(currentSequence !== null){
            currentResult = currentSequence;
            currentSequence = '';
            document.getElementById('sequence').value = currentSequence;
            currentResult = Math.sqrt(parseFloat(currentResult));
            document.getElementById('currentValue').value = currentResult; 
        }
    }

    function toggleSign(){
        //const currentValue = parseFloat(document.getElementById('currentValue').value);
        /*if(!isNaN(currentValue)){
            document.getElementById('currentValue').value = -currentValue;
            currentSequence = currentSequence.replace(currentValue, -currentValue);
            document.getElementById('sequence').value = currentSequence;
        }*/
        const temp  = parseFloat(document.getElementById('sequence').value);
        if(currentResult !== null){
            currentSequence = -currentResult;
            document.getElementById('sequence').value = currentSequence;
            currentResult = null;
            document.getElementById('currentValue').value = currentResult;
        }
        else{
        //const currentValue = parseFloat(document.getElementById('sequence').value);
        if(!isNaN(temp)){
            currentSequence = currentSequence.replace(temp, -temp);
            document.getElementById('sequence').value = currentSequence;
        }
    }
    }

    function clearCurrentValue(){
        currentSequence = '';
        currentResult = '';
        document.getElementById('currentValue').value = currentResult;
        document.getElementById('sequence').value = currentSequence;
        /*currentSequence = currentSequence.slice(0, -document.getElementById('currentValue').value.length);
        document.getElementById('sequence').value = currentSequence;
        document.getElementById('currentValue').value = '';*/
    }

    function calculate(){
        try{
            currentResult = eval(currentSequence);
            document.getElementById('currentValue').value = currentResult;
            /*currentSequence = currentResult.toString();
            document.getElementById('sequence').value = currentSequence;*/
        }catch (error){
            document.getElementById('currentValue').value = 'Error';
        }
    }