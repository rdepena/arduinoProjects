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
const int maxDistance = 200;

NewPing sonar(trigger, echo, maxDistance);

void setup() {

	Serial.begin(9600); 
}

void loop() {
	
	// Send ping, get ping time in microseconds.
	unsigned int pingMicroseconds = sonar.ping(); 
	Serial.print("Ping: ");
	
	// Convert ping time to distance in cm and print result (0 = outside set distance range)
	Serial.print(pingMicroseconds / US_ROUNDTRIP_CM);  
	Serial.println("cm");

	//wait 100ms
	delay(100);
}
