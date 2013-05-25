/*
	use some red leds and you got a cylon looking somehting.
*/

// pin 13 is a LED connected to most Arduino boards
const int led = 13;

//some leds connected to the board:
const int ledArray[] = {2, 3, 4, 5, 6, 7};

//our button is connected to pin 8
const int button = 8;

//we specify the time each led will remain on.
const int delayTime = 30;

//Array size is going to be the same during execution.
//size of returns the amount of bytes a variable ocupies, 
//we need to divide by the size of the variable type to get the length of the array.
const int arraySize = (sizeof(ledArray) / sizeof(int));

//Setup is a routine that runs once
void setup () {
	
	//Configure the serial for debugging. 
	Serial.begin(9600);

	//we need to configure the pins
	pinMode(led, OUTPUT);
	pinMode(button, INPUT);
	//initialize each led in the array
	for (int c = 0; c < sizeof(ledArray); c++) {
		pinMode(ledArray[c], OUTPUT);
	}
}

//the loop routine runs over and over forever.
void loop () {
	
	//did someone press our button?
	if (digitalRead(button) == 1) {

		//we turn off the internal led
		digitalWrite(led, LOW);
		
		//debug info
		Serial.println(arraySize);
		
		//we loop forward.
		for (int y = 0; y <arraySize; y++) {
			Serial.println(y);
			digitalWrite(ledArray[y], HIGH);
			delay(delayTime);
			digitalWrite(ledArray[y], LOW);
		}
		
		//debug info
		Serial.println("now down");
		
		//we loop backwards
		for (int x = arraySize -1; x >= 0; x--) {
			Serial.println(x);
			digitalWrite(ledArray[x], HIGH);
	 		delay(delayTime);
			digitalWrite(ledArray[x], LOW);
		}
	}
	else {
		//the internal led turns on 
		digitalWrite(led, HIGH);
	}
}
