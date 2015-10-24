console.log("Hello, world (ну, куда ж нам без него)!");

var moar = document.querySelector("#days-more");
var less = document.querySelector("#days-less");
var duration = document.querySelector("#trip-duration");
var daysCount = parseInt(duration.value, 10);
// var days = "дней";

var moarCompanions = document.querySelector("#more-companions");
var lessCompanions = document.querySelector("#less-companions");
var companions = document.querySelector("input[name='travellers-number']");
var companionsCount = parseInt(companions.value, 10);
var humans = "чел.";

//Контрол для даты
moar.addEventListener("click", function(event) {
	event.preventDefault;
	daysCount++;
	if(daysCount > 366) {
		daysCount = 366;
	}
	duration.value = daysCount + " " + days(daysCount);
})

less.addEventListener("click", function(event) {
	event.preventDefault;
	daysCount--;
	if(daysCount < 0) {
		daysCount = 0;
	}
	duration.value = daysCount + " " + days(daysCount);
})

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

//Контрол для путешественников
moarCompanions.addEventListener("click", function(event) {
	event.preventDefault;
	companionsCount++;
	if(companionsCount > 10) {
		companionsCount = 10;
		confirm("Вы чо, реально кочевали цыганским табором?:) Мы можем зарегистрировать не более 10 лиц, уж простите.");
	}
	companions.value = companionsCount + " " + humans;
})

lessCompanions.addEventListener("click", function(event) {
	event.preventDefault;
	companionsCount--;
	if(companionsCount < 0) {
		companionsCount = 0;
	}
	companions.value = companionsCount + " " + humans;
})
