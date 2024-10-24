async function login(event) {
  event.preventDefault();
  const toast = document.querySelector(".toast");
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user);
      localStorage.setItem("authToken", data.token);

      message.innerText = "login success!";
      toast.classList.add("show");
      toast.style.backgroundColor = "green";
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);

      window.location.href = "headerUI.html";
    } else {
      message.innerText = "login failed!";
    }
  } catch (error) {
    message.innerText = "login failed!";
    toast.style.backgroundColor = "red";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

function checkLoginState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("authToken");
  const logoutButton = document.getElementById("logoutButton");

  if (isLoggedIn && token) {
    logoutButton.style.display = "block";
  } else {
    logoutButton.style.display = "none";
  }
}


function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  window.location.href = "login.html";
}
