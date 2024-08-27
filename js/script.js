'use strict'
const fieldMessage = 'This field is required';
const queryMessage = 'Please select a query type';
const emailMessage = 'Please enter a valid email address';
const submitMessage = 'To submit this form, please consent to being contacted';

function errorMessageSign(inputElement, errorMessageElement, errorMessage, validateFn) {
    inputElement.addEventListener('input', function() {
        if (!validateFn(this)) {
            errorMessageElement.textContent = errorMessage;
            inputElement.style.color = 'hsl(4, 100%, 67%)';
            inputElement.style.borderColor = 'hsl(4, 100%, 67%)';
            inputElement.nextElementSibling.style.color = 'hsl(4, 100%, 67%)'; 
        } else {
            errorMessageElement.textContent = '';
            inputElement.style.color = '';
            inputElement.style.borderColor = '';
            inputElement.nextElementSibling.style.color = ''; 
        }
    });
}

function validateTextInput(input) {
    return input.value.trim() !== '';
}

function validateEmailInput(input) {
    return input.checkValidity();
}

function validateRadioButtons(name) {
    return document.querySelector(`input[name="${name}"]:checked`) !== null;
}

function validateCheckbox(input) {
    return input.checked;
}

// Select elements
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const message = document.querySelector('.message input'); 
const consentCheckbox = document.querySelector('.checkbox input[type="checkbox"]');

errorMessageSign(fname, fname.nextElementSibling, fieldMessage, validateTextInput);
errorMessageSign(lname, lname.nextElementSibling, fieldMessage, validateTextInput);
errorMessageSign(email, email.nextElementSibling, emailMessage, validateEmailInput);
errorMessageSign(message, message.nextElementSibling, fieldMessage, validateTextInput);


document.querySelectorAll('input[name="query"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const isValid = validateRadioButtons('query');
        const errorSpan = document.querySelector('.query-border span');
        if (!isValid) {
            errorSpan.textContent = queryMessage;
            document.querySelectorAll('input[name="query"]').forEach(radio => {
                radio.style.outlineColor = 'hsl(4, 100%, 67%)'; // Adjust styling as needed
            });
        } else {
            errorSpan.textContent = '';
            document.querySelectorAll('input[name="query"]').forEach(radio => {
                radio.style.outlineColor = '';
            });
        }
    });
});

errorMessageSign(consentCheckbox, consentCheckbox.nextElementSibling, submitMessage, validateCheckbox);

document.getElementById('btn').addEventListener('click', function(event) {
    let formValid = true;

    [fname, lname, email, message].forEach(input => {
        if (!validateTextInput(input)) {
            input.nextElementSibling.textContent = fieldMessage;
            input.style.color = 'hsl(4, 100%, 67%)';
            input.style.borderColor = 'hsl(4, 100%, 67%)';
            formValid = false;
        }
    });

    if (!validateEmailInput(email)) {
        email.nextElementSibling.textContent = emailMessage;
        email.style.color = 'hsl(4, 100%, 67%)';
        email.style.borderColor = 'hsl(4, 100%, 67%)';
        formValid = false;
    }

    if (!validateRadioButtons('query')) {
        document.querySelector('.query-border span').textContent = queryMessage;
        formValid = false;
    }

    if (!validateCheckbox(consentCheckbox)) {
        consentCheckbox.nextElementSibling.textContent = submitMessage;
        formValid = false;
    }

    if (!formValid) {
        event.preventDefault();
    } else {
        alert(`Message Sent!Thanks for completing the form. We'll be in touch soon!`);
    }
});
