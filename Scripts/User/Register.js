const register_background = document.querySelector("#register-bg");
const container = document.querySelector("#container");
const register_form = document.querySelector("#register-form");
const register_surname_input = document.querySelector("#surname-input");
const register_given_name_input = document.querySelector("#given-name-input");
const register_middle_name_input = document.querySelector("#middle-name-input");
const register_username_input = document.querySelector("#username-input");
const register_email_input = document.querySelector("#email-input");
const register_password_input = document.querySelector("#password-input");
const register_confirm_password_input = document.querySelector("#confirm-password-input");
const eye_1_show_password_btn = document.querySelector("#eye_1");
const eye_2_show_password_btn = document.querySelector("#eye_2");
const notification_container = document.querySelector("#notif-container");
const notifs = [];
let submit_debounce = false;

// Functions
function sha256(pass) {
	// It changes the "pass" to encrypted "pass" for security
	return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
}

function createNotif(title, message) {
	let newNotif = document.createElement("div");
	let generatedId = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
	newNotif.classList.add("notif-card");
	newNotif.classList.add("register-s_1-notif-show");

	function removeNotif(notif) {
		notif.classList.remove("register-s_1-notif-show");
		notif.classList.add("register-s_1-notif-hide");

		setTimeout(function() {
			var idx = notifs.indexOf(notif);
			if(idx != -1) { notifs.splice(idx, 1); }

			notif.remove();
		}, 600);
	}

	if(notifs.length >= 5) {
		let last_item = notifs[notifs.length-1];

		removeNotif(last_item);
	}

	notifs.unshift(newNotif);
	newNotif.innerHTML = `
		<img src="../../Resources/Icons/exclamation.svg">
		<div class="text_content">
			<span>${ title }</span>
			<span>${ message }</span>
		</div>
		<div class="exit" id="notif-exit${ generatedId }">
			<img src="../../Resources/Icons/xmark.svg">	
		</div>
	`;
	notification_container.appendChild(newNotif);
	const notif_exit = document.querySelector(`#notif-exit${ generatedId }`);

	notif_exit.addEventListener("click", function() {
		removeNotif(newNotif);
	});

	setTimeout(function() {
		removeNotif(newNotif);
	}, 7000);
}


// Magic
window.addEventListener("DOMContentLoaded", function() {
	let pass_shown_1 = false;
	let pass_shown_2 = false;

	setTimeout(function() {
		register_background.classList.add("register-s_1-background-blur");
		container.classList.add("register-s_1-register-show");
	}, 300);

	register_password_input.addEventListener("input", function() {
		if(register_password_input.value.length > 0) {
			eye_1_show_password_btn.style.opacity = 1;
		}
		else {
			eye_1_show_password_btn.style.opacity = 0;
		}
	});

	register_confirm_password_input.addEventListener("input", function() {
		if(register_confirm_password_input.value.length > 0) {
			eye_2_show_password_btn.style.opacity = 1;
		}
		else {
			eye_2_show_password_btn.style.opacity = 0;
		}
	});

	eye_1_show_password_btn.addEventListener("click", function() {
		if(!pass_shown_1) {
			eye_1_show_password_btn.src = "../../Resources/Icons/eye-close.svg";
			register_password_input.type = "text";
			pass_shown_1 = true;
		}
		else {
			eye_1_show_password_btn.src = "../../Resources/Icons/eye-open.svg";
			register_password_input.type = "password";
			pass_shown_1 = false;
		}
	});

	eye_2_show_password_btn.addEventListener("click", function() {
		if(!pass_shown_2) {
			eye_2_show_password_btn.src = "../../Resources/Icons/eye-close.svg";
			register_confirm_password_input.type = "text";
			pass_shown_2 = true;
		}
		else {
			eye_2_show_password_btn.src = "../../Resources/Icons/eye-open.svg";
			register_confirm_password_input.type = "password";
			pass_shown_2 = false;
		}
	});

	register_form.addEventListener("submit", function(event) {
		event.preventDefault();

		if(!submit_debounce) {
			submit_debounce = true;

			setTimeout(function() {
				submit_debounce = false;
			}, 700);
		}
		else return;

		if(register_surname_input.value.length <= 0) {
			createNotif(
				"Put your Surname",
				"You must input your surname."
			);
			return;
		}

		if(register_given_name_input.value.length <= 0) {
			createNotif(
				"What's your name?",
				"Enter your given name."
			);
			return;
		}

		if(register_username_input.value.length <= 0) {
			createNotif(
				"Enter your username",
				"Username is required."
			);
			return;
		}

		if(register_email_input.value.length <= 0) {
			createNotif(
				"Email is Essential",
				"You need to add email into your account."
			);
			return;
		}

		if(register_password_input.value.length <= 0) {
			createNotif(
				"Password Not Found",
				"You need a password."
			);
			return;
		}

		if(register_confirm_password_input.value.length <= 0) {
			createNotif(
				"Confirm Password",
				"You need to confirm your password."
			);
			return;
		}

		if(register_username_input.value != register_confirm_password_input.value) {
			createNotif(
				"Confirm Password",
				"Password and confirm password must match."
			);
			return;
		}

		var request = indexedDB.open("Users", 2);

		request.onsuccess = function(event) {
			const db = event.target.result;
			const transaction = db.transaction("Users", "readwrite");
			const objectStore = transaction.objectStore("Users");

			objectStore.openCursor().onsuccess = function(e_event) {
				var cursor = e_event.target.result;

				if(cursor) {
					var user = cursor.value;

					console.log(user);

					if(user.username.toLowerCase() == register_username_input.value.toLowerCase()) {
						if(user.password == sha256(register_password_input.value)) {
							user.is_Logged = 1;
							cursor.update(user);

							window.location.href = "./register-Success.html";
							return;
						}
						else {
							createNotif(
								"Incorrect Password",
								"Make sure that you typed your password correctly."
							);
							return;
						}
					}

					cursor.continue();
				}
				else {
					createNotif(
						"Username not Found",
						"Make sure that your username is correct."
					);
				}
			}
		}
	});
});