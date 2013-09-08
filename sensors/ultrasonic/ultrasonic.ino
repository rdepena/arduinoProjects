/*
	use a HC-SR04 ultrasonic module 
*/
//https://code.google.com/p/arduino-new-ping/downloads/detail?name=NewPing_v1.5.zip&can=2&q=
#include <NewPing.h>

//pin to trigger the echo
const int trigger = 12;
//pin to receive the echo
const int echo = 11;
// Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.
const int maxDistance = 400;

//using a rgb led

//the red pin of the rgb led
const int redPin = 6;

//the green pin of the rgb led
const int greenPin = 7;

//the blue pin of the rgb led
const int bluePin = 8;

//declare a new ping object with a max distance 
NewPing sonar(trigger, echo, maxDistance);

void setup() {
	Serial.begin(9600); 
}

//led turns blue
void ledBlue() {
        analogWrite(redPin, 0);
        analogWrite(greenPin, 0);
        analogWrite(bluePin, 150);
}

//led turns lilac
void ledLilac() {
        analogWrite(redPin, 250);
        analogWrite(greenPin, 0);
        analogWrite(bluePin, 250);
}

//led turns red
void ledRed() {
        analogWrite(redPin, 250);
        analogWrite(greenPin, 0);
        analogWrite(bluePin, 0);
}

void loop() {
	
	//Send ping, get ping time in microseconds.
	unsigned int pingMicroseconds = sonar.ping(); 
	Serial.print("Ping: ");
	
	// Convert ping time to distance in cm and print result (0 = outside set distance range)
	Serial.print(pingMicroseconds / US_ROUNDTRIP_CM);  
	Serial.println("cm");
	Serial.println(pingMicroseconds);

	if(pingMicroseconds < 500) {
		//nothing is in range;
		if(pingMicroseconds == 0){
			ledBlue();
		}
		//target is in range and aprox 9cm away.
		else {
			ledRed();
		}
	}
	//sonar detects something in range but not too close.
	else {
		ledLilac();
	}

	//wait 100ms
	delay(100);

}
