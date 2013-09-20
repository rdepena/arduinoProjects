/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var gestures = function () {
	"use strict";

	var my = {};
	var gestureEvents = [];
	var lastPublishedEventTime = null;

	//we only want to process gestures each x seconds.
	var isWithinTimeThreshold = function () {
		var millisecond = 2000;
		if(lastPublishedEventTime) {
			return Date.now() - lastPublishedEventTime > millisecond;
		}
		return true;
	};

	//validate frame
	var isFrameValid = function (frame) {
		if (frame.pointables && frame.pointables[0] && frame.hands && frame.hands[0]) {
			if(frame.pointables.length === 1) {
				return frame.pointables[0].valid && frame.hands[0].valid;
			}
		}
		return false;
	};

	var palmPosition = function (frame) {
		return {
			x : frame.hands[0].stabilizedPalmPosition[0],
			y : frame.hands[0].stabilizedPalmPosition[1],
			z : frame.hands[0].stabilizedPalmPosition[2]
		};
	};

	var tipPosition = function (frame) {
		return {
			x : frame.pointables[0].stabilizedTipPosition[0],
			y : frame.pointables[0].stabilizedTipPosition[1],
			z : frame.pointables[0].stabilizedTipPosition[2]
		};
	};

	var pointDelta = function (frame) {
		var palm = palmPosition(frame);
		var	tip = tipPosition(frame);

		return {
			x : palm.x - tip.x,
			y : palm.y - tip.y,
			z : palm.x - tip.x
		};
	};

	//invoke the callbacks for a specified gesture.
	var publishGesture = function (gesture) {
		if (gestureEvents[gesture.type]) {
			for (var x = 0; x < gestureEvents[gesture.type].length; x++) {
				gestureEvents[gesture.type][x]();
				lastPublishedEventTime = Date.now();
			}
		}
	};

	//Process the frame to look for gestures.
	var processGestures = function (frame) {
		//only respond if two fingers are shown.
		if(frame.pointables.length === 2 && isWithinTimeThreshold() && frame.gestures.length > 0) { 
			//we check the event raised against our subscribed events.
			for (var i = 0; i < frame.gestures.length; i++) {
				var gesture = frame.gestures[i];
				publishGesture(gesture);
			}
		}
	};

	//subscribe to events.
	my.on = function (gesture, callback) {
		if (!gestureEvents[gesture]) {
			gestureEvents[gesture] = [];
		}
		gestureEvents[gesture].push(callback);
	};

	my.processFrame = function (frame) {
		var isValid = isFrameValid(frame);
		processGestures(frame);
		return {
			isFrameValid : isValid,
			pointDirection : isValid ? pointDelta(frame) : null

		};
	};

	return my;
};

module.exports = gestures;