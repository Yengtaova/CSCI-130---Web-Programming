function isPrime(num){
    if(num <= 1) return false;
    else if(num <= 3) return true;
    if(num % 2 === 0 || num % 3 === 0) return false;
    for(let i = 5; i * i <= num; i += 6){
        if(num % i === 0 || num % (i+2) === 0) return false;
    }
    return true;
}

function generatePrimeTable(){
    const n = parseInt(document.getElementById('prime').value);
    const primeTableBody = document.getElementById('primeTableBody');
    primeTableBody.innerHTML = '';

    let count = 0;
    let num = 2;
    while(count < n){
        if(isPrime(num)){
            const row = primeTableBody.insertRow();
            const indexCell = row.insertCell(0);
            const valueCell = row.insertCell(1);
            indexCell.textContent = count + 1;
            valueCell.textContent = num;
            count++;
        }
        num++;
    }
}

let word = "afdfsfr";
let output = word.length;
alert(output);