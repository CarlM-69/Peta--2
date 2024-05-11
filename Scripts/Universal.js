// Magic
window.addEventListener("DOMContentLoaded", function() {
	const login_btn = document.querySelector("#login");
	const username_display = document.querySelector("#greeter");
	const register_btn = document.querySelector("#register");
	const logout = document.querySelector("#logout");
	const logout_alert = document.querySelector("#logout-alert");
	const logout_alert_card = document.querySelector("#logout-card");
	const logout_alert_btn = document.querySelector("#logout-alert-btn");
	const back_alert_btn = document.querySelector("#back-alert-btn");
	var request = indexedDB.open("Users", 2);

	request.onupgradeneeded = function(event) {
		const db = event.target.result;
		const objectStore =  db.createObjectStore("Users", { keyPath: "id", autoIncrement: true });

		objectStore.createIndex("username", "username", { unique: true });
		objectStore.createIndex("fullname", "fullname");
		objectStore.createIndex("is_Logged", "is_Logged");
	}

	request.onsuccess = function(event) {
		const db = event.target.result;
		const transaction = db.transaction("Users", "readonly");
		const objectStore = transaction.objectStore("Users");
		const cursor = objectStore.getAll();

		cursor.onsuccess = function(e_event) {
			const users = e_event.target.result;

			if(users) {
				for(const user in users) {
					if(users[user].is_Logged == 1) {
						var greetings = [
							"Hi", "Hello", "Good Day",
							"Good to see you", "Greetings",
							"Hey", "Hi there", "Welcome"
						];
						var get_name = users[user].fullname;
						const first_name = get_name.split(" ");
	
						username_display.innerHTML = `${ greetings[Math.floor(Math.random() * greetings.length)] }, ${ first_name[0] }!`;
						login_btn.classList.add("hide");
						register_btn.classList.add("hide");
						username_display.classList.remove("hide");
						logout.classList.remove("hide");
						
						break;
					}
				}
			}
		}
	}

	logout.addEventListener("click", function() {
		logout_alert.classList.remove("alert-intro-exit");
		logout_alert_card.classList.remove("alert-intro-alert-exit");
		logout_alert.classList.add("alert-intro-entrance");
		logout_alert_card.classList.add("alert-intro-alert-entrance");
		logout_alert.style.zIndex = 999;
	});

	logout_alert_btn.addEventListener("click", function() {
		logout_alert.classList.remove("alert-intro-entrance");
		logout_alert_card.classList.remove("alert-intro-alert-entrance");
		logout_alert.classList.add("alert-intro-exit");
		logout_alert_card.classList.add("alert-intro-alert-exit");
		setTimeout(function() {
			logout_alert.style.zIndex = -999;
		}, 500);

		var request = indexedDB.open("Users", 2);

		request.onsuccess = function(event) {
			const db = event.target.result;
			const transaction = db.transaction("Users", "readwrite");
			const objectStore = transaction.objectStore("Users");

			objectStore.openCursor().onsuccess = function(e_event) {
				var cursor = e_event.target.result;

				if(cursor) {
					var user = cursor.value;

					if(user.is_Logged == 1) {
						user.is_Logged = 0;

						cursor.update(user);

						setTimeout(function() {
							window.location.reload();
						}, 550);
					}

					cursor.continue();
				}
			}
		}
	});

	back_alert_btn.addEventListener("click", function() {
		logout_alert.classList.remove("alert-intro-entrance");
		logout_alert_card.classList.remove("alert-intro-alert-entrance");
		logout_alert.classList.add("alert-intro-exit");
		logout_alert_card.classList.add("alert-intro-alert-exit");
		setTimeout(function() {
			logout_alert.style.zIndex = -999;
		}, 500);
	});
});