const content = document.getElementById("content");

async function loadStatus() {
     const API_URL = "http://localhost:3000";

    try {
        content.textContent = "loading...";

        const res = await fetch(`${API_URL}/health`);
        const data = await res.json();

        if (data.status === "ok") {
            content.textContent = `server is healthy`;
        } else {
            content.textContent = "server has a problem";
        }
    } catch (error) {
        content.textContent = "Cannot connect to server";
    }

}
  
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

 const API_URL = "http://localhost:3000";
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    alert("Login failed");
    return;
  }

  const data = await res.json();

  localStorage.setItem("token", data.token);
  alert("Login success");

  loadstats();
}

const token = localStorage.getItem("token");
if (token) {
  loadstats();
}

async function loadstats() {
    const API_URL = "http://localhost:3000";
    const token = localStorage.getItem("token");

    if (!token) {
        content.textContent = "Please login first";
        return;
    }

    const res = await fetch(`${API_URL}/stats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        content.textContent = "Unauthorized or invalid token";
        return;
    }

    const data = await res.json();

    content.innerHTML = `
      <ul>
        <li>Users: ${data.users}</li>
        <li>CPU: ${data.cpu}</li>
        <li>Memory: ${data.memory}</li>
        <li>Uptime: ${data.uptime}</li>
        <li>Region: ${data.region}</li>
        <li>Server: ${data.serverName}</li>
        <li>Age: ${data.age}</li>
      </ul>
    `;
}







