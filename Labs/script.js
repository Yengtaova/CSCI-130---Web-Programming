function createMatrices() {
    const n1 = parseInt(document.getElementById('n1').value);
    const m1 = parseInt(document.getElementById('m1').value);
    const n2 = parseInt(document.getElementById('n2').value);
    const m2 = parseInt(document.getElementById('m2').value);

    if (isNaN(n1) || isNaN(m1) || isNaN(n2) || isNaN(m2)) {
        alert("Please enter valid matrix sizes.");
        return;
    }

    const matrixA = document.getElementById('matrixA');
    const matrixB = document.getElementById('matrixB');

    matrixA.innerHTML = '';
    matrixB.innerHTML = '';

    for (let i = 0; i < n1; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < m1; j++) {
            const cell = document.createElement('td');
            cell.contentEditable = true;
            row.appendChild(cell);
        }
        matrixA.appendChild(row);
    }

    for (let i = 0; i < n2; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < m2; j++) {
            const cell = document.createElement('td');
            cell.contentEditable = true;
            row.appendChild(cell);
        }
        matrixB.appendChild(row);
    }
}
function createTranspose(matrixId) {
    const matrix = document.getElementById(matrixId);
    const matrixData = getMatrixData(matrixId);

    if (matrixData) {
        const transposedMatrixData = transposeMatrix(matrixData);
        displayMatrix(transposedMatrixData, `resultMatrix`);
    }
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposedMatrix = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }

    return transposedMatrix;
}

function displayResultMatrix(matrixData) {
    const resultMatrix = document.getElementById('resultMatrix');
    resultMatrix.innerHTML = '';

    for (let i = 0; i < matrixData.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrixData[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = matrixData[i][j];
            row.appendChild(cell);
        }
        resultMatrix.appendChild(row);
    }
}

function createTranspose(matrixId) {
    const matrixData = getMatrixData(matrixId);

    if (matrixData) {
        const transposedMatrixData = transposeMatrix(matrixData);
        displayResultMatrix(transposedMatrixData);
    }
}