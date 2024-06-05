document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form inputs
        const websiteInput = document.getElementById("website");
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        // Check if any input is blank
        if (websiteInput.value.trim() === "" || usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
            document.getElementById("alert").textContent = "Please fill in all the information.";
            return;
        }

        document.getElementById("alert").textContent = ""; // Clear any previous error message

        // If all inputs are filled, proceed with form submission
        let passwords = localStorage.getItem("passwords") ? JSON.parse(localStorage.getItem("passwords")) : [];
        passwords.push({ website: websiteInput.value, username: usernameInput.value, password: passwordInput.value });
        localStorage.setItem("passwords", JSON.stringify(passwords));

        // Reset form inputs
        websiteInput.value = "";
        usernameInput.value = "";
        passwordInput.value = "";

        showPasswords();
    });
});

function maskPassword(pass){
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str  += "*";
    }
    return str;
}

function copyText(txt) {
    const tempInput = document.createElement('input');
    tempInput.value = txt;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    document.getElementById("alert").textContent = "Copied!";
    setTimeout(() => {
        document.getElementById("alert").textContent = "";
    }, 2000);
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = data ? JSON.parse(data) : [];
    arr = arr.filter(e => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arr));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

// Logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector(".table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    } else {
        tb.innerHTML = "<tr><th>Website</th><th>Username</th><th>Password</th><th>Delete</th></tr>";
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str;
    }
}

console.log("Working");
showPasswords();
