document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentGPA = document.getElementById('studentGPA').value;
    const studentClasses = document.getElementById('studentClasses').value;

    addStudentToTable(studentName, studentGPA, studentClasses);

    document.getElementById('studentName').value = '';
    document.getElementById('studentGPA').value = '';
    document.getElementById('studentClasses').value = '';
});

function addStudentToTable(name, gpa, classes) {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cellName = newRow.insertCell(0);
    const cellGPA = newRow.insertCell(1);
    const cellClasses = newRow.insertCell(2);
    const cellActions = newRow.insertCell(3);

    cellName.textContent = name;
    cellGPA.textContent = gpa;
    cellClasses.textContent = classes;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        editStudent(newRow);
    });

    cellActions.appendChild(editButton);

    updateRatings();
}

function editStudent(row) {
    const nameCell = row.cells[0];
    const gpaCell = row.cells[1];
    const classesCell = row.cells[2];
    const actionsCell = row.cells[3];

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = nameCell.textContent;

    const gpaInput = document.createElement('input');
    gpaInput.type = 'number';
    gpaInput.value = gpaCell.textContent;
    gpaInput.step = '0.1';
    gpaInput.min = '0';
    gpaInput.max = '4.0';

    const classesInput = document.createElement('input');
    classesInput.type = 'number';
    classesInput.value = classesCell.textContent;
    classesInput.min = '1';

    nameCell.textContent = '';
    gpaCell.textContent = '';
    classesCell.textContent = '';
    nameCell.appendChild(nameInput);
    gpaCell.appendChild(gpaInput);
    classesCell.appendChild(classesInput);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function() {
        saveStudent(row, nameInput.value, gpaInput.value, classesInput.value);
    });

    actionsCell.textContent = '';
    actionsCell.appendChild(saveButton);
}

function saveStudent(row, name, gpa, classes) {
    const nameCell = row.cells[0];
    const gpaCell = row.cells[1];
    const classesCell = row.cells[2];
    const actionsCell = row.cells[3];

    nameCell.textContent = name;
    gpaCell.textContent = gpa;
    classesCell.textContent = classes;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        editStudent(row);
    });

    actionsCell.textContent = '';
    actionsCell.appendChild(editButton);

    updateRatings();
}

function updateRatings() {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const rows = table.rows;
    const ratingsList = document.getElementById('studentRatings');
    ratingsList.innerHTML = '';

    for (let i = 0; i < rows.length; i++) {
        const name = rows[i].cells[0].textContent;
        const gpa = parseFloat(rows[i].cells[1].textContent);
        const classes = parseInt(rows[i].cells[2].textContent);
        const rating = Math.round((4 - gpa) * classes);

        const listItem = document.createElement('li');
        listItem.textContent = `${name}: ${rating.toFixed(2)}`;
        ratingsList.appendChild(listItem);
    }
}

document.getElementById('selectRandomStudent').addEventListener('click', function() {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const rows = table.rows;
    const studentPool = [];

    for (let i = 0; i < rows.length; i++) {
        const name = rows[i].cells[0].textContent;
        const gpa = parseFloat(rows[i].cells[1].textContent);
        const classes = parseInt(rows[i].cells[2].textContent);
        const rating = Math.round((4 - gpa) * classes);

        // Add the student's name to the pool based on their rating
        for (let j = 0; j < rating; j++) {
            studentPool.push(name);
        }
    }

    const randomIndex = Math.floor(Math.random() * studentPool.length);
    const selectedStudent = studentPool[randomIndex] || 'No students in pool';

    document.getElementById('selectedStudent').textContent = `Selected Student: ${selectedStudent}`;
});