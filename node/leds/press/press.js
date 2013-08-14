var five = require("johnny-five"),
	board = new five.Board();

//we already use constructors for the five library
var IoCombo = function (buttonPin, ledPin) {
	var my = {};

	//each io combo has a button and a led
	my.button = new five.Button(buttonPin);
	my.led = new five.Led(ledPin);

	//set the events:
	my.button.on("down", function () {
		my.led.on();
	});
	my.button.on("up", function () {
		my.led.off();
	});

	//we return this new IO combo ready to be used.
	return my;
}

board.on("ready", function () {
	var buttonPins = [11, 10, 9, 8],
		ledPins = [7, 6, 5, 4],
		i = 0, 
		ioCombos = [];
	
	//initialize all the inputs/outputs
	for (i = 0; i < buttonPins.length; i+=1) {
		//we really don't need this list but adding it just to have a record of these objects.
		ioCombos.push(new IoCombo(buttonPins[i], ledPins[i]));
	};
});