
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const modifiedDate = new Date(document.lastModified);
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = modifiedDate.toLocaleDateString('en-GB', options);

document.getElementById("lastModified").innerHTML = document.lastModified;


