const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const outputDay = document.getElementById('answer-day');
const outputMonth = document.getElementById('answer-month');
const outputYear = document.getElementById('answer-year');
const submitBtn = document.querySelector('.btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const inputs = [inputDay, inputMonth, inputYear];
    inputs.forEach(input => {
        input.parentElement.classList.remove('error');
    });

    let hasError = false;

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-msg');

        errorDisplay.textContent = message;
        inputControl.classList.add('error');
    }
    
    if(inputDay.value === "") {
        setError(inputDay, "This field is required");
        hasError = true;
    }

    if(inputMonth.value === "") {
        setError(inputMonth, "This field is required");
        hasError = true;
    }

    if(inputYear.value === "") {
        setError(inputYear, "This field is required");
        hasError = true;
    }

    if(hasError)return;
    
    let dayBirth = +inputDay.value;
    let monthBirth = +inputMonth.value;
    let yearBirth = +inputYear.value;

    const date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1; 
    let currentDay = date.getDate();

    if(monthBirth > 12 || monthBirth < 1) {
        setError(inputMonth, "Must be a valid month");
        hasError = true;
    }

    if(yearBirth > currentYear) {
        setError(inputYear, "Must be in the past");
        hasError = true;
    }

    const daysInThatMonth = new Date(yearBirth, monthBirth, 0).getDate();

    if(dayBirth > daysInThatMonth || dayBirth < 1) {
        setError(inputDay, "Must be a valid day");
        hasError = true;
    }

    if(hasError) return;

    let y = currentYear - yearBirth;
    let m = currentMonth - monthBirth;
    let d = currentDay - dayBirth;
    
    if(m < 0 || (m === 0 && d < 0)) {
        y--;
        m += 12;
    }

    if(d < 0) {
        const daysInLastMonth = new Date( currentYear, currentMonth - 1, 0).getDate();
        d += daysInLastMonth;
        m--;
    }

    outputDay.textContent = d;
    outputMonth.textContent = m;
    outputYear.textContent = y;

});