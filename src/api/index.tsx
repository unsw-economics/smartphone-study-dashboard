// const apiUrl = "https://zhang-smartphone-web.onrender.com/api";
// const apiUrl = "http://localhost:3000/api";
const apiUrl = "https://zhang-smartphone-web-production.onrender.com/api";
export async function getSubjects() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiUrl}/get-all-subjects`, {
    headers: {
      authorization: `${token}`,
    },
    method: "GET",
  });

  const json = await response.json();

  return json.data;
}

export async function getDates() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiUrl}/get-all-dates`, {
    headers: {
      authorization: `${token}`,
    },
    method: "GET",
  });

  const json = await response.json();

  return json.data;
}

export async function getBackupUsage() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiUrl}/get-all-usage`, {
    headers: {
      authorization: `${token}`,
    },
    method: "GET",
  });

  const json = await response.json();

  return json.data;
}

export async function getMainUsage() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiUrl}/get-all-reports`, {
    headers: {
      authorization: `${token}`,
    },
    method: "GET",
  });

  const json = await response.json();

  return json.data;
}

export async function getUsageSummary() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiUrl}/get-usage-summary`, {
    headers: {
      authorization: `${token}`,
    },
    method: "GET",
  });

  const json = await response.json();

  return json.data;
}
