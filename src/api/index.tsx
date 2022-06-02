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
