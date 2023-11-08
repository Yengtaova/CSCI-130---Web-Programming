let originalMatrixA = [];
        let originalMatrixB = [];

        function generateMatrices() {
            const n1 = parseInt(document.getElementById('n1').value);
            const m1 = parseInt(document.getElementById('m1').value);
            const n2 = parseInt(document.getElementById('n2').value);
            const m2 = parseInt(document.getElementById('m2').value);

            originalMatrixA = createMatrixTable(n1, m1, 'A', originalMatrixA);
            originalMatrixB = createMatrixTable(n2, m2, 'B', originalMatrixB);

            document.getElementById('matrixA').innerHTML = originalMatrixA;
            document.getElementById('matrixB').innerHTML = originalMatrixB;

            // Add the "Calculate Trace" and "Transpose" buttons when matrices are generated
            addButtons('A', n1, m1);
            addButtons('B', n2, m2);
        }

        function createMatrixTable(rows, cols, matrixName, matrix) {
            let table = `<table>`;
            for (let i = 0; i < rows; i++) {
                table += "<tr>";
                matrix[i] = [];
                for (let j = 0; j < cols; j++) {
                    matrix[i][j] = 0;
                    table += `<td><input type="number" id="${matrixName}${i}${j}" placeholder="${matrixName}[${i}][${j}]"></td>`;
                }
                table += "</tr>";
            }
            table += `</table><br>`;
            return `<div><b>Matrix ${matrixName}:</b>${table}</div>`;
        }

        function addButtons(matrixName, rows, cols) {
            // Add a button to calculate the trace
            const traceButton = document.createElement('button');
            traceButton.textContent = 'Calculate Trace';
            traceButton.onclick = function () {
                calculateTrace(matrixName, rows, cols);
            };

            // Add a button to transpose the matrix
            const transposeButton = document.createElement('button');
            transposeButton.textContent = 'Transpose';
            transposeButton.onclick = function () {
                transposeMatrix(matrixName, rows, cols);
            };

            // Create a div to hold the buttons and results
            const matrixDiv = document.getElementById(`matrix${matrixName}`);
            matrixDiv.appendChild(traceButton);
            matrixDiv.appendChild(transposeButton);

            // Add a div to display trace results
            const traceResultDiv = document.createElement('div');
            traceResultDiv.id = `traceResult${matrixName}`;
            matrixDiv.appendChild(traceResultDiv);

            // Add a div to display transposed matrix
            const transposeResultDiv = document.createElement('div');
            transposeResultDiv.id = `transposeResult${matrixName}`;
            matrixDiv.appendChild(transposeResultDiv);
        }

        function performOperation() {
            const operation = document.getElementById('operation').value;
            const n1 = parseInt(document.getElementById('n1').value);
            const m1 = parseInt(document.getElementById('m1').value);
            const n2 = parseInt(document.getElementById('n2').value);
            const m2 = parseInt(document.getElementById('m2').value);

            const resultMatrix = performMatrixOperation(n1, m1, n2, m2, operation);

            if (resultMatrix !== null) {
                displayResultMatrix(resultMatrix);
            }
        }

        function performMatrixOperation(n1, m1, n2, m2, operation) {
            if ((operation === '+' || operation === '-') && n1 === n2 && m1 === m2) {
                const resultMatrix = [];
                for (let i = 0; i < n1; i++) {
                    resultMatrix[i] = [];
                    for (let j = 0; j < m1; j++) {
                        const valueA = parseInt(document.getElementById(`A${i}${j}`).value) || 0;
                        const valueB = parseInt(document.getElementById(`B${i}${j}`).value) || 0;

                        if (operation === '+') {
                            resultMatrix[i][j] = valueA + valueB;
                        } else if (operation === '-') {
                            resultMatrix[i][j] = valueA - valueB;
                        }
                    }
                }
                return resultMatrix;
            } else if (operation === '*' && m1 === n2) {
                const resultMatrix = [];
                for (let i = 0; i < n1; i++) {
                    resultMatrix[i] = [];
                    for (let j = 0; j < m2; j++) {
                        let sum = 0;
                        for (let k = 0; k < m1; k++) {
                            const valueA = parseInt(document.getElementById(`A${i}${k}`).value) || 0;
                            const valueB = parseInt(document.getElementById(`B${k}${j}`).value) || 0;
                            sum += valueA * valueB;
                        }
                        resultMatrix[i][j] = sum;
                    }
                }
                return resultMatrix;
            } else {
                alert("Matrix sizes are not compatible for the selected operation.");
                return null;
            }
        }

        function displayResultMatrix(matrix) {
            const resultDiv = document.getElementById('resultC');
            resultDiv.innerHTML = "<b>Result Matrix C:</b><br>";

            const n = matrix.length;
            const m = matrix[0].length;

            // Create the result matrix table
            let table = '<table>';
            for (let i = 0; i < n; i++) {
                table += '<tr>';
                for (let j = 0; j < m; j++) {
                    const value = matrix[i][j];
                    table += `<td><input type="number" id="C${i}${j}" value="${value}" readonly></td>`;
                }
                table += '</tr>';
            }
            table += '</table>';

            resultDiv.innerHTML += table;
        }

        function transposeMatrix(matrixName, n, m) {
            const transposedMatrix = [];
            for (let i = 0; i < m; i++) {
                transposedMatrix[i] = [];
                for (let j = 0; j < n; j++) {
                    const value = parseInt(document.getElementById(`${matrixName}${j}${i}`).value) || 0;
                    transposedMatrix[i][j] = value;
                }
            }
            displayTransposedMatrix(matrixName, m, n, transposedMatrix);
        }

        function displayTransposedMatrix(matrixName, n, m, matrix) {
            const transposeResultDiv = document.getElementById(`transposeResult${matrixName}`);
            transposeResultDiv.innerHTML = `<b>Transposed Matrix ${matrixName}:</b><br>`;

            // Create the transposed matrix table
            let table = '<table>';
            for (let i = 0; i < n; i++) {
                table += '<tr>';
                for (let j = 0; j < m; j++) {
                    const value = matrix[i][j];
                    table += `<td><input type="number" id="Trans${matrixName}${i}${j}" value="${value}" readonly></td>`;
                }
                table += '</tr>';
            }
            table += '</table>';

            transposeResultDiv.innerHTML += table;
        }

        function calculateTrace(matrixName, n, m) {
            if (n === m) {
                const trace = calculateMatrixTrace(matrixName, n, m);
                displayTraceResult(matrixName, trace);
            } else {
                alert("Matrix must be square to calculate the trace.");
            }
        }

        function calculateMatrixTrace(matrixName, n, m) {
            let trace = 0;
            for (let i = 0; i < Math.min(n, m); i++) {
                const value = parseInt(document.getElementById(`${matrixName}${i}${i}`).value) || 0;
                trace += value;
            }
            return trace;
        }

        function displayTraceResult(matrixName, trace) {
            const traceResultDiv = document.getElementById(`traceResult${matrixName}`);
            traceResultDiv.innerHTML = `<b>Trace of Matrix ${matrixName}:</b> ${trace}`;
        }