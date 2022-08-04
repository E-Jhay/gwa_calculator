let grades = document.querySelectorAll('.grade');
let units = document.querySelectorAll('.unit');
const errMessage = document.getElementById('errMessage');
const form = document.getElementById('form');
const gwa = document.getElementById('gwa');
const subjectNumber = document.getElementById('subject_no');
const subjectButton = document.getElementById('subject_button');
const subjectErr = document.getElementById('subject_err');
const gradesRow = document.getElementById('grades_row');
const addRow = document.getElementById('add_row');

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

        div.appendChild(subjectInput);
        div.appendChild(gradeInput);
        div.appendChild(unitInput);

        gradesRow.appendChild(div)

    };
    grades = document.querySelectorAll('.grade');
    units = document.querySelectorAll('.unit');
}

subjectButton.addEventListener('click', e => {
    if (subjectNumber.value <= 0){
        subjectErr.innerText = "Subject must be greater than 0";
    }
    addRowElement(parseInt(subjectNumber.value)-1);
});

addRow.addEventListener('click', e => {
    addRowElement(1);
    console.log(grades)
})

form.addEventListener('submit', (e) => {
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
        gwa.innerText = 'Your GWA is: ' + total.toFixed(2);
        errMessage.innerText = "";
    }
    // console.log(total, subTotal, unitTotal)
    // console.log(units.length, grades.length)
});

