console.log("If you're happy and you know it - syntax error!");

//Гамбургер
(function() {
	var topBar = document.querySelector(".top-bar");
	var toggleMenu = document.querySelector(".toggle-menu");
	var mobNav = document.querySelector("#mob-nav");

	toggleMenu.addEventListener("click", function(event) {
		event.preventDefault;
		topBar.classList.toggle("top-bar--menu-open");
		toggleMenu.classList.toggle("toggle-menu--close");
		mobNav.classList.toggle("hidden");
	});
})();


//Контрол для даты
(function() {
	var moar = document.querySelector("#more-days");
	var less = document.querySelector("#less-days");
	var duration = document.querySelector("#trip-duration");

	if (moar) {
		moar.addEventListener("click", function(event) {
			var daysCount = parseInt(duration.value, 10);
			event.preventDefault;
			daysCount++;
			if (daysCount > 366) {
				daysCount = 366;
			}
			duration.value = daysCount + " " + days(daysCount);
		});
	}

	if (less) {
		less.addEventListener("click", function(event) {
			event.preventDefault;
			var daysCount = parseInt(duration.value, 10);
			daysCount--;
			if(daysCount < 0) {
				daysCount = 0;
			}
			duration.value = daysCount + " " + days(daysCount);
		});
	}

	function days(daysCount) {
	  if ((daysCount > 10) && (daysCount <= 20)) {
	    return("дней");
	  }
	  var strCounter = String(daysCount);
	  var lastDigit = strCounter[strCounter.length-1];
	  switch (lastDigit) {
	    case "1":
	      return("день");
	      break;
	    case "2":
	    case "3":
	    case "4":
	      return("дня");
	      break;
	    default:
	      return("дней");
	  }
	}
})();


//Контрол для путешественников
(function() {
	var moarCompanions = document.querySelector("#more-companions");
	var lessCompanions = document.querySelector("#less-companions");
	var companions = document.querySelector("input[name='travellers-number']");
	var humans = "чел.";

	if (moarCompanions) {
		moarCompanions.addEventListener("click", function(event) {
			event.preventDefault;
			var companionsCount = parseInt(companions.value, 10);
			companionsCount++;
			if (companionsCount > 10) {
				companionsCount = 10;
				confirm("Вы чо, реально кочевали цыганским табором?:) Мы можем зарегистрировать не более 10 лиц, уж простите.");
			}
			companions.value = companionsCount + " " + humans;

			var travellersTable = document.querySelector("#travellers-table").innerHTML;
			var tableHolder = document.querySelector("#table-holder");
			tableHolder.innerHTML += travellersTable;
			var number = document.querySelectorAll(".travellers__ordinal-number");
			var ordinal = 1;
			for(i = 0; i < number.length; i++) {
				number[i].innerHTML = ordinal++;
			}


		});
	}

	if (lessCompanions) {
		lessCompanions.addEventListener("click", function(event) {
			event.preventDefault;
			var companionsCount = parseInt(companions.value, 10);
			companionsCount--;
			if (companionsCount < 0) {
				companionsCount = 0;
			}
			companions.value = companionsCount + " " + humans;

			var travellersTable = document.querySelector("#travellers-table").innerHTML;
			var tableHolder = document.querySelector("#table-holder");
			var lastTable = document.querySelector(".travellers:last-of-type");
			if (lastTable) {
				tableHolder.removeChild(lastTable);
			}
		});
	}

	var deleteTable = document.querySelector(".travellers__delete");
	if (deleteTable) {
		deleteTable.addEventListener("click", function(event) {
			event.preventDefault;
			var table = document.querySelector(".travellers");
			deleteTable.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(table);
		});
	}
})();


//Загрузка и превью фотографий
(function() {
	var upload = document.querySelector("#upload-photos");
	if (upload) {
		if ("FileReader" in window) {
			upload.addEventListener("change", function() {
				var files = this.files;
				for (var i = 0; i < files.length; i++) {
					preview(files[i]);
				}
			});
	}

		function preview(file) {
			var form = document.querySelector(".pink-form form");
			var thumbContainer = form.querySelector(".thumb-container");
			if (file.type.match(/image.*/)) {
			var reader = new FileReader();
			reader.addEventListener("load", function(event) {
				thumbContainer.classList.remove("hidden");
				var figure = document.createElement("figure");
				figure.className = "thumb-container__thumb";
				var a = document.createElement("a");
				a.className = "thumb-container__thumb-remove";
				a.title = "Удалить это фото";
				a.innerHTML = "&times;";
				var figcaption = document.createElement("figcaption");
				figcaption.className = "thumb-container__thumb-name";
				figcaption.innerHTML = file.name;

				var img = document.createElement("img");
				img.src = event.target.result;
				img.alt = file.name;
				img.className = "thumb-container__img";

				thumbContainer.appendChild(figure);
				figure.appendChild(img);
				figure.appendChild(a);
				figure.appendChild(figcaption);
				});
			reader.readAsDataURL(file);
			}
		}
	}
})();


//Отправка формы
(function() {
	if (!("FormData" in window)) {
	return;
	}
	var form = document.querySelector(".pink-form form");
	if (form) {

		function validateForm() {
			var failure = document.querySelector("div.modal-wrapper--failure");
			var required = document.querySelector("input[required]");
			valid = true;

			if (required.value == "") {
				failure.classList.remove("hidden");
				alert ("Пожалуйста заполните обязательные поля");
				valid = false;
			}

			return valid;
		}

		form.addEventListener("submit", function(event) {
			event.preventDefault();
			var data = new FormData(form);
			var xhr = new XMLHttpRequest();
			var time = (new Date()).getTime();
			var success = document.querySelector("div.modal-wrapper--success");

			xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
			xhr.addEventListener("readystatechange", function() {
				if (xhr.readyState == 4) {
					console.log(xhr.responseText);
					success.classList.remove("hidden");
					}
				});
			xhr.send(data);
		});
	}
})();


//Закрытие модальных окон
(function() {
	var closeModal = document.querySelector(".close-modal");
	var modalWindow = document.querySelector("div.modal-wrapper");

	if (closeModal) {
		closeModal.addEventListener("click", function(event) {
			event.preventDefault();
			//modalWindow.classList.add("hidden");
			closeModal.parentNode.parentNode.parentNode.removeChild(modalWindow);
		});
	}
})();

(function() {
	var closeFailure = document.querySelector("#close-failure");
	var submitFailure = document.querySelector("#submit-failure");

	if (closeFailure) {
		closeFailure.addEventListener("click", function(event) {
			event.preventDefault();
			closeFailure.parentNode.parentNode.removeChild(submitFailure);
		});
	}
})();
