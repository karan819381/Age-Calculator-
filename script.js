const errors = document.getElementsByClassName("error");
const labels = document.getElementsByClassName("label");
const btn = document.getElementById("calculate-age");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

btn.addEventListener("click", function () {
  const dayValue = parseInt(day.value);
  const monthValue = parseInt(month.value);
  const yearValue = parseInt(year.value);
  const today = new Date();

  let isValid = validateInput(dayValue, monthValue, yearValue);
  if (!isValid) return;

  let ageYears = today.getFullYear() - yearValue;
  let ageMonths = today.getMonth() + 1 - monthValue;
  let ageDays = today.getDate() - dayValue;

  if (ageDays < 0) {
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageMonths--;
  }

  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  document.getElementById("years").innerText = ageYears;
  document.getElementById("months").innerText = ageMonths;
  document.getElementById("days").innerText = ageDays;
});

function validateInput(dayValue, monthValue, yearValue) {
  let valid = true;

  // Reset previous errors and label styles
  Array.from(errors).forEach((error) => (error.style.display = "none"));
  Array.from(labels).forEach((label) => (label.style.color = ""));

  if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
    errors[0].style.display = "block"; 
    labels[0].style.color = "red"; 
    valid = false;
  }

  if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
    errors[1].style.display = "block"; 
    labels[1].style.color = "red"; 
    valid = false;
  }

  const currentYear = new Date().getFullYear();
  if (isNaN(yearValue) || yearValue < 1900 || yearValue > currentYear) {
    errors[2].style.display = "block"; 
    labels[2].style.color = "red";
    valid = false;
  }

  return valid;
}
