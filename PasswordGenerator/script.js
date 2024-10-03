let inputSlider = document.querySelector("input[type=range]");
let lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDispaly = document.querySelector(".display");
let copyBtn = document.querySelector("[data-copy]");
let copyMsg = document.querySelector("[data-copyMsg]");
let uppercheck = document.querySelector("#uppercase");
let lowercheck = document.querySelector("#lowercase");
let numberscheck = document.querySelector("#Numbers");
let symbolcheck = document.querySelector("#Symbols");
let indicator = document.querySelector("[data-indicator]");
let generateBtn = document.querySelector(".generatebutton");
let Allcheckbox = document.querySelectorAll("input[type=checkbox]");
let symbols = '~!@#$%^&*(){}[]+_-=><?":|;.,/';

let passwordLength = 10;
slider();

function slider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const minimum = inputSlider.min;
  const maximum = inputSlider.max;
  inputSlider.style.backgroundSize = 
((passwordLength -minimum)*100/(maximum - minimum)) + "% 100%"
}

inputSlider.addEventListener('input', (event) => {
  passwordLength = event.target.value;
  slider();
});

function getRndIntegr(min,max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndIntegr(0, 9);
}
function generateLowerCase() {
  return String.fromCharCode(getRndIntegr(97, 123));
}
function generateUpperCase() {
  return String.fromCharCode(getRndIntegr(65, 91));
}
function generateSymbol() {
  const randNum = getRndIntegr(0, symbols.length);
  return symbols[randNum];
  // return Symbols[index];
}

function setIndictor(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `1px 1px 20px ${color}`;
}

setIndictor("#ccc");

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercheck.checked)
     hasUpper = true;
  if (lowercheck.checked)
     hasLower = true;
  if (numberscheck.checked)
     hasNum = true;
  if (symbolcheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 5) {
    setIndictor("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNum || hasSym) &&
    passwordLength >= 10
  ) {
    setIndictor("#ff0");
  } else {
    setIndictor("#f00");
  }
}

async function copyClipboard() {
  try {
    await navigator.clipboard.writeText(passwordDispaly.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  copyMsg.classList.add('active');
  setTimeout(() => {
    copyMsg.classList.remove('active');
  }, 2000);
}

copyBtn.addEventListener('click', () => {
  if (passwordDispaly.value) 
  copyClipboard();
});

function shuflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

let checkCount = 0;

function handleCheckbox() {
  checkCount = 0;
  Allcheckbox.forEach((checkbox) => {
    if (checkbox.checked) 
    checkCount++;
  });

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    slider();
  }
}

Allcheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckbox);
});

let password = "";

generateBtn.addEventListener('click', () => {
  if (checkCount <= 0)
     return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    slider();
  }

  password = "";

  let funArr = [];
  console.log("starting the jorney");
  if (uppercheck.checked) 
    funArr.push(generateUpperCase);

  if (lowercheck.checked) 
    funArr.push(generateLowerCase);
  
  if (numberscheck.checked) 
    funArr.push(generateRandomNumber);

  if (symbolcheck.checked) 
    funArr.push(generateSymbol);

  for (let i = 0; i < funArr.length; i++) {
    password += funArr[i]();
  }

  console.log("compulsory addition done");

  for (let i = 0; i < passwordLength - funArr.length; i++) {
    let randIndex = getRndIntegr(0, funArr.length);
    password += funArr[randIndex]();
  }

  console.log("Remaining addition done");

  password = shuflePassword(Array.from(password));
  console.log("Shuffling done"); 
  passwordDispaly.value = password;


  console.log("succesfully executed");
  calcStrength();

});
