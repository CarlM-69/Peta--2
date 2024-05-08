// Functions
function sha256(pass) {
	// It changes the "pass" to encrypted "pass" for security
	return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
}


// Magic
window.addEventListener("DOMContentLoaded", function() {
	const login_background = document.querySelector("#login-bg");
	const container = document.querySelector("#container");
	const login_form = document.querySelector("#login-form");
	const login_username_input = document.querySelector("#username-input");
	const login_password_input = document.querySelector("#password-input");
	const login_form_btn = document.querySelector("#submit-btn");
	const eye_show_password_btn = document.querySelector("#eye");
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