/*
	Simon game.
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

//delay time
const int delayTime = 500;

int turnCount = 0;
//this sucks but no mutable arrays and don't want to deal with vectors right now, change this in the future.
int turnArray[256];

//configure IO
void setup() {
	//Configure the serial for debugging. 
	Serial.begin(9600);
	//Configure random:
	//we are not using pin 0 so we commit it to generate seed numbers.

	randomSeed(analogRead(0));
	

	//we use the led array to assign both buttons and leds cause I assume they are the same length.
	for (int i = 0; i < ledArrayLength; i++) {
		//set the leds.
		pinMode(ledArray[i], OUTPUT);
		//set the buttons
		pinMode(btnArray[i], INPUT);
	}
}

//the game is lost.
void lost() {
	for (int i = 0; i < ledArrayLength; i++) {
		digitalWrite(ledArray[i], HIGH);
	}
}

//execution loop
void loop() {
	
	bool waitingForInput = false;

	//adds a turn to our count
	turnCount = 1;

	bool keeplaying = true;

	//waiting for user input?
	while (keeplaying == true) {

		//crate a random number form 0 to the ledArrayLength
		turnArray[turnCount] = random(ledArrayLength);

		//we display the random sequence.
		for (int i = 0; i < turnCount; i++) {
			//turn that random led on.
			digitalWrite(ledArray[turnArray[i]], HIGH);

			delay(delayTime);
			//turn the led off.
			digitalWrite(ledArray[turnArray[i]], LOW);
			delay(delayTime);
		}
	
		//the players turn:
		for (int x = 0; x < turnCount; x++) {
			waitingForInput = true;
			//waiting for the player to press a button.
			while(waitingForInput == true) {

				//check each button for press
				for (int y = 0; y < ledArrayLength; y++) {
					
					//a button is pressed, check if its the right one
					while (digitalRead(btnArray[y]) == 1) {
						
						//no longer expecting a button press
						waitingForInput = false;

						//turn the led on.
						digitalWrite(ledArray[y], HIGH);
						if (ledArray[y] != ledArray[turnArray[x]]) {
							//run the lost sequence
							lost();
							//and we are no longer playing this round.
							keeplaying = false;
						}
					}
					//user is no longer pressing so we turn the led off.
					digitalWrite(ledArray[y], LOW);
				}
			}
		}
		//we add a turn
		turnCount = turnCount + 1;
		//wait a few seconds to start displaying the sequence again.
		delay(delayTime);
	}
}