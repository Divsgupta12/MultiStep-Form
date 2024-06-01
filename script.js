const statecitydata = {
  UP: ["Lucknow", "Prayagraj", "Jhansi", "Kanpur", "Agra", "Varanasi"],
  MP: ["Bhopal", "Ujjain", "Indore", "	Satna", "Shivpuri", "Gwalior"],
};

const state = document.getElementById("state");
state.addEventListener("change", function () {
  const cities = statecitydata[this.value] || [];
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = '<option value="">Select City</option>';
  cities.forEach((city) => {
    citySelect.innerHTML += `<option value="${city}">${city}</option>`;
  });
});

document.getElementById("dob").addEventListener("change", function () {
  const age = calculateAge(new Date(this.value));
  document.getElementById("age").value = age;
});
function calculateAge(dob) {
  const diff = Date.now() - dob.getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

document.getElementById("total").addEventListener("change", function () {
  const score = document.getElementById("score").value;
  const total = document.getElementById("total").value;
  const percent = calculatepercentage(score, total);
  document.getElementById("percentage").value = percent;
});

function calculatepercentage(score, total) {
  const percen = (score / total) * 100;
  return percen;
}

const prevbtn = document.querySelectorAll(".prev_btn");
const nextbtn = document.querySelectorAll(".next_btn");
const formsteps = document.querySelectorAll(".steps");

let formstepnum = 0;
nextbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    formstepnum++;
    updateFormStep();
  });
});

prevbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    formstepnum--;
    updateFormStep();
  });
});

function updateFormStep() {
  formsteps.forEach((formstep) => {
    formstep.classList.contains("active") &&
      formstep.classList.remove("active");
  });
  formsteps[formstepnum].classList.add("active");
}

function addQualification() {
  const container = document.getElementById("qualification_container");
  const rows = document.getElementsByClassName("qualification_row");
  if (rows.length < 4) {
    const newRow = rows[0].cloneNode(true);
    container.appendChild(newRow);
  }
}

function addExperience() {
  console.log("clicked");
  const container = document.getElementById("experience_container");
  const rows = document.getElementsByClassName("experience_row");
  if (rows.length < 4) {
    const newRow = rows[0].cloneNode(true);
    container.appendChild(newRow);
  }
}

const form = document.getElementById("multiStepForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  showProfile();
});

function showProfile() {
  const formData = new FormData(form);
  let profileHTML = "";
  profileHTML += "<h2>Personal Detail:</h2>";
  profileHTML += `<div class="profile_data"><h3>Name:</h3><span class="detail_value"> ${formData.get(
    "name"
  )}</span></div>`;
  profileHTML += `<div class="profile_data"><h3>Email:</h3> <span class="detail_value"> ${formData.get(
    "email"
  )}</span></div>`;
  profileHTML += `<div class="profile_data"><h3>Contact:</h3> <span class="detail_value"> ${formData.get(
    "contact"
  )}</span></div>`;
  profileHTML += `<div class="profile_data"><h3>Date of Birth:</h3>  <span class="detail_value">${formData.get(
    "dob"
  )}</span></div>`;
  profileHTML += `<div class="profile_data"><h3>Age:</h3>  <span class="detail_value">${formData.get(
    "age"
  )}</span></div>`;
  profileHTML += `<div class="profile_data"><h3>State:</h3> <span class="detail_value"> ${formData.get(
    "state"
  )}</span></div>`;
  profileHTML += `<div class="profile_data"><h3>City:</h3> <span class="detail_value"> ${formData.get(
    "city"
  )}</span></div>`;

  profileHTML += "<h2>Qualifications:</h2>";
  formData.getAll("standard").forEach((standard, index) => {
    profileHTML += `<div class="profile_data"><h3>Standard:</h3> <span class="detail_value"> ${standard}</span></div>`;
    profileHTML += `<div class="profile_data"><h3>Score:</h3> <span class="detail_value"> ${
      formData.getAll("score")[index]
    }</span></div>`;
    profileHTML += `<div class="profile_data"><h3>Total:</h3> <span class="detail_value"> ${
      formData.getAll("total")[index]
    }</span></div>`;
  });

  profileHTML += "<h2>Experience:</h2>";
  formData.getAll("company").forEach((company, index) => {
    profileHTML += `<div class="profile_data"><h3>Company:</h3>  <span class="detail_value">${company}</span></div>`;
    profileHTML += `<div class="profile_data"><h3>Title:</h3> <span class="detail_value"> ${
      formData.getAll("title")[index]
    }</span></div>`;
    profileHTML += `<div class="profile_data"><h3>Project:</h3> <span class="detail_value"> ${
      formData.getAll("project")[index]
    }</span></div>`;
    profileHTML += `<div class="profile_data"><h3>From:</h3> <span class="detail_value"> ${
      formData.getAll("from")[index]
    }</span></div>`;
    profileHTML += `<div class="profile_data"><h3>To:</h3> <span class="detail_value"> ${
      formData.getAll("to")[index]
    }</span></div>`;
  });

  profileContent.innerHTML = profileHTML;

  form.style.display = "none";
  profilePage.style.display = "block";
}
