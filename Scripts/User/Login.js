const login_background = document.querySelector("#login-bg");
const container = document.querySelector("#container");
const login_form = document.querySelector("#login-form");
const login_username_input = document.querySelector("#username-input");
const login_password_input = document.querySelector("#password-input");
const eye_show_password_btn = document.querySelector("#eye");
const notification_container = document.querySelector("#notif-container");

// Functions
function sha256(pass) {
	// It changes the "pass" to encrypted "pass" for security
	return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
}

function createNotif(title, message) {
	let newNotif = document.createElement("div");
	newNotif.classList.add("notif-card");

	console.log(title, message);

	newNotif.innerHTML = `
	<img src="../../Resources/Icons/exclamation.svg">
	<div class="text_content">
		<span>${ title }</span>
		<span>${ message }</span>
	</div>
	<div class="exit">
		<img src="../../Resources/Icons/xmark.svg">	
	</div>
	`;
	notification_container.appendChild(newNotif);

	setTimeout(function() {
		newNotif.remove();
	}, 5000);
}


// Magic
window.addEventListener("DOMContentLoaded", function() {
	let pass_shown = false;

	setTimeout(function() {
		login_background.classList.add("login-s_1-background-blur");
		container.classList.add("login-s_1-login-show");
	}, 300);

	login_password_input.addEventListener("input", function() {
		if(login_password_input.value.length > 0) {
			eye_show_password_btn.style.opacity = 1;
		}
		else {
			eye_show_password_btn.style.opacity = 0;
		}
	});

	eye_show_password_btn.addEventListener("click", function() {
		if(!pass_shown) {
			eye_show_password_btn.src = "../../Resources/Icons/eye-close.svg";
			login_password_input.type = "text";
			pass_shown = true;
		}
		else {
			eye_show_password_btn.src = "../../Resources/Icons/eye-open.svg";
			login_password_input.type = "password";
			pass_shown = false;
		}
	});

	login_form.addEventListener("submit", function(event) {
		event.preventDefault();

		if(login_username_input.value.length <= 0) {
			createNotif(
				"Username not Found!",
				"Make sure that you typed your username correctly."
			);
		}

		if(login_password_input.value.length <= 0) {
			
		}

		var request = indexedDB.open("Users", 2);

		request.onsuccess = function(event) {
			const db = event.target.result;
			const transaction = db.transaction("Users", "readwrite");
			const objectStore = transaction.objectStore("Users");
			const cursor = objectStore.openCursor();

			cursor.onsuccess = function(e_event) {
				if(cursor) {
					var user = cursor.value;

					if(user.is_Logged == 1) {
						user.is_Logged = 0;

						cursor.update(user);
					}

					cursor.continue();
				}
				else {

				}
			}
		}
	});
});