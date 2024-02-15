function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix', 'matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 10); // Random value between 0 and 9
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    let result;
    switch(operation) {
        case 'add':
            result = addMatrices(matrix1, matrix2);
            break;
        case 'subtract':
            result = subtractMatrices(matrix1, matrix2);
            break;
        case 'multiply':
            result = multiplyMatrices(matrix1, matrix2);
            break;
        default:
            alert('Invalid operation');
            return;
    }
    if (result) {
        showResult2D('The Result', 'matrix3', result);
    }
}

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = document.querySelectorAll(`#${matrixId} tr`);
    rows.forEach(tr => {
        let rowData = [];
        let inputs = tr.querySelectorAll('input');
        inputs.forEach(input => {
            rowData.push(parseFloat(input.value));
        });
        matrixData.push(rowData);
    });
    return matrixData;
};

function addMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        alert('Matrices dimensions do not match');
        return null;
    }
    let result = matrix1.map((row, i) =>
        row.map((val, j) => val + matrix2[i][j])
    );
    return result;
}

const subtractMatrices = function (matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        alert('Matrices dimensions do not match');
        return null;
    }
    let result = matrix1.map((row, i) =>
        row.map((val, j) => val - matrix2[i][j])
    );
    return result;
};

const multiplyMatrices = (matrix1, matrix2) => {
    if (matrix1[0].length !== matrix2.length) {
        alert('Matrices cannot be multiplied');
        return null;
    }
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');
    dataArray.forEach(rowData => {
        let tr = document.createElement('tr');
        rowData.forEach(data => {
            let td = document.createElement('td');
            td.textContent = data;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};
