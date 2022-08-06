let grades = document.querySelectorAll('.grade');
let units = document.querySelectorAll('.unit');
let subjects = document.querySelectorAll('.subject');
const errMessage = document.getElementById('errMessage');
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const gwa = document.getElementById('gwa');
const subjectNumber = document.getElementById('subject_no');
const subjectButton = document.getElementById('subject_button');
const subjectErr = document.getElementById('subject_err');
const gradesRow = document.getElementById('grades_row');
const addRow = document.getElementById('add_row');
const output = document.getElementById('output');
const totalUnits = document.getElementById('totalUnits');
const tbody = document.getElementById('tbody');


// Adding row, multiple or single row
const addRowElement = (count) => {
    for(let i = 0; i < count; i++){
        const div = document.createElement('div');
        div.className="row";

        const subjectInput = document.createElement('input');
        subjectInput.className = 'subject';
        subjectInput.setAttribute('type', 'text');
        subjectInput.setAttribute('placeholder', 'Subject Code');

        const gradeInput = document.createElement('input');
        gradeInput.classList.add('grade');
        gradeInput.name="grade[]"
        gradeInput.setAttribute('type', 'number');
        gradeInput.setAttribute('placeholder', 'Enter Grade');
        gradeInput.setAttribute('min', '0');
        gradeInput.setAttribute('step', 'any');

        const unitInput = document.createElement('input');
        unitInput.classList.add('unit');
        unitInput.name="unit[]"
        unitInput.setAttribute('type', 'number');
        unitInput.setAttribute('placeholder', 'Enter Unit');
        unitInput.setAttribute('min', '0');
        unitInput.setAttribute('step', 'any');

        const button = document.createElement('button');
        button.innerText = 'X';
        button.type = 'button';
        button.setAttribute('onclick', 'removeField(this)');

        div.appendChild(subjectInput);
        div.appendChild(gradeInput);
        div.appendChild(unitInput);
        div.appendChild(button);

        gradesRow.appendChild(div)

    };
    subjects = document.querySelectorAll('.subject');
    grades = document.querySelectorAll('.grade');
    units = document.querySelectorAll('.unit');
}

// multiple adding of row
form1.addEventListener('submit', e => {
    e.preventDefault();
    if (subjectNumber.value <= 0){
        return subjectErr.innerText = "Subject must be greater than 0";
    }
    subjectErr.innerText = "";
    addRowElement(parseInt(subjectNumber.value)-1);
    subjectNumber.value = "";
});

// Adding single row
addRow.addEventListener('click', e => {
    addRowElement(1);
})

// Removing of row
const removeField = e => {
    e.parentNode.remove()
    grades = document.querySelectorAll('.grade');
    units = document.querySelectorAll('.unit');
}

// Validating the user inputs
const validate = () => {
    for(let i = 0; i < grades.length; i++){
        if(grades[i].value === "" || grades[i].value === null || units[i].value === "" || units[i].value === null){
            return errMessage.innerText = "Must fill up every fields";
        }
    };
    console.log(typeof(grades[0].value))
}

const computeGwa = () => {
    let temp = 0, subTotal = 0, unitTotal = 0;
    for(let i = 0; i < grades.length; i++){
        temp = parseFloat(grades[i].value) * parseFloat(units[i].value);
        subTotal += temp;
        unitTotal += parseFloat(units[i].value);

        const tr = document.createElement('tr')

        const tdSubject = document.createElement('td')
        tdSubject.innerText = subjects[i].value

        const tdGrade = document.createElement('td')
        tdGrade.innerText = grades[i].value

        const tdUnit = document.createElement('td')
        tdUnit.innerText = units[i].value

        tr.appendChild(tdSubject)
        tr.appendChild(tdGrade)
        tr.appendChild(tdUnit)

        tbody.appendChild(tr)
    }

    let total = subTotal / unitTotal;
    if(total > 0){
        gwa.innerText = total.toFixed(2);
        totalUnits.innerText = unitTotal.toFixed(0);
        console.log(totalUnits)
        errMessage.innerText = "";
        output.classList.remove('output')

        const tr = document.createElement('tr')

        const tdSubject = document.createElement('td')
        tdSubject.innerText = "Total"

        const tdGrade = document.createElement('td')
        tdGrade.innerText = total.toFixed(2);

        const tdUnit = document.createElement('td')
        tdUnit.innerText = unitTotal.toFixed(0);

        tr.appendChild(tdSubject)
        tr.appendChild(tdGrade)
        tr.appendChild(tdUnit)

        tbody.appendChild(tr)
    }
}

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    validate();
    computeGwa();
});