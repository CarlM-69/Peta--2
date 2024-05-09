const register_background = document.querySelector("#register-bg");
const container = document.querySelector("#container");
const register_form = document.querySelector("#register-form");
const register_username_input = document.querySelector("#username-input");
const register_fullname_input = document.querySelector("#fullname-input");
const register_email_input = document.querySelector("#email-input");
const register_password_input = document.querySelector("#password-input");
const register_password_re_input = document.querySelector("#password-re-input");
const eye_show_1_password_btn = document.querySelector("#eye_1");
const eye_show_2_password_btn = document.querySelector("#eye_2");
const notification_container = document.querySelector("#notif-container");

// Functions
function sha256(pass) {
	// It changes the "pass" to encrypted "pass" for security
	return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
}

function createNotif(title, message) {
	let newNotif = document.createElement("div");
	newNotif.classList.add("notif-card");
	newNotif.classList.add("register-s_1-notif-show");

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

	function removeNotif() {
		newNotif.classList.remove("register-s_1-notif-show");
		newNotif.classList.add("register-s_1-notif-hide");

		setTimeout(function() {
			newNotif.remove(); 
		}, 600);
	}

	newNotif.addEventListener("click", function() {
		removeNotif();
	});

	setTimeout(function() {
		removeNotif();
	}, 5000);
}


// Magic
window.addEventListener("DOMContentLoaded", function() {
	let pass_shown = false;
	let pass_shown_1 = false;

	setTimeout(function() {
		register_background.classList.add("register-s_1-background-blur");
		container.classList.add("register-s_1-register-show");
	}, 300);

	register_password_input.addEventListener("input", function() {
		if(register_password_input.value.length > 0) {
			eye_show_1_password_btn.style.opacity = 1;
		}
		else {
			eye_show_1_password_btn.style.opacity = 0;
		}
	});

	register_password_re_input.addEventListener("input", function() {
		if(register_password_re_input.value.length > 0) {
			eye_show_2_password_btn.style.opacity = 1;
		}
		else {
			eye_show_2_password_btn.style.opacity = 0;
		}
	});

	eye_show_1_password_btn.addEventListener("click", function() {
		if(!pass_shown) {
			eye_show_1_password_btn.src = "../../Resources/Icons/eye-close.svg";
			register_password_re_input.type = "text";
			pass_shown = true;
		}
		else {
			eye_show_1_password_btn.src = "../../Resources/Icons/eye-open.svg";
			register_password_re_input.type = "password";
			pass_shown = false;
		}
	});

	eye_show_2_password_btn.addEventListener("click", function() {
		if(!pass_shown_1) {
			eye_show_2_password_btn.src = "../../Resources/Icons/eye-close.svg";
			register_password_input.type = "text";
			pass_shown_1 = true;
		}
		else {
			eye_show_2_password_btn.src = "../../Resources/Icons/eye-open.svg";
			register_password_input.type = "password";
			pass_shown_1 = false;
		}
	});

	register_form.addEventListener("submit", function(event) {
		event.preventDefault();

		if(register_username_input.value.length <= 0) {
			createNotif(
				"Enter your username",
				"You can't register without your username."
			);
			return;
		}

		if(register_password_input.value.length <= 0) {
			createNotif(
				"Password Required",
				"You must type the password."
			);
			return;
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

					if(user) {
						if(user.username.toLowerCase() == register_username_input.value.toLowerCase()) {
							if(user.password == sha256(register_password_input.value)) {
								user.is_Logged = 1;
	
								cursor.update(user);
							}
							else {
								createNotif(
									"Incorrect Password",
									"Make sure that you typed your password correctly."
								);
								return;
							}
						}
					}
					else {
						createNotif(
							"Username not Found",
							"Make sure that your username is correct."
						);
					}

					cursor.continue;
				}
				else {
					createNotif(
						"Username not Found",
						"Make sure that your username is correct."
					);
				}
			};
		}
	});
});