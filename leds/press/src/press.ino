/*
	have an array of four buttons and four leds, each button will control a single led.
*/

// pin 13 is a LED connected to most Arduino boards
// I plan to use this as a 'waiting for input' indicator.
const int led = 13;

//our connected leds.
const int greenLed = 7;
const int blueLed = 6;
const int redLed = 5;
const int yellowLed = 4;
const int ledArray[] = {greenLed, blueLed, redLed, yellowLed};

//our connected buttons
const int greenBtn = 11;
const int blueBtn = 10;
const int redBtn = 9;
const int yellowBtn = 8;
const int btnArray[] = {greenBtn, blueBtn, redBtn, yellowBtn};

//Arrays will be the same size for entire execution
const int ledArrayLength = (sizeof(ledArray) / sizeof(int));

//configure IO
void setup () {

	//Configure the serial for debugging. 
	Serial.begin(9600);

	//configure the internal led.
	//pinMode(led, OUTPUT);

	//we use the led array to assign both buttons and leds cause I assume they are the same length.
	for (int i = 0; i < ledArrayLength; i++) {
        Serial.println("configuring");
        Serial.println(i);
		//set the leds.
		pinMode(ledArray[i], OUTPUT);
		//if we have more buttons than leds then this needs to change, but I do not forse this.
		pinMode(btnArray[i], INPUT);

	}

	//debug:
	Serial.println(ledArrayLength);
}

//execution loop
void loop () {

	//check for all the buttons:
	for (int i = 0; i < ledArrayLength; i++) {

		//closed circuit ?
		if (digitalRead(btnArray[i]) == 1) {
            //debug
            Serial.println(btnArray[i]);
			digitalWrite(ledArray[i], HIGH);
		}
		//open circuit.
		else {
			digitalWrite(ledArray[i], LOW);
		}
	}
}
