const steps = Array.from(document.querySelectorAll("form .steps"));
const nextButtons = document.querySelectorAll(".nextBtn");
const prevButtons = document.querySelectorAll(".preBtn");
const submitButton = document.querySelector(".submitBtn");
const form = document.querySelector("form");

// Validation function for the first step
function validateStep1() {
  const firstname = document.querySelector('.firstname');
  const lastname = document.querySelector('.lastname');
  let firstnameValid = true;
  let lastnameValid = true;

  if (firstname.value === '') {
    firstname.style.borderColor = "red";
    firstnameValid = false;
  } else {
    firstname.style.borderColor = "green";
  }

  if (lastname.value === '') {
    lastname.style.borderColor = "red";
    lastnameValid = false;
  } else {
    lastname.style.borderColor = "green";
  }

  return firstnameValid && lastnameValid;
}

// Validation function for the second step
function validateStep2() {
  const number = document.querySelector('#numberInput');
  const address = document.querySelector('#addressInput');
  let numberValid = true;
  let addressValid = true;

  if (number.value === '') {
    number.style.borderColor = "red";
    numberValid = false;
  } else if (number.value.length != 10) {
    number.style.borderColor = "red";
    const numberAlert = document.querySelector("#numberAlert")
    numberAlert.innerHTML = "Phone Number should be 10 characters";
    numberAlert.style.color = "red";
    numberValid = false;
  } else {
    number.style.borderColor = "green";
    numberAlert.innerHTML = '';
  }

  if (address.value === '') {
    address.style.borderColor = "red";
    addressValid = false;
  } else {
    address.style.borderColor = "green";
  }

  return numberValid && addressValid;
}


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validatePassword(password) {
  // Regular expression for password validation
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

  // Test if password matches the regex
  return passwordRegex.test(password);
}

function validateStep3() {
  const email = document.querySelector("#exampleInputEmail1")
  const password = document.querySelector("#exampleInputPassword1")
  let emailValid = true;
  let passwordValid = true;

  if (email.value === '') {
    email.style.borderColor = "red";
    emailValid = false;
  } else if (!validateEmail(email.value)) {
    const emailErr = document.querySelector("#emailErr")
    emailErr.innerHTML = "Email should be in @gmail.com format"; emailErr.style.color = "red";
    email.style.borderColor = "red";
    emailValid = false;
  } else {
    email.style.borderColor = "green";
    emailErr.innerHTML = '';
    emailValid = true;
  }

  if (password.value === '') {
    password.style.borderColor = "red";
    passwordValid = false;
  } else if (!validatePassword(password.value)) {
    const passwordErr = document.querySelector("#passwordErr")
    passwordErr.innerHTML = "Password must contain at least 8 characters including uppercase, lowercase, number and atleast one Special Character."; passwordErr.style.color = "red";
    password.style.borderColor = "red";
    passwordValid = false;
  } else {
    password.style.borderColor = "green";
    passwordErr.innerHTML = '';
    passwordValid = true;
  }
  return emailValid && passwordValid;
}

// if (email.value === '' || password.value === '') {
//   email.style.borderColor = "red";
//   password.style.borderColor = "red";
//   return false;
// }else if(!validateEmail(email.value)){
//   const emailErr = document.querySelector("#emailErr")
//   emailErr.innerHTML = "Email should be in @gmail.com format"; emailErr.style.color = "red";
//   email.style.borderColor = "red";
//   password.style.borderColor = "";
// }else if(!validatePassword(password.value)){
//   const passwordErr = document.querySelector("#passwordErr")
//   passwordErr.innerHTML = "Password must contain at least 8 characters including uppercase, lowercase, number and atleast one Special Character."; passwordErr.style.color = "red";
//   email.style.borderColor = "";
//   password.style.borderColor = "red";
// } else {
//   email.style.borderColor = "";
//   password.style.borderColor = "";
//   return true;
// }


// Function to handle next button click
function onNextButtonClick() {
  const activeIndex = steps.findIndex(step => step.classList.contains('active'));
  if (activeIndex === 0) {
    if (validateStep1()) {
      changeStep('next');
    }
  } else if (activeIndex === 1) {
    if (validateStep2()) {
      changeStep('next');
    }
  } else {
    changeStep('next');
  }
}

// Function to handle previous button click
function onPrevButtonClick() {
  changeStep('prev');
}

// Function to change steps
function changeStep(btn) {
  const activeIndex = steps.findIndex(step => step.classList.contains('active'));
  steps[activeIndex].classList.remove('active');
  if (btn === 'next') {
    steps[activeIndex + 1].classList.add('active');
  } else if (btn === 'prev') {
    steps[activeIndex - 1].classList.add('active');
  }
}

nextButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    onNextButtonClick();
  });
});

prevButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    onPrevButtonClick();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const activeIndex = steps.findIndex(step => step.classList.contains('active'));
  const inputValues = {}; // Define inputValues as an object

  if (activeIndex === 2) {
    if (validateStep3()) {
      form.querySelectorAll("input").forEach(input => {
        const name = input.getAttribute("name");
        const value = input.value;
        inputValues[name] = value;
      });


      form.submit();
      const inputValuesData = JSON.stringify(inputValues);
      localStorage.setItem('LoginDetails', inputValuesData);
      window.location.href = "https://kowdiraju.github.io/Project1/project1.html";

    }
  }


});

