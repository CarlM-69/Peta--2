const login_background = document.querySelector("#login-bg");
const container = document.querySelector("#container");
const login_form = document.querySelector("#login-form");
const login_username_input = document.querySelector("#username-input");
const login_password_input = document.querySelector("#password-input");
const eye_show_password_btn = document.querySelector("#eye");
const notification_container = document.querySelector("#notif-container");
const notifs = [];
let submit_debounce = false;

// Functions
function sha256(pass) {
	return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
}

function createNotif(title, message) {
	let newNotif = document.createElement("div");
	let generatedId = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
	newNotif.classList.add("notif-card");
	newNotif.classList.add("login-s_1-notif-show");

	function removeNotif(notif) {
		notif.classList.remove("login-s_1-notif-show");
		notif.classList.add("login-s_1-notif-hide");

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

		if(!submit_debounce) {
			submit_debounce = true;

			setTimeout(function() {
				submit_debounce = false;
			}, 650);
		}
		else return;

		if(login_username_input.value.length <= 0) {
			createNotif(
				"Enter your username",
				"You can't login without your username."
			);
			return;
		}

		if(login_password_input.value.length <= 0) {
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

			objectStore.openCursor().onsuccess = function(e_event) {
				var cursor = e_event.target.result;

				if(cursor) {
					var user = cursor.value;

					console.log(user);

					if(user.username.toLowerCase() == login_username_input.value.toLowerCase()) {
						if(user.password == sha256(login_password_input.value)) {
							user.is_Logged = 1;
							cursor.update(user);

							window.location.href = "./Login-Success.html";
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