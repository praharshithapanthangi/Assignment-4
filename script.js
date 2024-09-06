// Clock Update
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  document.getElementById("clock").innerHTML = `${hours}:${minutes}:${seconds}`; // Corrected this line
}

// Update the clock immediately when the page loads
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

// Login/Signup Form Toggle
document.getElementById("open-login").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("login-card").classList.remove("hidden");
  document.getElementById("signup-card").classList.add("hidden");
});

document.getElementById("open-signup").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("signup-card").classList.remove("hidden");
  document.getElementById("login-card").classList.add("hidden");
});

document.getElementById("open-signup-from-login").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("signup-card").classList.remove("hidden");
  document.getElementById("login-card").classList.add("hidden");
});

document.getElementById("back-to-login").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("login-card").classList.remove("hidden");
  document.getElementById("signup-card").classList.add("hidden");
});

// Form Validation
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  validateLogin();
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();
  validateSignup();
});

function validateLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  let valid = true;

  if (!validateEmail(email)) {
    showError("login-email-error", "Please enter a valid email.");
    valid = false;
  } else {
    hideError("login-email-error");
  }

  if (password.length < 6) {
    showError("login-password-error", "Password must be at least 6 characters long.");
    valid = false;
  } else {
    hideError("login-password-error");
  }

  if (valid) {
    alert("Login successful");
    // Perform login action here
  }
}

function validateSignup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;
  let valid = true;

  if (!validateEmail(email)) {
    showError("signup-email-error", "Please enter a valid email.");
    valid = false;
  } else {
    hideError("signup-email-error");
  }

  if (password.length < 6) {
    showError("signup-password-error", "Password must be at least 6 characters long.");
    valid = false;
  } else {
    hideError("signup-password-error");
  }

  if (password !== confirmPassword) {
    showError("signup-confirm-password-error", "Passwords do not match.");
    valid = false;
  } else {
    hideError("signup-confirm-password-error");
  }

  if (valid) {
    alert("Signup successful");
    // Perform signup action here
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showError(elementId, message) {
  document.getElementById(elementId).innerHTML = `<span style="color: red;">${message}</span>`; // Corrected this line
}

function hideError(elementId) {
  document.getElementById(elementId).innerHTML = "";
}

// Nameday API Fetching and Display
document.getElementById("fetch-nameday").addEventListener("click", fetchNameday);

function fetchNameday() {
  const date = document.getElementById("date").value;
  const country = document.getElementById("country").value;

  if (!date) {
    alert("Please select a date.");
    return;
  }

  const apiUrl = `https://nameday.abalin.net/api/V1/getdate?country=${country}&month=${
    new Date(date).getMonth() + 1
  }&day=${new Date(date).getDate()}`;

  fetchNamedayData(apiUrl)
    .then((data) => displayNameday(data, date, country))
    .catch((error) => {
      console.error("Error fetching nameday:", error);
      alert("Failed to fetch nameday.");
    });
}

function fetchNamedayData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject("Failed to fetch data.");
        }
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function displayNameday(data, date, country) {
  const displayDate = new Date(date).toLocaleDateString();
  const countryName = document.getElementById("country").options[
    document.getElementById("country").selectedIndex
  ].text;
  const nameday = data.nameday[country];

  document.getElementById("display-date").innerHTML = `<strong>Date:</strong> ${displayDate}`; // Corrected this line
  document.getElementById("display-country").innerHTML = `<strong>Country:</strong> ${countryName}`; // Corrected this line
  document.getElementById("nameday").innerHTML = nameday
    ? `<strong>Nameday:</strong> ${nameday}` // Corrected this line
    : "<strong>Nameday:</strong> There is no nameday for the given country.";

  // Add a custom message element if nameday is not found
  if (!nameday) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = "<em>Try a different date or country.</em>";
    document.getElementById("nameday").appendChild(messageElement);
  }
}

// Profile Photo Toggle
document.addEventListener("DOMContentLoaded", function () {
  let isProfileImageVisible = false;
  let images = [
    "./assets/img/Screenshot 2024-09-03 144350.png",
    "./assets/img/boy-2.png",
    "./assets/img/girl.png",
  ];
  let currentImageIndex = 0;

  document.getElementById("profile-link").addEventListener("click", function (event) {
    event.preventDefault();

    if (isProfileImageVisible) {
      this.classList.remove("hidden");
      document.getElementById("profile-img").classList.add("hidden");
      document.getElementById("change-image-btn").classList.add("hidden");
    } else {
      this.classList.add("hidden");
      document.getElementById("profile-img").classList.remove("hidden");
      document.getElementById("change-image-btn").classList.remove("hidden");
    }

    isProfileImageVisible = !isProfileImageVisible;
  });

  document.getElementById("change-image-btn").addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById("profile-img").setAttribute("src", images[currentImageIndex]);
  });

  document.getElementById("profile-img").addEventListener("click", function () {
    this.classList.add("hidden");
    document.getElementById("profile-link").classList.remove("hidden");
    document.getElementById("change-image-btn").classList.add("hidden");

    isProfileImageVisible = false;
  });
});

// Background Color Change
document.addEventListener("DOMContentLoaded", function () {
  const colors = ["#E6FFFA", "#F0FFF0", "#F5EDED", "#DDE6ED"];
  let colorIndex = 0;

  function changeBackgroundColor() {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  }

  // Initial call to set the first color
  changeBackgroundColor();

  // Change the background color every 5 seconds
  setInterval(changeBackgroundColor, 5000);
});
