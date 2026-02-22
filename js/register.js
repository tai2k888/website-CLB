// Populate club select options
const clubSelect = document.getElementById("clubSelect");
const artsClubs = clubsData.filter((c) => c.category === "arts");
const sportsClubs = clubsData.filter((c) => c.category === "sports");

// Add optgroups
const artsGroup = document.createElement("optgroup");
artsGroup.label = "Nghệ Thuật";
artsClubs.forEach((club) => {
  const option = document.createElement("option");
  option.value = club.id;
  option.textContent = club.name;
  artsGroup.appendChild(option);
});
clubSelect.appendChild(artsGroup);

const sportsGroup = document.createElement("optgroup");
sportsGroup.label = "Thể Thao";
sportsClubs.forEach((club) => {
  const option = document.createElement("option");
  option.value = club.id;
  option.textContent = club.name;
  sportsGroup.appendChild(option);
});
clubSelect.appendChild(sportsGroup);

// Pre-select club from URL parameter
const params = new URLSearchParams(window.location.search);
const clubParam = params.get("club");
if (clubParam) {
  clubSelect.value = clubParam;
}

// Form validation and submission
const form = document.getElementById("registerForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  let isValid = true;
  const formData = new FormData(form);

  // Clear previous errors
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));

  // Validate full name
  const fullName = formData.get("fullName");
  if (!fullName || fullName.length < 3) {
    showError("fullName", "Tên phải có ít nhất 3 ký tự");
    isValid = false;
  }

  // Validate email
  const email = formData.get("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError("email", "Email không hợp lệ");
    isValid = false;
  }

  // Validate phone
  const phone = formData.get("phone");
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    showError("phone", "Số điện thoại phải có 10 chữ số");
    isValid = false;
  }

  // Validate club selection
  const club = formData.get("club");
  if (!club) {
    showError("club", "Vui lòng chọn câu lạc bộ");
    isValid = false;
  }

  // Validate terms
  const terms = formData.get("terms");
  if (!terms) {
    alert("Vui lòng đồng ý với điều khoản");
    isValid = false;
  }

  if (isValid) {
    // Simulate form submission
    setTimeout(() => {
      form.style.display = "none";
      successMessage.style.display = "block";
      lucide.createIcons();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reset form after 5 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = "block";
        successMessage.style.display = "none";
      }, 5000);
    }, 500);
  }
});

function showError(fieldName, message) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  const errorSpan = input.parentElement.querySelector(".error-message");

  if (input && errorSpan) {
    input.classList.add("error");
    errorSpan.textContent = message;
  }
}

// Real-time validation
form.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("blur", () => {
    const errorSpan = input.parentElement.querySelector(".error-message");
    if (input.value && input.checkValidity()) {
      input.classList.remove("error");
      if (errorSpan) errorSpan.textContent = "";
    }
  });
});
