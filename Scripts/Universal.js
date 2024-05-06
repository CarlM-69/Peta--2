// Variables
const username_display = document.querySelector("username_change");
const xhr = new XMLHttpRequest();

// Functions
function sha256(pass) {
    return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
}


// Magic
