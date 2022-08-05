let grades = document.querySelectorAll('.grade');
let units = document.querySelectorAll('.unit');
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

const addRowElement = (count) => {
    for(let i = 0; i < count; i++){
        const div = document.createElement('div');
        div.className="row";

        const subjectInput = document.createElement('input');
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
    grades = document.querySelectorAll('.grade');
    units = document.querySelectorAll('.unit');
}

form1.addEventListener('submit', e => {
    e.preventDefault();
    if (subjectNumber.value <= 0){
        return subjectErr.innerText = "Subject must be greater than 0";
    }
    subjectErr.innerText = "";
    addRowElement(parseInt(subjectNumber.value)-1);
});

addRow.addEventListener('click', e => {
    addRowElement(1);
})

const removeField = e => {
    e.parentNode.remove()
    grades = document.querySelectorAll('.grade');
    units = document.querySelectorAll('.unit');
    console.log(e)
}

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    let err;

    grades.forEach(grade => {
        if(grade.value === "" || grade.value === null){
            return err = "Must fill up every fields";
        }
    });

    units.forEach(unit => {
        if(unit.value === "" || unit.value === null){
            return err = "Must fill up every fields";
        }
    });

    if(err){
        errMessage.innerText = err
        e.preventDefault();
        console.log("ns f")
    }

    let temp = 0, subTotal = 0, unitTotal = 0;
    for(let i = 0; i < grades.length; i++){
        temp = parseFloat(grades[i].value) * parseFloat(units[i].value);
        subTotal += temp;
        unitTotal += parseFloat(units[i].value);
    }

    let total = subTotal / unitTotal;
    if(total > 0){
        gwa.innerText = total.toFixed(2);
        errMessage.innerText = "";
        output.classList.remove('output')
    }
});

