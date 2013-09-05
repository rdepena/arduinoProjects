/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";
	var Leap = require("leapjs"),
		controller = new Leap.Controller(),
		gestures = require("./leap/gestures.js")(),
		components = require("./arduino/components.js")();

	//when the board is ready we will listen to the leapmotion controller:
	components.board.on("ready", function () {
		//control the frames per second.
		var i = 0,
			processedFrame = null,
			hand = null;

		controller.on('frame', function (frame) {
			i += 1;
			//we only want to capture i % x frames per second.
			if (i % 4 === 0) {
				processedFrame = gestures.processFrame(frame);
				if (processedFrame.isFrameValid) {
					hand = processedFrame.pointDirection;
					components.servoX.move(hand.x);
					components.servoY.move(hand.y);

					if(processedFrame.isHandPresent) {
						components.led.on();
					}
				}
				else {
					components.led.off();
				}
			}
		});
		controller.connect();
	});
}());
