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
var notifs = [];
let submit_debounce = false;

// Functions
function sha256(pass) {
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
		}, 550);
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
			}, 650);
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

		var email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
    	var is_email_valid = email_pattern.test(register_email_input.value);

		if(!is_email_valid) {
			createNotif(
				"Invalid Email",
				"Make sure your email is correct."
			);
			return;
		}
		else {
			var email = register_email_input.value.toLowerCase();
			let valid_email = false;
			const validEmails = [
				"@gmail.com",
				"@yahoo.com",
				"@outlook.com",
				"@hotmail.com",
				"@depedqc.ph",
				"@ncr2.deped.gov.ph",
				"@gov.deped.ph",
				"@deped.gov.ph",
				"@deped.ph",
				"@deped.gov.ph",
				".deped.gov.ph"
			];

			for(let i = 0; i < validEmails.length; i++) {
				if(email.includes(validEmails[i])) {
					valid_email = true;
				}
			}

			if(!valid_email) {
				createNotif(
					"Invalid Email",
					"Make sure your email is correct."
				);
				return;
			}
		}

		if(register_password_input.value.length <= 0) {
			createNotif(
				"Password Not Found",
				"You need a password."
			);
			return;
		}

		if(register_password_input.value.length < 7) {
			createNotif(
				"Password Too Short",
				"Password must not be shorter than 7 characters."
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

		if(register_password_input.value != register_confirm_password_input.value) {
			console.log()
			createNotif(
				"Confirm Password",
				"Password and confirm password must match."
			);
			return;
		}

		var request = indexedDB.open("Users", 2);

		request.onsuccess = function(event) {
			const db = event.target.result;
			const transaction = db.transaction("Users", "readonly");
			const objectStore = transaction.objectStore("Users");

			objectStore.getAll().onsuccess = function(e_event) {
				var users = e_event.target.result;

				if(users) {
					for(const user in users) {
						if(users[user].username.toLowerCase() == register_username_input.value.toLowerCase()) {
							createNotif(
								"Username Taken",
								"That username is already taken."
							);
							return;
						}
					}

					var request_1 = indexedDB.open("Users", 2);

					request_1.onsuccess = function(e_e_event) {
						const db = event.target.result;
						const transaction_1 = db.transaction("Users", "readwrite");
						const objectStore_1 = transaction_1.objectStore("Users");
						var user_fullname;

						if(register_middle_name_input.value.length > 0) { user_fullname = `${ register_given_name_input.value } ${ register_middle_name_input.value } ${ register_surname_input.value }`; }
						else { user_fullname = `${ register_given_name_input.value } ${ register_surname_input.value }`; }

						var userData = {
							"fullname": user_fullname,
							"username": register_username_input.value,
							"email": register_email_input.value,
							"password": sha256(register_password_input.value),
							"is_Logged": 0
						};

						objectStore_1.add(userData);
						window.location.href = "./Register-Success.html";
					}
				}
			}
		}
	});
});